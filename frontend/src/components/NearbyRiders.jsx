// ── FILE: src/components/NearbyRiders.jsx ──────────────────────────────────────────
import React, { useMemo } from 'react';
import { supabase } from '../supabase/config';
import toast from 'react-hot-toast';

// Haversine formula — returns distance in km
const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const NearbyRiders = ({ riders, myPos, currentUser }) => {
  const sorted = useMemo(() => {
    if (!myPos) return riders.filter(r => r.uid !== currentUser?.id);
    return riders
      .filter(r => r.uid !== currentUser?.id)
      .map(r => ({ ...r, dist: haversine(myPos[0], myPos[1], r.lat, r.lng) }))
      .sort((a, b) => a.dist - b.dist);
  }, [riders, myPos, currentUser]);

  const sendWave = async (rider) => {
    if (!currentUser) return;
    try {
      const myName = currentUser?.user_metadata?.full_name || currentUser.email?.split('@')[0] || 'A Rider';
      const { error } = await supabase.from('notifications').insert({
        uid: rider.uid,
        type: 'wave',
        from_uid: currentUser.id,
        from_name: myName,
        message: 'waved at you 👋',
        read: false
      });
      if (error) throw error;
      toast.success(`Waved at ${rider.display_name}!`);
    } catch (err) {
      console.error('Wave failed:', err);
      toast.error('Failed to send wave.');
    }
  };

  if (sorted.length === 0) {
    return (
      <div style={styles.empty}>
        <span style={styles.emptyIcon}>🚴</span>
        <p style={styles.emptyText}>No nearby riders sharing location</p>
      </div>
    );
  }

  return (
    <div style={styles.root}>
      <p style={styles.eyebrow}>// NEARBY RIDERS</p>
      <div style={styles.list}>
        {sorted.map((rider, i) => (
          <div key={rider.uid} style={{ ...styles.riderRow, animationDelay: `${i * 0.06}s` }}>
            <div style={styles.avatar(rider.photo_url)}>
              {!rider.photo_url && (rider.display_name?.[0] || '?')}
            </div>
            <div style={styles.info}>
              <p style={styles.name}>{rider.display_name}</p>
              <p style={styles.meta}>
                {myPos && rider.dist !== undefined
                  ? `${rider.dist < 1 ? `${Math.round(rider.dist * 1000)} m` : `${rider.dist.toFixed(1)} km`} away`
                  : 'Location sharing'}
                {rider.speed ? ` · ${rider.speed} km/h` : ''}
              </p>
            </div>
            <button onClick={() => sendWave(rider)} style={styles.waveBtn} title="Send a wave">
              👋
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  root: {},
  eyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#FFD700', letterSpacing: '0.2em', margin: '0 0 12px' },
  list: { display: 'flex', flexDirection: 'column', gap: '8px' },
  riderRow: {
    display: 'flex', alignItems: 'center', gap: '10px',
    background: '#111', border: '1px solid #1A1A1A', borderRadius: '8px',
    padding: '10px 12px', animation: 'fadeSlideUp 0.3s ease both',
  },
  avatar: (url) => ({
    width: '32px', height: '32px', borderRadius: '50%',
    background: url ? 'transparent' : '#0C0C0C', border: '1px solid #FFD700',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px', color: '#FFD700',
    flexShrink: 0, overflow: 'hidden', backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: url ? `url(${url})` : 'none'
  }),
  info: { flex: 1, minWidth: 0 },
  name: { fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#E8E8E8', margin: 0, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  meta: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#555', margin: 0, letterSpacing: '0.05em' },
  waveBtn: { background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', flexShrink: 0, padding: '4px', borderRadius: '4px', transition: 'transform 0.15s' },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px 0', gap: '10px' },
  emptyIcon: { fontSize: '32px' },
  emptyText: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#333', textAlign: 'center', letterSpacing: '0.1em', lineHeight: 1.5 },
};

export default NearbyRiders;
