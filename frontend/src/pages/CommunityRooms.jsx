// ── FILE: src/pages/CommunityRooms.jsx ──────────────────────────────────────────
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase/config';

const CommunityRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [roomData, setRoomData] = useState({});

  useEffect(() => {
    const fetchRoomsAndStats = async () => {
      // 1. Fetch Rooms
      const { data: roomsData } = await supabase.from('rooms').select('*');
      if (roomsData) setRooms(roomsData);

      const stats = {};
      
      for (const room of roomsData || []) {
        // 2. Member Count
        const { count: memberCount } = await supabase
          .from('community_members')
          .select('uid', { count: 'exact', head: true })
          .eq('room_id', room.id);

        // 3. Online Count (from live_riders updated within last 60s)
        const oneMinuteAgo = new Date(Date.now() - 60000).toISOString();
        const { count: onlineCount } = await supabase
          .from('live_riders')
          .select('uid', { count: 'exact', head: true })
          .gt('updated_at', oneMinuteAgo);

        // 4. Last Message
        const { data: lastMessageData } = await supabase
          .from('messages')
          .select('display_name, text, image_url')
          .eq('room_id', room.id)
          .order('created_at', { ascending: false })
          .limit(1);
        
        let lastMessage = 'No messages yet';
        if (lastMessageData && lastMessageData.length > 0) {
          const msg = lastMessageData[0];
          lastMessage = `${msg.display_name}: ${msg.text || '📷 Image'}`;
        }

        stats[room.id] = {
          memberCount: memberCount || 0,
          onlineCount: onlineCount || 0, // In reality, we might want this per room, but the schema has live_riders overall. Using overall online count or keeping it simple.
          lastMessage
        };
      }
      
      setRoomData(stats);
    };

    fetchRoomsAndStats();

    // Optionally set up real-time for messages to update 'last message'
    const channel = supabase.channel('rooms-overview')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, () => {
        fetchRoomsAndStats(); // Re-fetch on new message
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const icons = {
    'road-riders': '🚴',
    'mtb-crew': '🚵',
    'gravel-gang': '🪨',
    'training-lab': '⚡',
    'bengaluru-local': '📍'
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .room-card:hover { border-color: #FFD70055 !important; transform: translateY(-2px); box-shadow: 0 8px 32px #FFD70008; }
      `}</style>
      <div style={styles.hexBg} />
      <div style={styles.container}>
        <div style={styles.breadcrumb}>
          <Link to="/community" style={styles.breadLink}>Community</Link>
          <span style={styles.breadSep}>/</span>
          <span style={styles.breadCurrent}>Rooms</span>
        </div>
        <span style={styles.eyebrow}>// COMMUNITY ROOMS</span>
        <h1 style={styles.title}>LIVE CHAT ROOMS</h1>
        <p style={styles.subtitle}>Join a room and connect with riders in real time</p>
        <div style={styles.goldStripe} />
        <div style={styles.grid}>
          {rooms.map((room, i) => {
            const data = roomData[room.id] || {};
            return (
              <Link key={room.id} to={`/community/rooms/${room.id}`} style={{ textDecoration: 'none' }}>
                <div className="room-card" style={{ ...styles.card, animationDelay: `${i * 0.07}s` }}>
                  <div style={styles.cardTop}>
                    <span style={styles.roomIcon}>{icons[room.id] || '💬'}</span>
                    <div style={styles.onlineBadge}>
                      <span style={styles.onlineDot} />
                      <span style={styles.onlineText}>{data.onlineCount ?? 0} online</span>
                    </div>
                  </div>
                  <h2 style={styles.roomName}>{room.name}</h2>
                  <p style={styles.roomDesc}>{room.description}</p>
                  <div style={styles.cardFooter}>
                    <div style={styles.lastMsg}>{data.lastMessage || 'No messages yet'}</div>
                    <span style={styles.joinArrow}>JOIN →</span>
                  </div>
                  <div style={styles.msgCount}>
                    <span style={styles.msgCountLabel}>MEMBERS</span>
                    <span style={styles.msgCountVal}>{data.memberCount ?? 0}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: { minHeight: '100vh', background: '#080808', position: 'relative', fontFamily: '"DM Sans", sans-serif' },
  hexBg: { position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, #FFD70008 1px, transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 },
  container: { position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '60px 40px 80px' },
  breadcrumb: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' },
  breadLink: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#555', textDecoration: 'none', letterSpacing: '0.1em' },
  breadSep: { color: '#333', fontFamily: '"DM Mono", monospace', fontSize: '11px' },
  breadCurrent: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', letterSpacing: '0.1em' },
  eyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' },
  title: { fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(48px,6vw,80px)', color: '#E8E8E8', lineHeight: 1, margin: '0 0 8px' },
  subtitle: { fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#555', marginBottom: '32px' },
  goldStripe: { height: '2px', background: 'linear-gradient(90deg, #FFD700, #FFD70055, transparent)', marginBottom: '48px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '12px', padding: '28px', animation: 'fadeSlideUp 0.4s ease both', transition: 'all 0.25s', display: 'flex', flexDirection: 'column', gap: '12px', cursor: 'pointer' },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
  roomIcon: { fontSize: '32px', lineHeight: 1 },
  onlineBadge: { display: 'flex', alignItems: 'center', gap: '6px', background: '#0A1A0A', border: '1px solid #1A3A1A', borderRadius: '20px', padding: '4px 10px' },
  onlineDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E', animation: 'goldPulse 2s infinite' },
  onlineText: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#22C55E', letterSpacing: '0.1em' },
  roomName: { fontFamily: '"Bebas Neue", sans-serif', fontSize: '28px', color: '#E8E8E8', letterSpacing: '2px', margin: 0 },
  roomDesc: { fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#555', lineHeight: 1.5, margin: 0, flex: 1 },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #111', paddingTop: '14px', marginTop: '4px' },
  lastMsg: { fontFamily: '"DM Sans", sans-serif', fontSize: '12px', color: '#444', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  joinArrow: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', letterSpacing: '0.15em', flexShrink: 0, marginLeft: '12px' },
  msgCount: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#080808', borderRadius: '6px', padding: '10px 14px' },
  msgCountLabel: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#333', letterSpacing: '0.15em' },
  msgCountVal: { fontFamily: '"DM Mono", monospace', fontSize: '18px', color: '#FFD700' },
};

export default CommunityRooms;
