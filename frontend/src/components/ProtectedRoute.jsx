// ── FILE: src/components/ProtectedRoute.jsx ──────────────────────────────────────────
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) {
    return (
      <div style={styles.screen}>
        <style>{`
          @keyframes spinRing {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes goldPulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
          }
        `}</style>
        <div style={styles.spinnerWrap}>
          <div style={styles.ring} />
          <div style={styles.innerDot} />
        </div>
        <p style={styles.label}>// AUTHENTICATING</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

const styles = {
  screen: {
    minHeight: '100vh',
    background: '#080808',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '24px',
  },
  spinnerWrap: {
    position: 'relative',
    width: '64px',
    height: '64px',
  },
  ring: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    border: '2px solid transparent',
    borderTopColor: '#FFD700',
    borderRightColor: '#FFD70055',
    animation: 'spinRing 0.8s linear infinite',
  },
  innerDot: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: '#FFD700',
    transform: 'translate(-50%, -50%)',
    animation: 'goldPulse 1s ease-in-out infinite',
  },
  label: {
    fontFamily: '"DM Mono", monospace',
    fontSize: '11px',
    color: '#FFD700',
    letterSpacing: '0.2em',
    opacity: 0.7,
  },
};

export default ProtectedRoute;
