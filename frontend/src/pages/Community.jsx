// ── FILE: src/pages/Community.jsx ──────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase/config';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import Leaderboard from '../components/Leaderboard';
import toast from 'react-hot-toast';

const TAGS = ['ALL', 'BUILDS', 'ADVICE', 'ROUTES', 'RACES', 'GEAR'];
const EMOJIS = { BUILDS: '🔧', ADVICE: '💡', ROUTES: '🗺️', RACES: '🏁', GEAR: '⚙️' };

const ActivityCard = ({ ride }) => (
  <div style={styles.actCard}>
    <div style={styles.actHeader}>
      <div style={styles.avatar(ride.users?.photo_url)}>
        {!ride.users?.photo_url && (ride.users?.display_name?.[0] || '?')}
      </div>
      <div>
        <p style={styles.actName}>{ride.users?.display_name}</p>
        <p style={styles.actTime}>{ride.name}</p>
      </div>
      <button style={styles.likeBtn}>
        {/* Like functionality for ride_logs can be added later, keeping it simple for now */}
        ❤️ <span style={styles.likeCount}>{ride.feeling || 0}</span>
      </button>
    </div>
    <div style={styles.actStats}>
      {[['DISTANCE', `${ride.distance} km`], ['ELEVATION', `${ride.elevation} m`], ['TIME', ride.duration]].map(([k, v]) => (
        <div key={k} style={styles.actStat}>
          <span style={styles.actStatLabel}>{k}</span>
          <span style={styles.actStatVal}>{v}</span>
        </div>
      ))}
    </div>
  </div>
);

const Community = () => {
  const { currentUser, userProfile } = useAuth();
  const [mainTab, setMainTab] = useState('THREADS'); // 'THREADS' | 'ACTIVITY'
  const [activeTag, setActiveTag] = useState('ALL');
  const [threads, setThreads] = useState([]);
  const [upvotedThreads, setUpvotedThreads] = useState(new Set());
  const [activityFeed, setActivityFeed] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newThread, setNewThread] = useState({ title: '', body: '', tag: 'BUILDS' });
  const [posting, setPosting] = useState(false);
  const [joined, setJoined] = useState(false);

  // Fetch threads & upvotes
  const fetchThreads = async () => {
    let q = supabase
      .from('threads')
      .select('*, users!inner(display_name, photo_url)')
      .order('created_at', { ascending: false });

    if (activeTag !== 'ALL') {
      q = q.eq('tag', activeTag);
    }

    const { data, error } = await q;
    if (error) console.error('Error fetching threads:', error);
    else setThreads(data || []);

    if (currentUser) {
      const { data: upvotes } = await supabase
        .from('thread_upvotes')
        .select('thread_id')
        .eq('uid', currentUser.id);
      
      if (upvotes) {
        setUpvotedThreads(new Set(upvotes.map(u => u.thread_id)));
      }
    }
  };

  // Fetch activity feed
  const fetchActivity = async () => {
    const { data, error } = await supabase
      .from('ride_logs')
      .select('*, users!inner(display_name, photo_url)')
      .eq('is_public', true)
      .order('logged_at', { ascending: false });
    
    if (error) console.error('Error fetching activity:', error);
    else setActivityFeed(data || []);
  };

  // Setup real-time listeners
  useEffect(() => {
    fetchThreads();
    const channel = supabase.channel('threads-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'threads' }, fetchThreads)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'thread_upvotes' }, fetchThreads)
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [activeTag, currentUser]);

  useEffect(() => {
    fetchActivity();
    const channel = supabase.channel('activity-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ride_logs' }, fetchActivity)
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const handleUpvote = async (thread) => {
    if (!currentUser) return;
    const isVoted = upvotedThreads.has(thread.id);
    const newUpvotes = isVoted ? Math.max((thread.upvotes || 1) - 1, 0) : (thread.upvotes || 0) + 1;

    // Optimistic UI update
    setUpvotedThreads(prev => {
      const next = new Set(prev);
      if (isVoted) next.delete(thread.id);
      else next.add(thread.id);
      return next;
    });

    if (isVoted) {
      await supabase.from('thread_upvotes').delete().match({ uid: currentUser.id, thread_id: thread.id });
    } else {
      await supabase.from('thread_upvotes').insert({ uid: currentUser.id, thread_id: thread.id });
    }

    await supabase.from('threads').update({ upvotes: newUpvotes }).eq('id', thread.id);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    if (!newThread.title.trim() || !newThread.body.trim()) return;
    setPosting(true);
    
    const { error } = await supabase.from('threads').insert({
      uid: currentUser.id,
      title: newThread.title,
      excerpt: newThread.body,
      tag: newThread.tag,
      upvotes: 0,
      pinned: false
    });

    setPosting(false);
    if (error) {
      toast.error('Failed to post thread');
      console.error(error);
    } else {
      setNewThread({ title: '', body: '', tag: 'BUILDS' });
      setModalOpen(false);
      toast.success('Thread posted!');
    }
  };

  const handleJoin = async () => {
    if (!currentUser) return;
    // Just an example action, e.g. joining a default room
    const { error } = await supabase.from('community_members').insert({ uid: currentUser.id, room_id: 'road-riders' });
    if (!error || error.code === '23505') setJoined(true);
  };

  const fmtTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    const diff = (Date.now() - d) / 1000;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes goldPulse { 0%,100%{opacity:.6} 50%{opacity:1} }
        .comm-tag:hover { border-color: #FFD70088 !important; color: #FFD700 !important; }
        .thread-card:hover { border-color: #2A2A2A !important; }
        .upvote-btn:hover { color: #FFD700 !important; }
        .modal-backdrop { backdrop-filter: blur(8px); }
      `}</style>
      <div style={styles.hexBg} />

      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <span style={styles.eyebrow}>// THE PIT LANE</span>
            <h1 style={styles.title}>COMMUNITY</h1>
            <p style={styles.subtitle}>Connecting Riders Across India</p>
          </div>
          <div style={styles.headerActions}>
            {!joined && (
              <button onClick={handleJoin} style={styles.joinBtn}>
                JOIN COMMUNITY
              </button>
            )}
            <button onClick={() => setModalOpen(true)} style={styles.postBtn}>
              NEW THREAD +
            </button>
            <Link to="/community/rooms" style={styles.roomsLink}>
              💬 LIVE ROOMS →
            </Link>
            <Link to="/community/live-map" style={styles.mapLink}>
              📍 LIVE MAP →
            </Link>
          </div>
        </div>

        {/* Gold stripe */}
        <div style={styles.goldStripe} />

        {/* Main tabs */}
        <div style={styles.mainTabs}>
          {['THREADS', 'ACTIVITY FEED'].map(t => (
            <button key={t} onClick={() => setMainTab(t.split(' ')[0])}
              style={{ ...styles.mainTab, ...(mainTab === t.split(' ')[0] ? styles.mainTabActive : {}) }}>
              {t}
            </button>
          ))}
        </div>

        <div style={styles.layout}>
          <div style={styles.feed}>
            {mainTab === 'THREADS' && (
              <>
                {/* Tag filters */}
                <div style={styles.tagRow}>
                  {TAGS.map(tag => (
                    <button key={tag} onClick={() => setActiveTag(tag)}
                      className="comm-tag"
                      style={{ ...styles.tagBtn, ...(activeTag === tag ? styles.tagActive : {}) }}>
                      {EMOJIS[tag] ? `${EMOJIS[tag]} ` : ''}{tag}
                    </button>
                  ))}
                </div>

                {/* Thread list */}
                <div style={styles.threadList}>
                  {threads.length === 0 && (
                    <div style={styles.empty}>
                      <span style={styles.emptyIcon}>🚴</span>
                      <p style={styles.emptyText}>No threads yet. Be the first to post!</p>
                    </div>
                  )}
                  {threads.map((t, i) => {
                    const voted = upvotedThreads.has(t.id);
                    return (
                      <div key={t.id} className="thread-card" style={{ ...styles.threadCard, animationDelay: `${i * 0.05}s` }}>
                        <div style={styles.threadMeta}>
                          <div style={styles.avatarWrap}>
                            {t.users?.photo_url
                              ? <img src={t.users.photo_url} alt="" style={styles.avatarImg} />
                              : <div style={styles.avatarInitials}>{t.users?.display_name?.[0] || '?'}</div>}
                          </div>
                          <div>
                            <p style={styles.threadAuthor}>{t.users?.display_name}</p>
                            <p style={styles.threadTime}>{fmtTime(t.created_at)}</p>
                          </div>
                          <span style={{ ...styles.tagPill, marginLeft: 'auto' }}>
                            {EMOJIS[t.tag]} {t.tag}
                          </span>
                        </div>
                        <h3 style={styles.threadTitle}>{t.title}</h3>
                        <p style={styles.threadBody}>{t.excerpt}</p>
                        <div style={styles.threadActions}>
                          <button className="upvote-btn" onClick={() => handleUpvote(t)}
                            style={{ ...styles.upvoteBtn, color: voted ? '#FFD700' : '#555' }}>
                            ▲ <span style={styles.upvoteCount}>{t.upvotes || 0}</span>
                          </button>
                          <button style={styles.shareBtn}>Share</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {mainTab === 'ACTIVITY' && (
              <div style={styles.actFeed}>
                {activityFeed.length === 0 && (
                  <div style={styles.empty}>
                    <span style={styles.emptyIcon}>🚵</span>
                    <p style={styles.emptyText}>No ride activity yet. Log your first ride!</p>
                  </div>
                )}
                {activityFeed.map((r, i) => (
                  <ActivityCard key={r.id} ride={r} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside style={styles.sidebar}>
            <Leaderboard />
            <div style={styles.sideCard}>
              <p style={styles.sideEyebrow}>// QUICK LINKS</p>
              {[
                { to: '/community/rooms', label: '💬 Live Chat Rooms' },
                { to: '/community/live-map', label: '📍 Live Rider Map' },
                { to: '/tracker', label: '🚴 Log a Ride' },
                { to: '/routes', label: '🗺️ Browse Routes' },
              ].map(({ to, label }) => (
                <Link key={to} to={to} style={styles.sideLink}>{label}</Link>
              ))}
            </div>
          </aside>
        </div>
      </div>

      {/* New Thread Modal */}
      {modalOpen && (
        <div className="modal-backdrop" style={styles.backdrop} onClick={() => setModalOpen(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span style={styles.eyebrow}>// NEW THREAD</span>
              <button onClick={() => setModalOpen(false)} style={styles.closeBtn}>✕</button>
            </div>
            <form onSubmit={handlePost} style={styles.modalForm}>
              <div style={styles.modalField}>
                <label style={styles.modalLabel}>// TAG</label>
                <div style={styles.tagSelectRow}>
                  {TAGS.filter(t => t !== 'ALL').map(tag => (
                    <button key={tag} type="button" onClick={() => setNewThread(f => ({ ...f, tag }))}
                      style={{ ...styles.tagBtn, ...(newThread.tag === tag ? styles.tagActive : {}) }}>
                      {EMOJIS[tag]} {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div style={styles.modalField}>
                <label style={styles.modalLabel}>// TITLE</label>
                <input value={newThread.title} onChange={e => setNewThread(f => ({ ...f, title: e.target.value }))}
                  placeholder="What's your thread about?"
                  style={styles.modalInput} />
              </div>
              <div style={styles.modalField}>
                <label style={styles.modalLabel}>// BODY</label>
                <textarea value={newThread.body} onChange={e => setNewThread(f => ({ ...f, body: e.target.value }))}
                  placeholder="Write your post here..."
                  rows={5} style={{ ...styles.modalInput, resize: 'vertical' }} />
              </div>
              <button type="submit" disabled={posting} style={styles.submitBtn}>
                {posting ? 'POSTING...' : 'POST THREAD'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  root: { minHeight: '100vh', background: '#080808', position: 'relative', fontFamily: '"DM Sans", sans-serif' },
  hexBg: { position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, #FFD70008 1px, transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 },
  container: { position: 'relative', zIndex: 1, maxWidth: '1100px', margin: '0 auto', padding: '60px 40px 80px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '24px' },
  eyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' },
  title: { fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(48px,6vw,80px)', color: '#E8E8E8', lineHeight: 1, margin: 0 },
  subtitle: { fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#555', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '8px' },
  headerActions: { display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' },
  joinBtn: { background: 'none', border: '1px solid #FFD700', color: '#FFD700', padding: '10px 18px', fontFamily: '"DM Mono", monospace', fontSize: '11px', letterSpacing: '0.15em', borderRadius: '4px', cursor: 'pointer' },
  postBtn: { background: '#FFD700', color: '#000', border: 'none', padding: '10px 20px', fontFamily: '"DM Mono", monospace', fontSize: '11px', letterSpacing: '0.15em', borderRadius: '4px', cursor: 'pointer', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' },
  roomsLink: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#888', letterSpacing: '0.15em', textDecoration: 'none', padding: '10px 14px', border: '1px solid #1A1A1A', borderRadius: '4px' },
  mapLink: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#888', letterSpacing: '0.15em', textDecoration: 'none', padding: '10px 14px', border: '1px solid #1A1A1A', borderRadius: '4px' },
  goldStripe: { height: '2px', background: 'linear-gradient(90deg, #FFD700, #FFD70055, transparent)', marginBottom: '32px' },
  mainTabs: { display: 'flex', gap: '0', borderBottom: '1px solid #1A1A1A', marginBottom: '32px' },
  mainTab: { padding: '12px 24px', fontFamily: '"DM Mono", monospace', fontSize: '11px', letterSpacing: '0.15em', color: '#444', background: 'none', border: 'none', borderBottom: '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' },
  mainTabActive: { color: '#FFD700', borderBottomColor: '#FFD700' },
  layout: { display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' },
  feed: {},
  tagRow: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' },
  tagBtn: { background: 'none', border: '1px solid #1A1A1A', borderRadius: '4px', padding: '6px 14px', fontFamily: '"DM Mono", monospace', fontSize: '10px', letterSpacing: '0.15em', color: '#555', cursor: 'pointer', transition: 'all 0.2s' },
  tagActive: { borderColor: '#FFD700', color: '#FFD700', background: '#FFD70010' },
  threadList: { display: 'flex', flexDirection: 'column', gap: '16px' },
  threadCard: { background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '8px', padding: '24px', animation: 'fadeSlideUp 0.4s ease both', transition: 'border-color 0.2s', cursor: 'pointer' },
  threadMeta: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  avatarWrap: { flexShrink: 0 },
  avatarImg: { width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #FFD70040' },
  avatarInitials: { width: '40px', height: '40px', borderRadius: '50%', background: '#111', border: '1px solid #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bebas Neue", sans-serif', fontSize: '18px', color: '#FFD700' },
  threadAuthor: { fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#E8E8E8', fontWeight: 600, margin: 0 },
  threadTime: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#444', letterSpacing: '0.1em', margin: 0 },
  tagPill: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#777', border: '1px solid #222', borderRadius: '4px', padding: '4px 8px', letterSpacing: '0.1em' },
  threadTitle: { fontFamily: '"DM Sans", sans-serif', fontSize: '17px', color: '#E8E8E8', fontWeight: 600, margin: '0 0 8px' },
  threadBody: { fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#666', lineHeight: 1.6, margin: '0 0 20px' },
  threadActions: { display: 'flex', alignItems: 'center', gap: '20px', borderTop: '1px solid #111', paddingTop: '16px' },
  upvoteBtn: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"DM Mono", monospace', fontSize: '13px', transition: 'color 0.2s' },
  upvoteCount: { fontFamily: '"DM Mono", monospace', fontSize: '13px' },
  commentBtn: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#555' },
  shareBtn: { marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#333', letterSpacing: '0.1em', textTransform: 'uppercase' },
  empty: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0', gap: '16px' },
  emptyIcon: { fontSize: '48px' },
  emptyText: { fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#444' },
  actFeed: { display: 'flex', flexDirection: 'column', gap: '16px' },
  actCard: { background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '8px', padding: '20px' },
  actHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  actName: { fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#E8E8E8', fontWeight: 600, margin: 0 },
  actTime: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#555', margin: 0 },
  likeBtn: { marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontFamily: '"DM Mono", monospace', fontSize: '12px', color: '#555', display: 'flex', alignItems: 'center', gap: '4px' },
  likeCount: { color: '#888' },
  actStats: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: '#080808', borderRadius: '6px', padding: '14px' },
  actStat: { display: 'flex', flexDirection: 'column', gap: '4px' },
  actStatLabel: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#444', letterSpacing: '0.15em', textTransform: 'uppercase' },
  actStatVal: { fontFamily: '"DM Mono", monospace', fontSize: '16px', color: '#FFD700' },
  avatar: (url) => ({ width: '40px', height: '40px', borderRadius: '50%', background: url ? 'transparent' : '#111', border: '1px solid #FFD70040', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bebas Neue", sans-serif', fontSize: '18px', color: '#FFD700', overflow: 'hidden', flexShrink: 0, backgroundSize: 'cover', backgroundPosition: 'center', backgroundImage: url ? `url(${url})` : 'none' }),
  sidebar: { display: 'flex', flexDirection: 'column', gap: '24px', position: 'sticky', top: '80px' },
  sideCard: { background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '8px', padding: '20px' },
  sideEyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#FFD700', letterSpacing: '0.2em', marginBottom: '16px', display: 'block' },
  sideLink: { display: 'block', fontFamily: '"DM Sans", sans-serif', fontSize: '13px', color: '#666', textDecoration: 'none', padding: '10px 0', borderBottom: '1px solid #111', transition: 'color 0.2s' },
  backdrop: { position: 'fixed', inset: 0, background: '#00000099', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  modal: { background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '12px', width: '100%', maxWidth: '560px', padding: '32px', maxHeight: '90vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  closeBtn: { background: 'none', border: 'none', color: '#555', fontSize: '18px', cursor: 'pointer' },
  modalForm: { display: 'flex', flexDirection: 'column', gap: '20px' },
  modalField: { display: 'flex', flexDirection: 'column', gap: '8px' },
  modalLabel: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#FFD700', letterSpacing: '0.2em' },
  tagSelectRow: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  modalInput: { background: '#080808', border: '1px solid #1A1A1A', borderRadius: '6px', padding: '12px 16px', fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#E8E8E8', width: '100%', boxSizing: 'border-box' },
  submitBtn: { background: '#FFD700', color: '#000', border: 'none', borderRadius: '6px', padding: '14px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '18px', letterSpacing: '3px', cursor: 'pointer', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' },
};

export default Community;
