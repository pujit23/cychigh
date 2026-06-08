import React from 'react';

const Footer = () => {
  return (
    <footer style={{
      background: '#020202',
      borderTop: '1px solid #141414',
      padding: '48px 32px 32px'
    }}>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '32px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>

        {/* LEFT — BRANDING */}
        <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '16px',
            color: '#FFD700',
            letterSpacing: '8px'
          }}>P 2 3</span>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '28px',
            color: '#F0F0F0',
            letterSpacing: '4px',
            lineHeight: 1
          }}>CYCHIGH</span>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '11px',
            color: '#333333',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>Know Your Ride</span>
        </div>

        {/* CENTER — LINKS */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {['Encyclopedia','Compare','Quiz',
            'Builder','Tools','Community'].map(link => (
            <span key={link} style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '11px',
              color: '#333333',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
            onMouseEnter={e => e.target.style.color='#FFD700'}
            onMouseLeave={e => e.target.style.color='#333333'}>
              {link}
            </span>
          ))}
        </div>

        {/* RIGHT — MADE BY */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          textAlign: 'right'
        }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '9px',
            color: '#222222',
            letterSpacing: '3px',
            textTransform: 'uppercase'
          }}>MADE BY</span>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '20px',
            color: '#444444',
            letterSpacing: '3px'
          }}>PUJIT BALANTHIRAN</span>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div style={{
        borderTop: '1px solid #0D0D0D',
        marginTop: '40px',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '40px auto 0'
      }}>
        <span style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '11px',
          color: '#222222'
        }}>© 2024 CycHigh. All rights reserved.</span>
        <span style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '14px',
          color: '#FFD700',
          letterSpacing: '6px'
        }}>P 2 3</span>
      </div>

    </footer>
  );
};

export default Footer;
