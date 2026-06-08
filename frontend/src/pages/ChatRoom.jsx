// ── FILE: src/pages/ChatRoom.jsx ──────────────────────────────────────────
import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../supabase/config';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ROOM_NAMES = {
  'road-riders': 'Road Riders',
  'mtb-crew': 'MTB Crew',
  'gravel-gang': 'Gravel Gang',
  'training-lab': 'Training Lab',
  'bengaluru-local': 'Bengaluru Local Riders',
};

const EMOJI_LIST = ['😂','👍','🔥','❤️','😍','🎉','💪','🚴','🏆','🤙','😎','🙌','✅','⚡','🗺️','🤔','😅','🙏','💯','🚵'];

const fmtTime = (ts) => {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
};

const ChatRoom = () => {
  const { roomId } = useParams();
  const { currentUser, userProfile } = useAuth();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [onlineCount, setOnlineCount] = useState(0);
  const [showEmoji, setShowEmoji] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [rideModal, setRideModal] = useState(false);
  const [rideForm, setRideForm] = useState({ location: '', time: '', note: '' });
  const [inviteSending, setInviteSending] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const roomName = ROOM_NAMES[roomId] || roomId;
  const myName = userProfile?.display_name || currentUser?.user_metadata?.full_name || 'Rider';
  const myPhoto = userProfile?.photo_url || currentUser?.user_metadata?.avatar_url || null;

  // Real-time messages & Presence
  useEffect(() => {
    if (!currentUser) return;

    // Join Room automatically
    supabase.from('community_members')
      .upsert({ uid: currentUser.id, room_id: roomId }, { onConflict: 'uid,room_id' })
      .then();

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('room_id', roomId)
        .order('created_at', { ascending: true });
      if (!error && data) {
        setMessages(data);
      }
    };
    fetchMessages();

    // Messages Channel
    const messageChannel = supabase.channel(`room-${roomId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` }, (payload) => {
        setMessages((prev) => [...prev, payload.new]);
      })
      .subscribe();

    // Presence Channel
    const presenceChannel = supabase.channel(`presence-${roomId}`, {
      config: { presence: { key: currentUser.id } },
    });

    presenceChannel.on('presence', { event: 'sync' }, () => {
      const state = presenceChannel.presenceState();
      setOnlineCount(Object.keys(state).length);
    });

    presenceChannel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        await presenceChannel.track({
          uid: currentUser.id,
          display_name: myName
        });
      }
    });

    return () => {
      supabase.removeChannel(messageChannel);
      supabase.removeChannel(presenceChannel);
    };
  }, [roomId, currentUser]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (msgText, imageUrl = null) => {
    if (!msgText.trim() && !imageUrl) return;
    
    const { error } = await supabase.from('messages').insert({
      room_id: roomId,
      uid: currentUser.id,
      display_name: myName,
      photo_url: myPhoto,
      text: msgText.trim(),
      image_url: imageUrl || null
    });

    if (error) {
      toast.error('Failed to send message');
      console.error(error);
    } else {
      setText('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(text);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random()}.${fileExt}`;
      const filePath = `${roomId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('chat-images')
        .getPublicUrl(filePath);

      await sendMessage('', data.publicUrl);
    } catch (err) {
      toast.error('Image upload failed');
      console.error(err);
    }
    setUploading(false);
    e.target.value = '';
  };

  const sendRideInvite = async () => {
    if (!rideForm.location.trim()) return;
    setInviteSending(true);

    const inviteText = `📍 GROUP RIDE INVITE\nLocation: ${rideForm.location}\nTime: ${rideForm.time}\nNote: ${rideForm.note}`;
    
    // Post as system-style message
    await supabase.from('messages').insert({
      room_id: roomId,
      uid: currentUser.id,
      display_name: myName,
      photo_url: myPhoto,
      text: inviteText
    });

    // Note: The schema requested didn't include `roomId` in meetup_points, but let's insert what fits the requested schema
    await supabase.from('meetup_points').insert({
      uid: currentUser.id,
      lat: 0, // Need geocoding in real app
      lng: 0,
      note: `Meet at ${rideForm.location}. Time: ${rideForm.time}. ${rideForm.note}`,
      scheduled_at: new Date().toISOString() // Placeholder date
    });

    setInviteSending(false);
    setRideModal(false);
    setRideForm({ location: '', time: '', note: '' });
  };

  const isOwn = (uid) => uid === currentUser?.id;

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .msg-bubble:hover .msg-time { opacity: 1 !important; }
        .emoji-btn:hover { transform: scale(1.3); }
        .input-area:focus { border-color: #FFD700 !important; outline: none; }
        .input-area::placeholder { color: #333; }
        .send-btn:hover { background: #FFE033 !important; }
        .attach-btn:hover { color: #FFD700 !important; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080808; }
        ::-webkit-scrollbar-thumb { background: #FFD70040; border-radius: 4px; }
      `}</style>
      <div style={styles.hexBg} />

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <Link to="/community/rooms" style={styles.backBtn}>←</Link>
          <div>
            <p style={styles.headerEyebrow}>// LIVE CHAT</p>
            <h1 style={styles.headerTitle}>{roomName}</h1>
          </div>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.onlinePill}>
            <span style={styles.onlineDot} />
            <span style={styles.onlineText}>{onlineCount} online</span>
          </div>
          <button onClick={() => setRideModal(true)} style={styles.rideBtn}>
            📍 Start Group Ride
          </button>
        </div>
      </div>
      <div style={styles.goldStripe} />

      {/* Messages */}
      <div style={styles.messageArea}>
        {messages.map((msg, i) => {
          const own = isOwn(msg.uid);
          const isRideInvite = msg.text?.includes('📍 GROUP RIDE INVITE');
          return (
            <div key={msg.id} className="msg-bubble" style={{ ...styles.msgRow, justifyContent: own ? 'flex-end' : 'flex-start', animationDelay: `${Math.min(i * 0.02, 0.5)}s` }}>
              {!own && (
                <div style={styles.msgAvatar}>
                  {msg.photo_url
                    ? <img src={msg.photo_url} alt="" style={styles.avatarImg} />
                    : <div style={styles.avatarInit}>{msg.display_name?.[0] || '?'}</div>}
                </div>
              )}
              <div style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column', alignItems: own ? 'flex-end' : 'flex-start', gap: '4px' }}>
                {!own && <span style={styles.senderName}>{msg.display_name}</span>}
                {isRideInvite ? (
                  <div style={styles.inviteCard}>
                    <span style={styles.inviteIcon}>📍</span>
                    <pre style={styles.inviteText}>{msg.text}</pre>
                  </div>
                ) : (
                  <>
                    {msg.text && (
                      <div style={own ? styles.bubbleOwn : styles.bubbleOther}>
                        <p style={styles.msgText}>{msg.text}</p>
                      </div>
                    )}
                    {msg.image_url && (
                      <img src={msg.image_url} alt="shared" style={styles.chatImage} />
                    )}
                  </>
                )}
                <span className="msg-time" style={{ ...styles.msgTime, opacity: 0, textAlign: own ? 'right' : 'left' }}>
                  {fmtTime(msg.created_at)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Picker */}
      {showEmoji && (
        <div style={styles.emojiPanel}>
          {EMOJI_LIST.map(em => (
            <button key={em} className="emoji-btn" onClick={() => { setText(t => t + em); setShowEmoji(false); }}
              style={styles.emojiItem}>{em}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={styles.inputRow}>
        <button className="attach-btn" onClick={() => fileInputRef.current?.click()} style={styles.iconBtn}>
          {uploading ? '⏳' : '📎'}
        </button>
        <button className="attach-btn" onClick={() => setShowEmoji(v => !v)} style={styles.iconBtn}>😊</button>
        <input type="file" ref={fileInputRef} accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
        <input
          className="input-area"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${roomName}...`}
          style={styles.textInput}
        />
        <button className="send-btn" onClick={() => sendMessage(text)} style={styles.sendBtn}>
          SEND
        </button>
      </div>

      {/* Ride Invite Modal */}
      {rideModal && (
        <div style={styles.backdrop} onClick={() => setRideModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span style={styles.eyebrow}>// GROUP RIDE INVITE</span>
              <button onClick={() => setRideModal(false)} style={styles.closeBtn}>✕</button>
            </div>
            <div style={styles.modalForm}>
              {[
                { label: '// MEETUP LOCATION', key: 'location', placeholder: 'e.g. Cubbon Park Gate, Bengaluru' },
                { label: '// DATE & TIME', key: 'time', placeholder: 'e.g. Saturday 6:00 AM' },
                { label: '// NOTE', key: 'note', placeholder: 'e.g. Bring tubes, 40km loop' },
              ].map(({ label, key, placeholder }) => (
                <div key={key} style={styles.modalField}>
                  <label style={styles.modalLabel}>{label}</label>
                  <input value={rideForm[key]} onChange={e => setRideForm(f => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder} style={styles.modalInput} />
                </div>
              ))}
              <button onClick={sendRideInvite} disabled={inviteSending} style={styles.inviteSubmit}>
                {inviteSending ? 'SENDING...' : 'SEND INVITE TO ROOM'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  root: { height: '100vh', display: 'flex', flexDirection: 'column', background: '#080808', fontFamily: '"DM Sans", sans-serif', position: 'relative', overflow: 'hidden' },
  hexBg: { position: 'fixed', inset: 0, backgroundImage: 'radial-gradient(circle at 1px 1px, #FFD70008 1px, transparent 0)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', background: '#0A0A0A', borderBottom: '1px solid #1A1A1A', position: 'relative', zIndex: 2, flexShrink: 0 },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
  backBtn: { fontFamily: '"DM Mono", monospace', fontSize: '18px', color: '#555', textDecoration: 'none', padding: '8px', border: '1px solid #1A1A1A', borderRadius: '6px', lineHeight: 1 },
  headerEyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#FFD700', letterSpacing: '0.2em', margin: 0 },
  headerTitle: { fontFamily: '"Bebas Neue", sans-serif', fontSize: '28px', color: '#E8E8E8', margin: 0, letterSpacing: '2px' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '12px' },
  onlinePill: { display: 'flex', alignItems: 'center', gap: '6px', background: '#0A1A0A', border: '1px solid #1A3A1A', borderRadius: '20px', padding: '6px 12px' },
  onlineDot: { width: '6px', height: '6px', borderRadius: '50%', background: '#22C55E' },
  onlineText: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#22C55E', letterSpacing: '0.1em' },
  rideBtn: { background: 'none', border: '1px solid #FFD70040', borderRadius: '6px', padding: '8px 14px', fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', cursor: 'pointer', letterSpacing: '0.1em' },
  goldStripe: { height: '1px', background: 'linear-gradient(90deg, #FFD700, #FFD70055, transparent)', flexShrink: 0, position: 'relative', zIndex: 2 },
  messageArea: { flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 },
  msgRow: { display: 'flex', alignItems: 'flex-end', gap: '10px', animation: 'slideUp 0.2s ease both' },
  msgAvatar: { flexShrink: 0 },
  avatarImg: { width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #FFD70030' },
  avatarInit: { width: '32px', height: '32px', borderRadius: '50%', background: '#111', border: '1px solid #FFD700', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px', color: '#FFD700' },
  senderName: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#555', letterSpacing: '0.1em' },
  bubbleOwn: { background: '#FFD700', borderRadius: '12px 12px 2px 12px', padding: '10px 16px', maxWidth: '100%', color: '#000' },
  bubbleOther: { background: '#131313', border: '1px solid #1F1F1F', borderRadius: '12px 12px 12px 2px', padding: '10px 16px', maxWidth: '100%', color: '#E8E8E8' },
  msgText: { fontFamily: '"DM Sans", sans-serif', fontSize: '14px', margin: 0, lineHeight: 1.5, wordBreak: 'break-word' },
  chatImage: { maxWidth: '240px', borderRadius: '8px', border: '1px solid #1A1A1A', cursor: 'pointer' },
  msgTime: { fontFamily: '"DM Mono", monospace', fontSize: '9px', color: '#333', letterSpacing: '0.1em', transition: 'opacity 0.2s' },
  inviteCard: { background: '#111', border: '1px solid #FFD70040', borderRadius: '8px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start', maxWidth: '300px' },
  inviteIcon: { fontSize: '20px', flexShrink: 0 },
  inviteText: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6 },
  emojiPanel: { position: 'absolute', bottom: '80px', left: '24px', background: '#111', border: '1px solid #1A1A1A', borderRadius: '8px', padding: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px', width: '240px', zIndex: 10 },
  emojiItem: { fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.1s', lineHeight: 1 },
  inputRow: { display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: '#0A0A0A', borderTop: '1px solid #1A1A1A', position: 'relative', zIndex: 2, flexShrink: 0 },
  iconBtn: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#444', padding: '8px', transition: 'color 0.2s', flexShrink: 0 },
  textInput: { flex: 1, background: '#111', border: '1px solid #1A1A1A', borderRadius: '8px', padding: '12px 16px', fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#E8E8E8', transition: 'border-color 0.2s' },
  sendBtn: { background: '#FFD700', color: '#000', border: 'none', borderRadius: '6px', padding: '12px 20px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '16px', letterSpacing: '2px', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0, clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)' },
  backdrop: { position: 'fixed', inset: 0, background: '#00000099', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backdropFilter: 'blur(8px)' },
  modal: { background: '#0C0C0C', border: '1px solid #1A1A1A', borderRadius: '12px', width: '100%', maxWidth: '480px', padding: '32px' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  eyebrow: { fontFamily: '"DM Mono", monospace', fontSize: '11px', color: '#FFD700', letterSpacing: '0.2em' },
  closeBtn: { background: 'none', border: 'none', color: '#555', fontSize: '18px', cursor: 'pointer' },
  modalForm: { display: 'flex', flexDirection: 'column', gap: '20px' },
  modalField: { display: 'flex', flexDirection: 'column', gap: '8px' },
  modalLabel: { fontFamily: '"DM Mono", monospace', fontSize: '10px', color: '#FFD700', letterSpacing: '0.2em' },
  modalInput: { background: '#080808', border: '1px solid #1A1A1A', borderRadius: '6px', padding: '12px 16px', fontFamily: '"DM Sans", sans-serif', fontSize: '14px', color: '#E8E8E8', width: '100%', boxSizing: 'border-box' },
  inviteSubmit: { background: '#FFD700', color: '#000', border: 'none', borderRadius: '6px', padding: '14px', fontFamily: '"Bebas Neue", sans-serif', fontSize: '18px', letterSpacing: '3px', cursor: 'pointer', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)' },
};

export default ChatRoom;
