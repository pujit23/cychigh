// ── FILE: src/pages/Auth.jsx ──────────────────────────────────────────
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GOOGLE_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Auth = () => {
  const [tab, setTab] = useState('login'); // 'login' | 'register'
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, register, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handle = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    let result;
    if (tab === 'login') {
      result = await login(form.email, form.password);
    } else {
      if (!form.displayName.trim()) {
        setError('Rider alias is required.');
        setSubmitting(false);
        return;
      }
      result = await register(form.displayName, form.email, form.password);
    }
    setSubmitting(false);
    if (result.success) navigate('/community');
    else setError(result.error || 'Something went wrong.');
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    setError('');
    const result = await loginWithGoogle();
    setSubmitting(false);
    if (result.success) navigate('/community');
    else setError(result.error || 'Google sign-in failed.');
  };

  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes goldPulse { 0%,100% { box-shadow: 0 0 0 0 #FFD70040; } 50% { box-shadow: 0 0 0 8px transparent; } }
        .auth-input:focus { border-color: #FFD700 !important; outline: none; }
        .auth-input::placeholder { color: #333; }
        .auth-tab-active { color: #FFD700 !important; border-bottom-color: #FFD700 !important; }
        .auth-tab:hover { color: #888; }
        .auth-google:hover { border-color: #FFD70088 !important; background: #111 !important; }
        .auth-submit:hover:not(:disabled) { background: #FFE033 !important; }
        .auth-switch:hover { color: #FFD700 !important; }
      `}</style>

      {/* Hex background */}
      <div style={styles.hexBg} />

      <div style={styles.card}>
        {/* Logo */}
        <div style={styles.logoWrap}>
          <span style={styles.logoTag}>// CYCHIGH</span>
          <h1 style={styles.logoTitle}>
            {tab === 'login' ? 'WELCOME BACK' : 'JOIN THE HIVE'}
          </h1>
          <p style={styles.logoSub}>
            {tab === 'login' ? 'Sign in to your rider account' : 'Create your rider profile'}
          </p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {['login', 'register'].map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); }}
              className={`auth-tab ${tab === t ? 'auth-tab-active' : ''}`}
              style={{ ...styles.tab, ...(tab === t ? styles.tabActive : {}) }}
            >
              {t === 'login' ? 'LOGIN' : 'REGISTER'}
            </button>
          ))}
        </div>

        {/* Google */}
        <button
          onClick={handleGoogle}
          disabled={submitting}
          className="auth-google"
          style={styles.googleBtn}
        >
          {GOOGLE_ICON}
          <span style={styles.googleText}>Continue with Google</span>
        </button>

        {/* Divider */}
        <div style={styles.divider}>
          <div style={styles.dividerLine} />
          <span style={styles.dividerText}>or</span>
          <div style={styles.dividerLine} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {tab === 'register' && (
            <div style={styles.field}>
              <label style={styles.label}>// RIDER ALIAS</label>
              <input
                type="text"
                value={form.displayName}
                onChange={handle('displayName')}
                placeholder="e.g. TrailBlazer99"
                className="auth-input"
                style={styles.input}
                autoComplete="username"
              />
            </div>
          )}
          <div style={styles.field}>
            <label style={styles.label}>// EMAIL ADDRESS</label>
            <input
              type="email"
              value={form.email}
              onChange={handle('email')}
              placeholder="rider@example.com"
              className="auth-input"
              style={styles.input}
              required
              autoComplete="email"
            />
          </div>
          <div style={styles.field}>
            <div style={styles.labelRow}>
              <label style={styles.label}>// PASSWORD</label>
              {tab === 'login' && (
                <span style={styles.forgot}>Forgot?</span>
              )}
            </div>
            <input
              type="password"
              value={form.password}
              onChange={handle('password')}
              placeholder="••••••••"
              className="auth-input"
              style={styles.input}
              required
              autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
            />
          </div>

          {/* Inline error */}
          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorDot}>●</span>
              <span style={styles.errorText}>{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="auth-submit"
            style={styles.submit}
          >
            {submitting ? '...' : tab === 'login' ? 'ENTER HIVE' : 'CREATE ACCOUNT'}
          </button>
        </form>

        {/* Switch */}
        <div style={styles.switchRow}>
          <span style={styles.switchText}>
            {tab === 'login' ? "Don't have an account? " : 'Already a rider? '}
          </span>
          <button
            onClick={() => { setTab(tab === 'login' ? 'register' : 'login'); setError(''); }}
            className="auth-switch"
            style={styles.switchBtn}
          >
            {tab === 'login' ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    minHeight: '100vh',
    background: '#080808',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    position: 'relative',
    fontFamily: '"DM Sans", sans-serif',
  },
  hexBg: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'radial-gradient(circle at 1px 1px, #FFD70008 1px, transparent 0)',
    backgroundSize: '40px 40px',
    pointerEvents: 'none',
  },
  card: {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    maxWidth: '440px',
    background: '#0C0C0C',
    border: '1px solid #1A1A1A',
    borderRadius: '8px',
    padding: '48px 40px',
    animation: 'fadeUp 0.4s ease both',
  },
  logoWrap: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoTag: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '11px',
    color: '#FFD700',
    letterSpacing: '0.2em',
    display: 'block',
    marginBottom: '12px',
  },
  logoTitle: {
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: '48px',
    color: '#E8E8E8',
    letterSpacing: '4px',
    lineHeight: 1,
    margin: 0,
  },
  logoSub: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '12px',
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginTop: '8px',
  },
  tabs: {
    display: 'flex',
    borderBottom: '1px solid #1A1A1A',
    marginBottom: '28px',
  },
  tab: {
    flex: 1,
    padding: '12px 0',
    fontFamily: '"DM Mono", monospace',
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: '#444',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  tabActive: {
    color: '#FFD700',
    borderBottomColor: '#FFD700',
  },
  googleBtn: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    background: '#0A0A0A',
    border: '1px solid #222',
    borderRadius: '6px',
    padding: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    marginBottom: '24px',
  },
  googleText: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: '#AAAAAA',
    fontWeight: 500,
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '24px',
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    background: '#1A1A1A',
  },
  dividerText: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '10px',
    color: '#333',
    letterSpacing: '0.1em',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '10px',
    color: '#FFD700',
    letterSpacing: '0.2em',
  },
  labelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgot: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '11px',
    color: '#555',
    cursor: 'pointer',
  },
  input: {
    background: '#080808',
    border: '1px solid #1F1F1F',
    borderRadius: '6px',
    padding: '14px 16px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '14px',
    color: '#E8E8E8',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box',
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#1A0505',
    border: '1px solid #EF444430',
    borderRadius: '6px',
    padding: '12px 14px',
  },
  errorDot: {
    color: '#EF4444',
    fontSize: '8px',
    flexShrink: 0,
  },
  errorText: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '13px',
    color: '#EF4444',
  },
  submit: {
    background: '#FFD700',
    color: '#000',
    border: 'none',
    borderRadius: '6px',
    padding: '16px',
    fontFamily: '"Bebas Neue", sans-serif',
    fontSize: '20px',
    letterSpacing: '4px',
    cursor: 'pointer',
    transition: 'background 0.2s',
    marginTop: '8px',
    clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
  },
  switchRow: {
    marginTop: '24px',
    textAlign: 'center',
  },
  switchText: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '13px',
    color: '#444',
  },
  switchBtn: {
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '13px',
    color: '#888',
    fontWeight: 600,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s',
    textDecoration: 'underline',
    textDecorationColor: '#333',
  },
};

export default Auth;
