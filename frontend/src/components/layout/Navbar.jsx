import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { label: 'ENCYCLOPEDIA', path: '/' },
    { label: 'COMPARE', path: '/compare' },
    { label: 'QUIZ', path: '/quiz' },
    { label: 'BUILDER', path: '/builder' },
    { label: 'TOOLS', path: '/tools' },
    { label: 'COMMUNITY', path: '/community' },
  ]

  const isActive = (path) =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname.startsWith(path)

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      height: '56px',
      background: '#020202',
      borderBottom: '1px solid #141414',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      width: '100%',
    }}>

      {/* LEFT — BRANDING */}
      <Link to="/" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0px',
        textDecoration: 'none',
        flexShrink: 0,
      }}>
        {/* P23 LOGO */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          marginRight: '12px',
        }}>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '26px',
            color: '#FFD700',
            letterSpacing: '0px',
            lineHeight: 1,
            fontWeight: 'bold',
            textShadow: '0 0 20px rgba(255,215,0,0.4)',
          }}>
            P23
          </span>
        </div>

        {/* DIVIDER */}
        <div style={{
          width: '1px',
          height: '24px',
          background: '#222222',
          marginRight: '12px',
        }} />

        {/* CYCHIGH + TAGLINE */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '20px',
            color: '#F0F0F0',
            letterSpacing: '4px',
            lineHeight: 1,
          }}>
            CYCHIGH
          </span>
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '8px',
            color: '#333333',
            letterSpacing: '3px',
            lineHeight: 1,
            marginTop: '2px',
            textTransform: 'uppercase',
          }}>
            KNOW YOUR RIDE
          </span>
        </div>
      </Link>

      {/* CENTER — NAV LINKS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
        className="nav-center"
      >
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '10px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: isActive(link.path)
                ? '#FFD700' : '#444444',
              borderBottom: isActive(link.path)
                ? '1px solid #FFD700' : '1px solid transparent',
              paddingBottom: '2px',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={e => {
              if (!isActive(link.path))
                e.target.style.color = '#AAAAAA'
            }}
            onMouseLeave={e => {
              if (!isActive(link.path))
                e.target.style.color = '#444444'
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* RIGHT — ACTIONS */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        flexShrink: 0,
      }}>

        {/* SEARCH */}
        <button style={{
          background: 'none',
          border: 'none',
          color: '#444',
          cursor: 'pointer',
          fontSize: '16px',
          padding: '4px',
          transition: 'color 0.15s',
        }}
          onMouseEnter={e => e.target.style.color = '#FFD700'}
          onMouseLeave={e => e.target.style.color = '#444'}
          title="Search"
        >
          ⌕
        </button>

        {/* COMPARE */}
        <Link to="/compare" style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '10px',
          letterSpacing: '2px',
          color: '#444',
          textDecoration: 'none',
          textTransform: 'uppercase',
          transition: 'color 0.15s',
        }}
          onMouseEnter={e => e.target.style.color = '#FFD700'}
          onMouseLeave={e => e.target.style.color = '#444'}
        >
          COMPARE
        </Link>

        {/* LOGIN */}
        <Link to="/auth" style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '14px',
          letterSpacing: '3px',
          color: '#050505',
          background: '#FFD700',
          padding: '6px 16px',
          textDecoration: 'none',
          borderRadius: '2px',
          transition: 'background 0.15s',
        }}
          onMouseEnter={e =>
            e.target.style.background = '#FFE033'}
          onMouseLeave={e =>
            e.target.style.background = '#FFD700'}
        >
          LOGIN
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
