// ── FILE: src/components/Leaderboard.jsx ──────────────────────────────────────────
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabase/config';

const MEDALS = { 0: '🥇', 1: '🥈', 2: '🥉' };
const MEDAL_COLORS = { 0: '#FFD700', 1: '#C0C0C0', 2: '#CD7F32' };

const Leaderboard = () => {
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    // Read from leaderboard_monthly
    const { data } = await supabase
      .from('leaderboard_monthly')
      .select('*, users(display_name)')
      .order('total_distance', { ascending: false })
      .limit(10);
      
    if (data) {
      setRiders(data.map(r => ({
        uid: r.uid,
        displayName: r.users?.display_name || 'Rider',
        totalKm: r.total_distance,
        rides: r.rides
      })));
    } else {
      setRiders([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard();

    const channel = supabase.channel('leaderboard-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'leaderboard_monthly' }, fetchLeaderboard)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  return (
    <div style={styles.root}>
      <style>{`
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .lb-row:hover { background: #0F0F0F !important; }
      `}</style>
      <p style={styles.eyebrow}>// MONTHLY LEADERBOARD</p>
      <p style={styles.period}>Top riders by total distance this month</p>

      {loading && (
        <div style={styles.loading}>
          <div style={styles.loadingBar} />
          <div style={styles.loadingBar} />
          <div style={styles.loadingBar} />
        </div>
      )}

      {!loading && riders.length === 0 && (
        <p style={styles.emptyText}>No rides logged this month yet. Be first!</p>
      )}

      <div style={styles.list}>
        {riders.map((rider, i) => (
          <div key={rider.uid || i} className="lb-row"
            style={{ ...styles.row, animationDelay: `${i * 0.06}s` }}>
            <div style={styles.rankWrap}>
              {i < 3
                ? <span style={styles.medal}>{MEDALS[i]}</span>
                : <span style={{ ...styles.rank, color: '#333' }}>{i + 1}</span>}
            </div>
            <div style={styles.avatar(i)}>
              {rider.displayName?.[0] || '?'}
            </div>
            <div style={styles.info}>
              <p style={styles.name}>{rider.displayName}</p>
              <p style={styles.rides}>{rider.rides || 0} rides</p>
            </div>
            <div style={styles.distWrap}>
              <span style={{ ...styles.dist, color: MEDAL_COLORS[i] || '#E8E8E8' }}>
                {rider.totalKm?.toFixed(1) || '0.0'}
              </span>
              <span style={styles.distUnit}>km</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exported helper — call this when user logs a ride to update leaderboard
export const updateLeaderboard = async (uid, addedKm) => {
  await supabase.rpc('increment_leaderboard', { p_uid: uid, p_distance: addedKm });
};

const styles = {
  root: { background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '8px', padding: '20px', overflow: 'hidden' },
  eyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#FFD700', letterSpacing: '0.2em', margin: '0 0 4px' },
  period: { fontFamily: '"DM Sans", sans-serif', fontSize: '12px', color: '#444', margin: '0 0 16px' },
  list: { display: 'flex', flexDirection: 'column', gap: '4px' },
  row: { display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 10px', borderRadius: '6px', animation: 'fadeSlideUp 0.3s ease both', transition: 'background 0.15s', cursor: 'default' },
  rankWrap: { width: '24px', textAlign: 'center', flexShrink: 0 },
  medal: { fontSize: '16px', lineHeight: 1 },
  rank: { fontFamily: '"DM Mono", monospace', fontSize: '12px' },
  avatar: (i) => ({
    width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
    background: '#111',
    border: `1px solid ${MEDAL_COLORS[i] || '#1A1A1A'}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: '"Bebas Neue", sans-serif', fontSize: '13px',
    color: MEDAL_COLORS[i] || '#555',
  }),
  info: { flex: 1, minWidth: 0 },
  name: { fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#DDD', fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  rides: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#444', margin: 0 },
  distWrap: { display: 'flex', alignItems: 'baseline', gap: '2px', flexShrink: 0 },
  dist: { fontFamily: '"Bebas Neue", sans-serif', fontSize: '22px', lineHeight: 1 },
  distUnit: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#555' },
  loading: { display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' },
  loadingBar: { height: '36px', borderRadius: '6px', background: 'linear-gradient(90deg,#111 25%,#1A1A1A 50%,#111 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite' },
  emptyText: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#333', letterSpacing: '0.1em' },
};

export default Leaderboard;
