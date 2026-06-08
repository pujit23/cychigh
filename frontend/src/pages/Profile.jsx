// ── FILE: src/pages/Profile.jsx ──────────────────────────────────────────
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/config';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const RIDE_TYPES = ['Road', 'MTB', 'Gravel', 'BMX', 'Touring', 'Track'];

const StatBox = ({ label, value, unit }) => (
  <div style={styles.statBox}>
    <span style={styles.statVal}>{value ?? 0}</span>
    {unit && <span style={styles.statUnit}>{unit}</span>}
    <span style={styles.statLabel}>{label}</span>
  </div>
);

const Profile = () => {
  const { currentUser, userProfile, refreshProfile, logout } = useAuth();
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ display_name: '', bio: '', preferred_ride_type: 'Road' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [threads, setThreads] = useState([]);
  const [rideStats, setRideStats] = useState({ totalRides: 0, totalKm: 0, totalElevation: 0 });
  const [communities, setCommunities] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]);

  useEffect(() => {
    if (userProfile) {
      setForm({
        display_name: userProfile.display_name || '',
        bio: userProfile.bio || '',
        preferred_ride_type: userProfile.preferred_ride_type || 'Road',
      });
    }
  }, [userProfile]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchData = async () => {
      // Posted threads
      const { data: threadsData } = await supabase.from('threads').select('*').eq('uid', currentUser.id);
      if (threadsData) setThreads(threadsData);

      // Ride stats
      const { data: ridesData } = await supabase.from('ride_logs').select('distance, elevation').eq('uid', currentUser.id);
      if (ridesData) {
        const totalKm = ridesData.reduce((acc, curr) => acc + (curr.distance || 0), 0);
        const totalElevation = ridesData.reduce((acc, curr) => acc + (curr.elevation || 0), 0);
        setRideStats({ totalRides: ridesData.length, totalKm: Math.round(totalKm), totalElevation });
      }

      // Joined communities
      const { data: commsData } = await supabase.from('community_members').select('room_id').eq('uid', currentUser.id);
      if (commsData) setCommunities(commsData.map(c => c.room_id));

      // Saved routes
      const { data: savedData } = await supabase.from('saved_routes').select('route_id').eq('uid', currentUser.id);
      if (savedData) setSavedRoutes(savedData.map(r => r.route_id));
    };

    fetchData();
  }, [currentUser]);

  const handleSave = async () => {
    if (!currentUser) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('users').update({
        display_name: form.display_name,
        bio: form.bio,
        preferred_ride_type: form.preferred_ride_type,
      }).eq('id', currentUser.id);
      
      if (error) throw error;

      // Update auth metadata if it's the name
      await supabase.auth.updateUser({ data: { full_name: form.display_name } });
      
      await refreshProfile();
      setEditMode(false);
      toast.success('Profile updated');
    } catch (err) {
      console.error('Profile save failed:', err);
      toast.error('Failed to update profile');
    }
    setSaving(false);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !currentUser) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${currentUser.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
      
      await supabase.from('users').update({ photo_url: data.publicUrl }).eq('id', currentUser.id);
      await supabase.auth.updateUser({ data: { avatar_url: data.publicUrl } });
      
      await refreshProfile();
      toast.success('Avatar updated');
    } catch (err) {
      console.error('Avatar upload failed:', err);
      toast.error('Avatar upload failed');
    }
    setUploading(false);
    e.target.value = '';
  };

  const handleLogout = async () => {
    await logout();
    navigate('/auth');
  };

  const joinDate = userProfile?.joined_at
    ? new Date(userProfile.joined_at).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
    : 'Recently';

  const avatarUrl = userProfile?.photo_url || currentUser?.user_metadata?.avatar_url;
  const initials = (userProfile?.display_name || currentUser?.user_metadata?.full_name || currentUser?.email || 'R')[0]?.toUpperCase();

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .edit-input:focus { border-color: #FFD700 !important; outline: none; }
        .edit-input::placeholder { color: #333; }
        .thread-row:hover { border-color: #2A2A2A !important; }
        .ride-chip:hover { border-color: #FFD700 !important; color: #FFD700 !important; }
      `}</style>
      <div style={styles.hexBg} />
      <div style={styles.container}>
        {/* Header card */}
        <div style={styles.profileCard}>
          <div style={styles.avatarSection}>
            <div style={styles.avatarWrap} onClick={() => !uploading && fileRef.current?.click()}>
              {avatarUrl
                ? <img src={avatarUrl} alt="avatar" style={styles.avatarImg} />
                : <div style={styles.avatarInit}>{initials}</div>}
              <div style={styles.avatarOverlay}>
                <span style={styles.avatarOverlayText}>{uploading ? '⏳' : '📷'}</span>
              </div>
            </div>
            <input type="file" ref={fileRef} accept="image/*" style={{ display: 'none' }} onChange={handleAvatarUpload} />
          </div>

          <div style={styles.profileInfo}>
            {editMode ? (
              <input value={form.display_name} onChange={e => setForm(f => ({ ...f, display_name: e.target.value }))}
                className="edit-input" style={styles.nameInput} />
            ) : (
              <h1 style={styles.displayName}>{userProfile?.display_name || currentUser?.user_metadata?.full_name || 'Rider'}</h1>
            )}
            <p style={styles.email}>{currentUser?.email}</p>
            <div style={styles.metaRow}>
              <span style={styles.metaTag}>🗓️ Joined {joinDate}</span>
              <span style={styles.metaTag}>🚴 {userProfile?.preferred_ride_type || 'Road'} Rider</span>
            </div>
            {editMode ? (
              <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                placeholder="Tell your story as a rider..." rows={3}
                className="edit-input" style={{ ...styles.nameInput, resize: 'vertical', marginTop: '12px' }} />
            ) : (
              <p style={styles.bio}>{userProfile?.bio || 'No bio yet. Add yours!'}</p>
            )}
          </div>

          <div style={styles.profileActions}>
            {editMode ? (
              <>
                <button onClick={handleSave} disabled={saving} style={styles.saveBtn}>
                  {saving ? 'SAVING...' : 'SAVE'}
                </button>
                <button onClick={() => setEditMode(false)} style={styles.cancelBtn}>CANCEL</button>
              </>
            ) : (
              <button onClick={() => setEditMode(true)} style={styles.editBtn}>EDIT PROFILE</button>
            )}
            <button onClick={handleLogout} style={styles.logoutBtn}>LOGOUT</button>
          </div>
        </div>

        {/* Edit ride type */}
        {editMode && (
          <div style={styles.section}>
            <span style={styles.eyebrow}>// PREFERRED RIDE TYPE</span>
            <div style={styles.chipRow}>
              {RIDE_TYPES.map(rt => (
                <button key={rt} className="ride-chip" onClick={() => setForm(f => ({ ...f, preferred_ride_type: rt }))}
                  style={{ ...styles.chip, ...(form.preferred_ride_type === rt ? styles.chipActive : {}) }}>
                  {rt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={styles.goldStripe} />

        {/* Stats row */}
        <div style={styles.statsRow}>
          <StatBox label="TOTAL RIDES" value={rideStats.totalRides} />
          <StatBox label="TOTAL DISTANCE" value={rideStats.totalKm} unit=" km" />
          <StatBox label="ELEVATION" value={rideStats.totalElevation} unit=" m" />
          <StatBox label="THREADS POSTED" value={threads.length} />
        </div>

        <div style={styles.goldStripe} />

        {/* Communities */}
        {communities.length > 0 && (
          <div style={styles.section}>
            <span style={styles.eyebrow}>// JOINED COMMUNITIES</span>
            <div style={styles.chipRow}>
              {communities.map(c => (
                <span key={c} style={styles.communityChip}>{c}</span>
              ))}
            </div>
          </div>
        )}

        {/* Posted threads */}
        <div style={styles.section}>
          <span style={styles.eyebrow}>// YOUR THREADS</span>
          {threads.length === 0 && (
            <p style={styles.emptyText}>You haven't posted any threads yet.</p>
          )}
          <div style={styles.threadList}>
            {threads.map((t, i) => (
              <div key={t.id} className="thread-row" style={{ ...styles.threadRow, animationDelay: `${i * 0.05}s` }}>
                <div style={styles.threadLeft}>
                  <span style={styles.threadTag}>{t.tag}</span>
                  <p style={styles.threadTitle}>{t.title}</p>
                </div>
                <div style={styles.threadRight}>
                  <span style={styles.threadStat}>▲ {t.upvotes || 0}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved routes */}
        {savedRoutes.length > 0 && (
          <div style={styles.section}>
            <span style={styles.eyebrow}>// SAVED ROUTES</span>
            <div style={styles.chipRow}>
              {savedRoutes.map((r, i) => (
                <span key={i} style={styles.communityChip}>Route {r}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  root: { minHeight: '100vh', background: '#080808', fontFamily: '"DM Sans", sans-serif', position: 'relative' },
  hexBg: { position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, #FFD70008 1px, transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 },
  container: { position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '60px 40px 80px', display: 'flex', flexDirection: 'column', gap: '32px' },
  profileCard: { display: 'flex', gap: '32px', background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '12px', padding: '36px', alignItems: 'flex-start', flexWrap: 'wrap' },
  avatarSection: { flexShrink: 0 },
  avatarWrap: { position: 'relative', width: '96px', height: '96px', cursor: 'pointer', borderRadius: '50%', overflow: 'hidden' },
  avatarImg: { width: '100%', height: '100%', objectFit: 'cover', border: '2px solid #FFD700', borderRadius: '50%' },
  avatarInit: { width: '96px', height: '96px', borderRadius: '50%', background: '#111', border: '2px solid #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bebas Neue", sans-serif', fontSize: '40px', color: '#FFD700' },
  avatarOverlay: { position: 'absolute', inset: 0, background: '#00000088', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s', borderRadius: '50%' },
  avatarOverlayText: { fontSize: '24px' },
  profileInfo: { flex: 1, minWidth: '200px' },
  displayName: { fontFamily: '"Bebas Neue", sans-serif', fontSize: '48px', color: '#E8E8E8', margin: '0 0 4px', letterSpacing: '2px', lineHeight: 1 },
  nameInput: { background: '#080808', border: '1px solid #1A1A1A', borderRadius: '6px', padding: '10px 14px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '36px', color: '#E8E8E8', width: '100%', boxSizing: 'border-box', letterSpacing: '2px', transition: 'border-color 0.2s' },
  email: { fontFamily: '"DM Mono", monospace', fontSize: '12px', color: '#444', margin: '0 0 12px', letterSpacing: '0.05em' },
  metaRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' },
  metaTag: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.1em' },
  bio: { fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#666', lineHeight: 1.6 },
  profileActions: { display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 },
  editBtn: { background: 'none', border: '1px solid #FFD700', borderRadius: '6px', padding: '10px 20px', fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', cursor: 'pointer', letterSpacing: '0.15em' },
  saveBtn: { background: '#FFD700', border: 'none', borderRadius: '6px', padding: '10px 20px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '18px', color: '#000', cursor: 'pointer', letterSpacing: '2px', clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' },
  cancelBtn: { background: 'none', border: '1px solid #333', borderRadius: '6px', padding: '10px 20px', fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#555', cursor: 'pointer', letterSpacing: '0.1em' },
  logoutBtn: { background: 'none', border: '1px solid #EF444430', borderRadius: '6px', padding: '10px 20px', fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#EF4444', cursor: 'pointer', letterSpacing: '0.1em' },
  section: { display: 'flex', flexDirection: 'column', gap: '14px' },
  eyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', letterSpacing: '0.2em' },
  chipRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  chip: { background: 'none', border: '1px solid #1A1A1A', borderRadius: '4px', padding: '6px 14px', fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#555', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.1em' },
  chipActive: { borderColor: '#FFD700', color: '#FFD700', background: '#FFD70010' },
  communityChip: { background: '#111', border: '1px solid #1A1A1A', borderRadius: '4px', padding: '6px 14px', fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#666', letterSpacing: '0.1em' },
  goldStripe: { height: '1px', background: 'linear-gradient(90deg, #FFD700, #FFD70055, transparent)' },
  statsRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },
  statBox: { background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '8px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' },
  statVal: { fontFamily: '"Bebas Neue", sans-serif', fontSize: '40px', color: '#FFD700', lineHeight: 1 },
  statUnit: { fontFamily: '"DM Mono", monospace', fontSize: '12px', color: '#888' },
  statLabel: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#444', letterSpacing: '0.15em', textAlign: 'center' },
  threadList: { display: 'flex', flexDirection: 'column', gap: '10px' },
  threadRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '8px', padding: '14px 18px', animation: 'fadeSlideUp 0.3s ease both', transition: 'border-color 0.2s' },
  threadLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  threadTag: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#555', border: '1px solid #1A1A1A', borderRadius: '4px', padding: '3px 8px', letterSpacing: '0.1em' },
  threadTitle: { fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#E8E8E8', margin: 0 },
  threadRight: { display: 'flex', gap: '16px', alignItems: 'center' },
  threadStat: { fontFamily: '"DM Mono", monospace', fontSize: '12px', color: '#555' },
  emptyText: { fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#333' },
};

export default Profile;
