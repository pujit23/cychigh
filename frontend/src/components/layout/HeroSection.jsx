import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      background: '#080808',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '28px',
        color: '#333333',
        letterSpacing: '12px',
        lineHeight: 1,
      }}>KNOW</div>

      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '180px',
        color: '#1A1A1A',
        lineHeight: '0.82',
      }}>YOUR</div>

      <div style={{
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '220px',
        color: '#FFD700',
        lineHeight: '0.82',
        textShadow: '0 0 100px rgba(255,215,0,0.6), 0 0 200px rgba(255,215,0,0.2)',
      }}>RIDE</div>

      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '11px',
        color: '#444',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        marginTop: '24px',
        marginBottom: '40px',
      }}>
        THE ULTIMATE CYCLE KNOWLEDGE HUB
      </div>

      {/* BUTTONS */}
      <div style={{
        display: 'flex',
        gap: '16px',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: '1px solid #FFD700',
            color: '#FFD700',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '16px',
            letterSpacing: '4px',
            padding: '16px 32px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            minWidth: '220px',
          }}
          onMouseEnter={e => {
            e.target.style.background = '#FFD700'
            e.target.style.color = '#000'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.color = '#FFD700'
          }}
        >
          EXPLORE CYCLES
        </button>
        <button
          onClick={() => navigate('/quiz')}
          style={{
            background: '#DC2626',
            border: 'none',
            color: '#F0F0F0',
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '16px',
            letterSpacing: '4px',
            padding: '16px 32px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            minWidth: '220px',
          }}
          onMouseEnter={e => e.target.style.background = '#B91C1C'}
          onMouseLeave={e => e.target.style.background = '#DC2626'}
        >
          FIND MY MATCH →
        </button>
      </div>
    </div>
  )
}

export default HeroSection
