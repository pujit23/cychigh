// ── FILE: src/pages/LiveRideMap.jsx ──────────────────────────────────────────
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { supabase } from '../supabase/config';
import { useAuth } from '../context/AuthContext';
import NearbyRiders from '../components/NearbyRiders';
import toast from 'react-hot-toast';

// Fix leaflet default marker icon path issue in Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const BENGALURU = [12.9716, 77.5946];

// Creates a gold circle avatar marker for a rider
const createRiderIcon = (initial, url, isMe = false) => {
  const content = url 
    ? `<img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`
    : initial || '?';
    
  return L.divIcon({
    html: `
      <div style="
        width:36px;height:36px;border-radius:50%;
        background:${isMe ? '#FFD700' : '#111'};
        border:2px solid #FFD700;
        display:flex;align-items:center;justify-content:center;
        font-family:'Bebas Neue',sans-serif;font-size:16px;
        color:${isMe ? '#000' : '#FFD700'};
        box-shadow:0 0 12px #FFD70060;
        cursor:pointer;
      ">${content}</div>`,
    className: '',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -22],
  });
};

// Creates a meetup pin
const createMeetupIcon = () =>
  L.divIcon({
    html: `<div style="font-size:28px;filter:drop-shadow(0 2px 6px #FFD70080);">📍</div>`,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });

// Allows user to click map to set meetup pin
const MapClickHandler = ({ onMapClick }) => {
  const map = useMap();
  useEffect(() => {
    const handler = (e) => onMapClick([e.latlng.lat, e.latlng.lng]);
    map.on('click', handler);
    return () => map.off('click', handler);
  }, [map, onMapClick]);
  return null;
};

const fmtSeconds = (isoString) => {
  if (!isoString) return 'unknown';
  const diff = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  return `${Math.floor(diff / 60)}m ago`;
};

const LiveRideMap = () => {
  const { currentUser, userProfile } = useAuth();
  const [sharing, setSharing] = useState(false);
  const [riders, setRiders] = useState([]);
  const [myPos, setMyPos] = useState(null);
  const [meetupModal, setMeetupModal] = useState(false);
  const [pendingPin, setPendingPin] = useState(null);
  const [meetupPoints, setMeetupPoints] = useState([]);
  const [meetupNote, setMeetupNote] = useState('');
  const [meetupTime, setMeetupTime] = useState('');
  const watchIdRef = useRef(null);

  const myName = userProfile?.display_name || currentUser?.user_metadata?.full_name || 'Rider';
  const myPhoto = userProfile?.photo_url || currentUser?.user_metadata?.avatar_url || null;

  const fetchRiders = useCallback(async () => {
    const { data } = await supabase.from('live_riders').select('*');
    if (data) {
      const now = Date.now();
      const alive = data.filter(r => {
        const ts = new Date(r.updated_at).getTime();
        return now - ts < 30000; // stale after 30s
      });
      setRiders(alive);
    }
  }, []);

  const fetchMeetups = useCallback(async () => {
    const { data } = await supabase.from('meetup_points').select('*, users(display_name)');
    if (data) setMeetupPoints(data);
  }, []);

  // Read all live riders & meetups
  useEffect(() => {
    fetchRiders();
    fetchMeetups();
    
    // Refresh stale markers check every 10s locally
    const staleInterval = setInterval(() => {
      setRiders(prev => {
        const now = Date.now();
        return prev.filter(r => now - new Date(r.updated_at).getTime() < 30000);
      });
    }, 10000);

    const channel = supabase.channel('live-riders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'live_riders' }, fetchRiders)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'meetup_points' }, fetchMeetups)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      clearInterval(staleInterval);
    };
  }, [fetchRiders, fetchMeetups]);

  const startSharing = useCallback(() => {
    if (!navigator.geolocation) return;
    setSharing(true);
    watchIdRef.current = navigator.geolocation.watchPosition(
      async (pos) => {
        const { latitude: lat, longitude: lng, speed, heading } = pos.coords;
        setMyPos([lat, lng]);
        
        await supabase.from('live_riders').upsert({
          uid: currentUser.id,
          display_name: myName,
          photo_url: myPhoto,
          lat,
          lng,
          speed: speed ? Math.round(speed * 3.6) : 0, // m/s → km/h
          heading: heading || 0,
          updated_at: new Date().toISOString()
        }, { onConflict: 'uid' });
      },
      (err) => console.error('Geolocation error:', err),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    );
  }, [currentUser, myName, myPhoto]);

  const stopSharing = useCallback(async () => {
    setSharing(false);
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    await supabase.from('live_riders').delete().eq('uid', currentUser.id);
  }, [currentUser]);

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
      // Clean up my live status on unmount
      if (currentUser) {
        supabase.from('live_riders').delete().eq('uid', currentUser.id).then();
      }
    };
  }, [currentUser]);

  const handleMapClick = useCallback((latlng) => {
    if (meetupModal) setPendingPin(latlng);
  }, [meetupModal]);

  const saveMeetup = async () => {
    if (!pendingPin) return;
    
    let parsedTime = new Date(); // Using a fake date if parsing fails for this demo
    try {
      if (meetupTime) {
         // Naive parsing logic for the sake of the constraint 'scheduled_at' which needs timestamp
         // For a real app, use a datetime picker
      }
    } catch(e) {}
    
    const { error } = await supabase.from('meetup_points').insert({
      uid: currentUser.id,
      lat: pendingPin[0],
      lng: pendingPin[1],
      note: meetupNote,
      scheduled_at: parsedTime.toISOString()
    });

    if (error) {
      toast.error('Failed to create meetup');
      console.error(error);
    } else {
      toast.success('Meetup created!');
    }

    setMeetupModal(false);
    setPendingPin(null);
    setMeetupNote('');
    setMeetupTime('');
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        .leaflet-container { background: #080808 !important; }
        .leaflet-tile { filter: brightness(0.7) saturate(0.4) hue-rotate(20deg); }
        .leaflet-popup-content-wrapper { background: #0C0C0C; border: 1px solid #FFD70040; border-radius: 8px; color: #E8E8E8; box-shadow: 0 4px 24px #00000099; }
        .leaflet-popup-tip { background: #0C0C0C; }
        .leaflet-popup-content { margin: 14px 18px; }
        .leaflet-control-zoom a { background: #0C0C0C !important; color: #FFD700 !important; border-color: #1A1A1A !important; }
      `}</style>

      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sideHeader}>
          <span style={styles.eyebrow}>// LIVE RIDE MAP</span>
          <h1 style={styles.title}>RIDERS</h1>
        </div>
        <div style={styles.goldStripe} />
        <button
          onClick={sharing ? stopSharing : startSharing}
          style={{ ...styles.shareBtn, background: sharing ? '#EF4444' : '#FFD700', color: sharing ? '#fff' : '#000' }}
        >
          {sharing ? '🔴 STOP SHARING' : '📍 SHARE MY LOCATION'}
        </button>
        {sharing && myPos && (
          <div style={styles.myPosCard}>
            <span style={styles.myPosLabel}>// MY POSITION</span>
            <span style={styles.myPosVal}>{myPos[0].toFixed(4)}, {myPos[1].toFixed(4)}</span>
          </div>
        )}
        <button onClick={() => setMeetupModal(true)} style={styles.meetupBtn}>
          🏁 Plan Group Ride
        </button>
        <NearbyRiders riders={riders} myPos={myPos} currentUser={currentUser} />
      </div>

      {/* Map */}
      <div style={styles.mapWrap}>
        <MapContainer center={BENGALURU} zoom={12} style={styles.map} zoomControl={true}>
          <TileLayer
            attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onMapClick={handleMapClick} />

          {/* Live riders */}
          {riders.map(rider => (
            <Marker
              key={rider.uid}
              position={[rider.lat, rider.lng]}
              icon={createRiderIcon(rider.display_name?.[0] || '?', rider.photo_url, rider.uid === currentUser?.id)}
            >
              <Popup>
                <div style={styles.popup}>
                  <p style={styles.popupName}>{rider.display_name}</p>
                  <p style={styles.popupStat}>⚡ {rider.speed ?? 0} km/h</p>
                  <p style={styles.popupTime}>Updated {fmtSeconds(rider.updated_at)}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Meetup points */}
          {meetupPoints.map(mp => (
            <Marker key={mp.id} position={[mp.lat, mp.lng]} icon={createMeetupIcon()}>
              <Popup>
                <div style={styles.popup}>
                  <p style={styles.popupName}>📍 Meetup</p>
                  {mp.note && <p style={styles.popupStat}>{mp.note}</p>}
                  <p style={styles.popupTime}>By {mp.users?.display_name || 'A Rider'}</p>
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Pending meetup pin */}
          {pendingPin && (
            <Marker position={pendingPin} icon={createMeetupIcon()} />
          )}
        </MapContainer>

        {/* Rider count overlay */}
        <div style={styles.riderCountOverlay}>
          <span style={styles.riderCountNum}>{riders.length}</span>
          <span style={styles.riderCountLabel}>RIDERS LIVE</span>
        </div>
      </div>

      {/* Meetup Modal */}
      {meetupModal && (
        <div style={styles.backdrop} onClick={() => { setMeetupModal(false); setPendingPin(null); }}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span style={styles.eyebrow}>// PLAN GROUP RIDE</span>
              <button onClick={() => { setMeetupModal(false); setPendingPin(null); }} style={styles.closeBtn}>✕</button>
            </div>
            <p style={styles.modalHint}>Click anywhere on the map to drop a meetup pin, then fill in details below.</p>
            {pendingPin && (
              <div style={styles.pinConfirm}>
                <span style={styles.pinConfirmText}>📍 Pin dropped at {pendingPin[0].toFixed(4)}, {pendingPin[1].toFixed(4)}</span>
              </div>
            )}
            <div style={styles.modalForm}>
              <div style={styles.modalField}>
                <label style={styles.modalLabel}>// NOTE</label>
                <input value={meetupNote} onChange={e => setMeetupNote(e.target.value)} placeholder="Ride details, distance, pace..." style={styles.modalInput} />
              </div>
              <button onClick={saveMeetup} disabled={!pendingPin} style={{ ...styles.submitBtn, opacity: pendingPin ? 1 : 0.4 }}>
                DROP MEETUP PIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  root: { display: 'flex', height: '100vh', background: '#080808', fontFamily: '"DM Sans", sans-serif', overflow: 'hidden' },
  sidebar: { width: '300px', flexShrink: 0, background: '#0A0A0A', borderRight: '1px solid #1A1A1A', display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px 20px', overflowY: 'auto', zIndex: 10 },
  sideHeader: {},
  eyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', letterSpacing: '0.2em', display: 'block', marginBottom: '6px' },
  title: { fontFamily: '"Bebas Neue", sans-serif', fontSize: '40px', color: '#E8E8E8', margin: 0, lineHeight: 1 },
  goldStripe: { height: '1px', background: 'linear-gradient(90deg, #FFD700, #FFD70055, transparent)' },
  shareBtn: { border: 'none', borderRadius: '6px', padding: '12px 16px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '16px', letterSpacing: '2px', cursor: 'pointer', transition: 'all 0.2s', clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' },
  myPosCard: { background: '#111', border: '1px solid #FFD70030', borderRadius: '6px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '4px' },
  myPosLabel: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#FFD700', letterSpacing: '0.2em' },
  myPosVal: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#888' },
  meetupBtn: { background: 'none', border: '1px solid #1A1A1A', borderRadius: '6px', padding: '10px 14px', fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#666', cursor: 'pointer', letterSpacing: '0.1em', textAlign: 'left' },
  mapWrap: { flex: 1, position: 'relative' },
  map: { width: '100%', height: '100%' },
  riderCountOverlay: { position: 'absolute', top: '16px', right: '16px', background: '#0C0C0CCC', border: '1px solid #FFD70040', borderRadius: '8px', padding: '12px 18px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 999, backdropFilter: 'blur(8px)' },
  riderCountNum: { fontFamily: '"Bebas Neue", sans-serif', fontSize: '40px', color: '#FFD700', lineHeight: 1 },
  riderCountLabel: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#555', letterSpacing: '0.2em' },
  popup: { fontFamily: '"DM Sans", sans-serif' },
  popupName: { fontFamily: '"Bebas Neue", sans-serif', fontSize: '18px', color: '#FFD700', margin: '0 0 4px', letterSpacing: '1px' },
  popupStat: { fontFamily: '"DM Mono", monospace', fontSize: '13px', color: '#E8E8E8', margin: '0 0 4px' },
  popupTime: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#555', margin: 0 },
  backdrop: { position: 'fixed', inset: 0, background: '#00000099', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(8px)' },
  modal: { background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '12px', width: '100%', maxWidth: '460px', padding: '32px' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  closeBtn: { background: 'none', border: 'none', color: '#555', fontSize: '18px', cursor: 'pointer' },
  modalHint: { fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#555', marginBottom: '16px', lineHeight: 1.5 },
  pinConfirm: { background: '#0A1A0A', border: '1px solid #1A3A1A', borderRadius: '6px', padding: '10px 14px', marginBottom: '16px' },
  pinConfirmText: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#22C55E' },
  modalForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
  modalField: { display: 'flex', flexDirection: 'column', gap: '8px' },
  modalLabel: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#FFD700', letterSpacing: '0.2em' },
  modalInput: { background: '#080808', border: '1px solid #1A1A1A', borderRadius: '6px', padding: '12px 16px', fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#E8E8E8', width: '100%', boxSizing: 'border-box' },
  submitBtn: { background: '#FFD700', color: '#000', border: 'none', borderRadius: '6px', padding: '14px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '18px', letterSpacing: '3px', cursor: 'pointer', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' },
};

export default LiveRideMap;
