// ── FILE: src/components/NotificationBell.jsx ──────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabase/config';
import { useAuth } from '../context/AuthContext';

const ICONS = { wave: '👋', reply: '💬', 'ride-invite': '📍', default: '🔔' };

const fmtTime = (ts) => {
  if (!ts) return '';
  const diff = (Date.now() - new Date(ts).getTime()) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const NotificationBell = () => {
  const { currentUser } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchNotifs = async () => {
      const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('uid', currentUser.id)
        .order('created_at', { ascending: false });
      if (data) setNotifications(data);
    };

    fetchNotifs();

    const channel = supabase.channel('notifications-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications', filter: `uid=eq.${currentUser.id}` }, fetchNotifs)
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [currentUser]);

  const unread = notifications.filter(n => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = async () => {
    if (!currentUser) return;
    await supabase.from('notifications').update({ read: true }).eq('uid', currentUser.id).eq('read', false);
  };

  const markOne = async (id) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
  };

  if (!currentUser) return null;

  return (
    <div ref={ref} style={styles.root}>
      <button onClick={() => setOpen(v => !v)} style={styles.bell}>
        <span style={styles.bellIcon}>🔔</span>
        {unread > 0 && (
          <span style={styles.badge}>{unread > 9 ? '9+' : unread}</span>
        )}
      </button>

      {open && (
        <div style={styles.dropdown}>
          <div style={styles.dropHeader}>
            <span style={styles.eyebrow}>// NOTIFICATIONS</span>
            {unread > 0 && (
              <button onClick={markAllRead} style={styles.markAllBtn}>Mark all read</button>
            )}
          </div>
          <div style={styles.list}>
            {notifications.length === 0 && (
              <div style={styles.empty}>
                <span style={styles.emptyIcon}>🔕</span>
                <p style={styles.emptyText}>No notifications yet</p>
              </div>
            )}
            {notifications.map(n => (
              <div
                key={n.id}
                onClick={() => markOne(n.id)}
                style={{ ...styles.notifRow, background: n.read ? 'transparent' : '#FFD70008' }}
              >
                <span style={styles.notifIcon}>{ICONS[n.type] || ICONS.default}</span>
                <div style={styles.notifContent}>
                  <p style={styles.notifMsg}>{n.message}</p>
                  <p style={styles.notifTime}>{fmtTime(n.created_at)}</p>
                </div>
                {!n.read && <span style={styles.unreadDot} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  root: { position: 'relative' },
  bell: { background: 'none', border: 'none', cursor: 'pointer', position: 'relative', padding: '8px', display: 'flex', alignItems: 'center' },
  bellIcon: { fontSize: '18px', lineHeight: 1 },
  badge: { position: 'absolute', top: '2px', right: '2px', background: '#EF4444', color: '#fff', borderRadius: '10px', minWidth: '16px', height: '16px', fontFamily: '"DM Mono", monospace', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 3px', lineHeight: 1, border: '1px solid #080808' },
  dropdown: { position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '320px', background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '10px', boxShadow: '0 8px 32px #00000099', zIndex: 200, overflow: 'hidden' },
  dropHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #111' },
  eyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#FFD700', letterSpacing: '0.2em' },
  markAllBtn: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#555', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' },
  list: { maxHeight: '360px', overflowY: 'auto' },
  notifRow: { display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid #0A0A0A', transition: 'background 0.15s' },
  notifIcon: { fontSize: '16px', flexShrink: 0, marginTop: '1px' },
  notifContent: { flex: 1, minWidth: 0 },
  notifMsg: { fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#CCC', margin: '0 0 4px', lineHeight: 1.4 },
  notifTime: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#444', margin: 0 },
  unreadDot: { width: '7px', height: '7px', borderRadius: '50%', background: '#FFD700', flexShrink: 0, marginTop: '4px' },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '32px 16px', gap: '10px' },
  emptyIcon: { fontSize: '28px' },
  emptyText: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#333', letterSpacing: '0.1em' },
};

export default NotificationBell;
