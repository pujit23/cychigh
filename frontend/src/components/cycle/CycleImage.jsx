import { useState } from 'react'
import { CYCLE_IMAGES, CATEGORY_BIKE_IMAGES } from '../../utils/constants'

const CATEGORY_GRADIENTS = {
  'MTB': 'linear-gradient(135deg, #0a0a0a, #1a1200)',
  'Road': 'linear-gradient(135deg, #0a0a0a, #00101a)',
  'Hybrid': 'linear-gradient(135deg, #0a0a0a, #0a1a00)',
  'Gravel': 'linear-gradient(135deg, #0a0a0a, #1a0a00)',
  'City': 'linear-gradient(135deg, #0a0a0a, #1a001a)',
  'Electric': 'linear-gradient(135deg, #0a0a0a, #001a1a)',
}

const BRAND_COLORS = {
  'Trek': '#E8142B',
  'Giant': '#00559F',
  'Specialized': '#E8102A',
  'Hero': '#FF6B00',
  'Hercules': '#2E7D32',
  'Firefox': '#FF4500',
  'Montra': '#9C27B0',
  'Cannondale': '#00A651',
  'Scott': '#1565C0',
  'Merida': '#6A1B9A',
  'Marin': '#00796B',
  'Polygon': '#F57C00',
  'Btwin': '#0277BD',
  'Cradiac': '#C62828',
  'Leader': '#37474F',
  'Java': '#558B2F',
  'OMO': '#00838F',
  'Kross': '#4527A0',
}

const getImageUrl = (cycle) => {
  // Try official image first
  const officialUrl = CYCLE_IMAGES[cycle?.id]
  if (officialUrl) return officialUrl
  
  // Fallback to category image
  const categoryImages = CATEGORY_BIKE_IMAGES[
    cycle?.category
  ] || CATEGORY_BIKE_IMAGES['MTB']
  const index = (cycle?.id?.length || 0) 
    % categoryImages.length
  return categoryImages[index]
}

const BikeSilhouette = ({ brand, category }) => {
  const color = BRAND_COLORS[brand] || '#FFD700'
  const isRoad = category === 'Road'
  const isMTB = category === 'MTB'

  return (
    <svg viewBox="0 0 300 180"
      width="260" height="156"
      style={{ opacity: 0.25 }}>

      {/* REAR WHEEL */}
      <circle cx="80" cy="120" r="52"
        stroke={color} strokeWidth="5"
        fill="none"/>
      <circle cx="80" cy="120" r="42"
        stroke={color} strokeWidth="1"
        fill="none" opacity="0.4"/>
      {[0,45,90,135].map((a,i) => (
        <line key={i}
          x1={80+Math.cos(a*Math.PI/180)*10}
          y1={120+Math.sin(a*Math.PI/180)*10}
          x2={80+Math.cos(a*Math.PI/180)*50}
          y2={120+Math.sin(a*Math.PI/180)*50}
          stroke={color} strokeWidth="1.5"
          opacity="0.5"/>
      ))}
      <circle cx="80" cy="120" r="7"
        fill={color} opacity="0.8"/>

      {/* FRONT WHEEL */}
      <circle cx="220" cy="120" r="52"
        stroke={color} strokeWidth="5"
        fill="none"/>
      <circle cx="220" cy="120" r="42"
        stroke={color} strokeWidth="1"
        fill="none" opacity="0.4"/>
      {[0,45,90,135].map((a,i) => (
        <line key={i}
          x1={220+Math.cos(a*Math.PI/180)*10}
          y1={120+Math.sin(a*Math.PI/180)*10}
          x2={220+Math.cos(a*Math.PI/180)*50}
          y2={120+Math.sin(a*Math.PI/180)*50}
          stroke={color} strokeWidth="1.5"
          opacity="0.5"/>
      ))}
      <circle cx="220" cy="120" r="7"
        fill={color} opacity="0.8"/>

      {/* FRAME */}
      <line x1="148" y1="65" x2="80" y2="120"
        stroke={color} strokeWidth="5"
        strokeLinecap="round"/>
      <line x1="148" y1="65" x2="160" y2="120"
        stroke={color} strokeWidth="4"
        strokeLinecap="round"/>
      <line x1="148" y1="65" x2="195" y2="72"
        stroke={color} strokeWidth="4"
        strokeLinecap="round"/>
      <line x1="80" y1="120" x2="160" y2="120"
        stroke={color} strokeWidth="4"
        strokeLinecap="round"/>
      <line x1="80" y1="120" x2="160" y2="90"
        stroke={color} strokeWidth="3"
        strokeLinecap="round" opacity="0.7"/>
      <line x1="160" y1="90" x2="160" y2="120"
        stroke={color} strokeWidth="3"
        strokeLinecap="round" opacity="0.7"/>

      {/* FORK */}
      <line x1="195" y1="72" x2="210" y2="120"
        stroke={color} strokeWidth="4"
        strokeLinecap="round"/>
      <line x1="210" y1="120" x2="220" y2="120"
        stroke={color} strokeWidth="3"
        strokeLinecap="round"/>

      {/* HEAD TUBE */}
      <rect x="188" y="62" width="12" height="26"
        rx="4" fill={color} opacity="0.8"/>

      {/* BOTTOM BRACKET */}
      <circle cx="160" cy="120" r="10"
        fill={color} opacity="0.8"/>
      <circle cx="160" cy="120" r="5"
        fill="#000"/>

      {/* CHAINRING */}
      <circle cx="160" cy="120" r="22"
        stroke={color} strokeWidth="2.5"
        fill="none" opacity="0.5"/>

      {/* CRANK */}
      <line x1="160" y1="120" x2="178" y2="136"
        stroke={color} strokeWidth="4"
        strokeLinecap="round"/>

      {/* SEAT POST */}
      <line x1="152" y1="68" x2="146" y2="38"
        stroke="#888" strokeWidth="4"
        strokeLinecap="round"/>

      {/* SADDLE */}
      {isRoad ? (
        <path d="M 128 34 Q 146 28 164 34"
          stroke="#CCC" strokeWidth="5"
          strokeLinecap="round" fill="none"/>
      ) : (
        <path d="M 130 35 Q 146 30 162 35"
          stroke="#CCC" strokeWidth="6"
          strokeLinecap="round" fill="none"/>
      )}

      {/* HANDLEBAR */}
      <line x1="195" y1="70" x2="205" y2="50"
        stroke="#888" strokeWidth="4"
        strokeLinecap="round"/>
      {isRoad ? (
        <path d="M 198 48 Q 210 42 218 50 Q 223 56 220 64"
          stroke="#CCC" strokeWidth="4"
          strokeLinecap="round" fill="none"/>
      ) : (
        <line x1="195" y1="46"
          x2="225" y2="46"
          stroke="#CCC" strokeWidth="5"
          strokeLinecap="round"/>
      )}

      {/* MTB FORK SUSPENSION */}
      {isMTB && (
        <>
          <rect x="202" y="75" width="6" height="30"
            rx="2" fill={color} opacity="0.3"/>
          <rect x="212" y="75" width="6" height="30"
            rx="2" fill={color} opacity="0.3"/>
        </>
      )}
    </svg>
  )
}

const CycleImage = ({ cycle, height = 200 }) => {
  const [imgSrc, setImgSrc] = useState(getImageUrl(cycle))
  const [useFallback, setUseFallback] = useState(false)
  const brandColor = BRAND_COLORS[cycle?.brand] || '#FFD700'
  const gradient = CATEGORY_GRADIENTS[cycle?.category]
    || 'linear-gradient(135deg, #0a0a0a, #1a1400)'

  const handleImageError = () => {
    const categoryImages = CATEGORY_BIKE_IMAGES[
      cycle?.category
    ] || CATEGORY_BIKE_IMAGES['MTB']
    const fallbackUrl = categoryImages[0]
    
    if (imgSrc !== fallbackUrl) {
      setImgSrc(fallbackUrl)
    } else {
      setUseFallback(true)
    }
  }

  if (useFallback) {
    return (
      <div style={{
        width: '100%',
        height: `${height}px`,
        background: gradient,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: `2px solid ${brandColor}40`,
      }}>
        {/* Grid background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(${brandColor}08 1px, transparent 1px),
            linear-gradient(90deg, ${brandColor}08 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}/>

        {/* Bike silhouette */}
        <BikeSilhouette
          brand={cycle?.brand}
          category={cycle?.category}/>

        {/* Brand label */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: '12px',
          color: brandColor,
          letterSpacing: '3px',
          opacity: 0.6,
        }}>
          {cycle?.brand?.toUpperCase()}
        </div>

        {/* Category badge */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          fontFamily: 'DM Mono, monospace',
          fontSize: '8px',
          color: brandColor,
          letterSpacing: '2px',
          border: `1px solid ${brandColor}40`,
          padding: '3px 8px',
          opacity: 0.6,
        }}>
          {cycle?.category?.toUpperCase()}
        </div>

        {/* Corner markers */}
        <div style={{
          position: 'absolute',
          top: '6px',
          left: '6px',
          width: '12px',
          height: '12px',
          borderTop: `1px solid ${brandColor}40`,
          borderLeft: `1px solid ${brandColor}40`,
        }}/>
        <div style={{
          position: 'absolute',
          bottom: '6px',
          right: '6px',
          width: '12px',
          height: '12px',
          borderBottom: `1px solid ${brandColor}40`,
          borderRight: `1px solid ${brandColor}40`,
        }}/>
      </div>
    )
  }

  return (
    <div style={{
      width: '100%',
      height: `${height}px`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <img
        src={imgSrc}
        alt={cycle?.fullName || cycle?.name}
        onError={handleImageError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={e =>
          e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={e =>
          e.target.style.transform = 'scale(1)'}
      />
      {/* Overlay gradient */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '60px',
        background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
        pointerEvents: 'none',
      }}/>
      {/* Brand tag */}
      <div style={{
        position: 'absolute',
        top: '8px',
        left: '8px',
        background: 'rgba(0,0,0,0.7)',
        border: `1px solid ${brandColor}60`,
        padding: '3px 8px',
        fontFamily: 'Bebas Neue, sans-serif',
        fontSize: '11px',
        color: brandColor,
        letterSpacing: '2px',
      }}>
        {cycle?.brand?.toUpperCase()}
      </div>
    </div>
  )
}

export default CycleImage
