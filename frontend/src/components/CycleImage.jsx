import React, { useState } from 'react'

const CycleImage = ({ cycle }) => {
  const [imgError, setImgError] = useState(false)
  
  const getBrandColor = (brand) => {
    const colors = {
      'Trek': '#E8142B',
      'Giant': '#00559F', 
      'Specialized': '#E8102A',
      'Hero': '#FF6B00',
      'Hercules': '#2E7D32',
      'Firefox': '#FF4500',
      'Cannondale': '#00A651',
      'Scott': '#1565C0',
      'Merida': '#6A1B9A',
      'Marin': '#00796B',
      'Polygon': '#F57C00',
      'Btwin': '#0277BD',
    }
    return colors[brand] || '#FFD700'
  }

  if (imgError || !cycle.image) {
    return (
      <div style={{
        width: '100%',
        height: '200px',
        background: `linear-gradient(135deg, 
          #0C0C0C 0%, #111 100%)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: `2px solid ${getBrandColor(cycle.brand)}`,
      }}>
        {/* SVG bike silhouette */}
        <svg viewBox="0 0 200 120" width="160" height="96"
          style={{ opacity: 0.15 }}>
          <circle cx="55" cy="80" r="35"
            stroke="#FFD700" strokeWidth="4" fill="none"/>
          <circle cx="145" cy="80" r="35"
            stroke="#FFD700" strokeWidth="4" fill="none"/>
          <circle cx="55" cy="80" r="5" fill="#FFD700"/>
          <circle cx="145" cy="80" r="5" fill="#FFD700"/>
          <line x1="55" y1="80" x2="85" y2="40"
            stroke="#FFD700" strokeWidth="4"/>
          <line x1="85" y1="40" x2="100" y2="80"
            stroke="#FFD700" strokeWidth="3"/>
          <line x1="85" y1="40" x2="120" y2="45"
            stroke="#FFD700" strokeWidth="3"/>
          <line x1="55" y1="80" x2="100" y2="80"
            stroke="#FFD700" strokeWidth="3"/>
          <line x1="120" y1="45" x2="135" y2="80"
            stroke="#FFD700" strokeWidth="3"/>
          <line x1="100" y1="80" x2="135" y2="80"
            stroke="#FFD700" strokeWidth="2"/>
          <line x1="100" y1="40" x2="95" y2="25"
            stroke="#888" strokeWidth="3"/>
          <line x1="88" y1="23" x2="105" y2="23"
            stroke="#888" strokeWidth="4"
            strokeLinecap="round"/>
          <line x1="120" y1="45" x2="128" y2="32"
            stroke="#888" strokeWidth="3"/>
          <line x1="122" y1="30" x2="138" y2="34"
            stroke="#888" strokeWidth="3"
            strokeLinecap="round"/>
        </svg>
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '11px',
          color: getBrandColor(cycle.brand),
          letterSpacing: '3px',
          opacity: 0.7,
        }}>
          {cycle.brand?.toUpperCase()}
        </div>
        <div style={{
          position: 'absolute',
          top: '8px',
          right: '8px',
          fontFamily: 'DM Mono, monospace',
          fontSize: '8px',
          color: '#333',
          letterSpacing: '1px',
        }}>
          {cycle.category}
        </div>
      </div>
    )
  }

  return (
    <img
      src={cycle.image}
      alt={cycle.fullName}
      onError={() => setImgError(true)}
      style={{
        width: '100%',
        height: '200px',
        objectFit: 'cover',
      }}
    />
  )
}

export default CycleImage
