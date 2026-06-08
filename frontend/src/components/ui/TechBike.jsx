import React from 'react';

const TechBike = () => {
  return (
    <div style={{
      position: 'relative',
      width: '580px',
      height: '480px',
    }}>

      {/* OUTER RING HUD */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '460px',
        height: '460px',
        borderRadius: '50%',
        border: '1px solid rgba(255,215,0,0.08)',
        animation: 'slowRotate 20s linear infinite',
      }}>
        {/* tick marks around ring */}
        {[...Array(36)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: i % 9 === 0 ? '16px' : i % 3 === 0 ? '10px' : '5px',
            height: '1px',
            background: i % 9 === 0
              ? 'rgba(255,215,0,0.5)'
              : i % 3 === 0
              ? 'rgba(255,215,0,0.25)'
              : 'rgba(255,215,0,0.1)',
            transformOrigin: '0 50%',
            transform: `rotate(${i * 10}deg) translateX(228px)`,
          }}/>
        ))}
      </div>

      {/* INNER RING */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        border: '1px solid rgba(255,215,0,0.05)',
        animation: 'slowRotateReverse 15s linear infinite',
      }}/>

      {/* CROSSHAIR LINES */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.15), transparent)',
      }}/>
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '10%',
        bottom: '10%',
        width: '1px',
        background: 'linear-gradient(180deg, transparent, rgba(255,215,0,0.15), transparent)',
      }}/>

      {/* MAIN SVG BIKE */}
      <svg
        viewBox="0 0 580 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          filter: 'drop-shadow(0 0 20px rgba(255,215,0,0.3))',
          animation: 'bikeFloat 4s ease-in-out infinite',
        }}
      >
        <defs>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="tubeGold"
            x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE566"/>
            <stop offset="50%" stopColor="#FFD700"/>
            <stop offset="100%" stopColor="#886A00"/>
          </linearGradient>
          <linearGradient id="tubeSilver"
            x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#888888"/>
            <stop offset="100%" stopColor="#333333"/>
          </linearGradient>
          <radialGradient id="hubGlow"
            cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700"
              stopOpacity="1"/>
            <stop offset="60%" stopColor="#FFD700"
              stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#FFD700"
              stopOpacity="0"/>
          </radialGradient>
          <pattern id="microGrid"
            width="15" height="15"
            patternUnits="userSpaceOnUse">
            <path d="M 15 0 L 0 0 0 15"
              fill="none"
              stroke="rgba(255,215,0,0.03)"
              strokeWidth="0.5"/>
          </pattern>
        </defs>

        {/* MICRO GRID */}
        <rect width="580" height="480"
          fill="url(#microGrid)"/>

        {/* ═══ REAR WHEEL ═══ */}
        {/* Outer glow ring */}
        <circle cx="158" cy="300" r="125"
          stroke="rgba(255,215,0,0.06)"
          strokeWidth="20" fill="none"/>
        {/* Tire */}
        <circle cx="158" cy="300" r="118"
          stroke="#1a1a1a" strokeWidth="14"
          fill="none"/>
        {/* Tire surface */}
        <circle cx="158" cy="300" r="118"
          stroke="#252525" strokeWidth="10"
          fill="none"
          strokeDasharray="2 4"/>
        {/* Rim outer */}
        <circle cx="158" cy="300" r="104"
          stroke="#2d2d2d" strokeWidth="3"
          fill="none"/>
        {/* Rim inner */}
        <circle cx="158" cy="300" r="98"
          stroke="rgba(255,215,0,0.2)"
          strokeWidth="1" fill="none"/>
        {/* Rim bed */}
        <circle cx="158" cy="300" r="101"
          stroke="rgba(255,215,0,0.08)"
          strokeWidth="5" fill="none"/>
        {/* 16 spokes with crossing pattern */}
        {[...Array(16)].map((_, i) => {
          const a = (i * 22.5 - 90) * Math.PI / 180
          const isMain = i % 2 === 0
          return (
            <line key={i}
              x1={158 + Math.cos(a) * 18}
              y1={300 + Math.sin(a) * 18}
              x2={158 + Math.cos(a) * 100}
              y2={300 + Math.sin(a) * 100}
              stroke={isMain
                ? 'rgba(255,215,0,0.4)'
                : 'rgba(255,215,0,0.15)'}
              strokeWidth={isMain ? 1.5 : 1}
            />
          )
        })}
        {/* Spoke nipples */}
        {[...Array(16)].map((_, i) => {
          const a = (i * 22.5 - 90) * Math.PI / 180
          return (
            <circle key={i}
              cx={158 + Math.cos(a) * 100}
              cy={300 + Math.sin(a) * 100}
              r="2"
              fill="rgba(255,215,0,0.3)"/>
          )
        })}
        {/* Hub glow */}
        <circle cx="158" cy="300" r="24"
          fill="url(#hubGlow)" opacity="0.4"/>
        {/* Hub shell */}
        <circle cx="158" cy="300" r="18"
          fill="#111" stroke="#FFD700"
          strokeWidth="2"
          filter="url(#neonGlow)"/>
        <circle cx="158" cy="300" r="12"
          fill="#1a1a1a"
          stroke="rgba(255,215,0,0.4)"
          strokeWidth="1"/>
        {/* Hub axle */}
        <circle cx="158" cy="300" r="6"
          fill="#FFD700"
          filter="url(#neonGlow)"/>
        <circle cx="158" cy="300" r="3"
          fill="#000"/>
        {/* Tire highlight */}
        <path d="M 158 182 A 118 118 0 0 1 272 352"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="6" fill="none"
          strokeLinecap="round"/>

        {/* ═══ FRONT WHEEL ═══ */}
        <circle cx="438" cy="300" r="125"
          stroke="rgba(255,215,0,0.06)"
          strokeWidth="20" fill="none"/>
        <circle cx="438" cy="300" r="118"
          stroke="#1a1a1a" strokeWidth="14"
          fill="none"/>
        <circle cx="438" cy="300" r="118"
          stroke="#252525" strokeWidth="10"
          fill="none" strokeDasharray="2 4"/>
        <circle cx="438" cy="300" r="104"
          stroke="#2d2d2d" strokeWidth="3"
          fill="none"/>
        <circle cx="438" cy="300" r="98"
          stroke="rgba(255,215,0,0.2)"
          strokeWidth="1" fill="none"/>
        <circle cx="438" cy="300" r="101"
          stroke="rgba(255,215,0,0.08)"
          strokeWidth="5" fill="none"/>
        {[...Array(16)].map((_, i) => {
          const a = (i * 22.5 - 90) * Math.PI / 180
          const isMain = i % 2 === 0
          return (
            <line key={i}
              x1={438 + Math.cos(a) * 18}
              y1={300 + Math.sin(a) * 18}
              x2={438 + Math.cos(a) * 100}
              y2={300 + Math.sin(a) * 100}
              stroke={isMain
                ? 'rgba(255,215,0,0.4)'
                : 'rgba(255,215,0,0.15)'}
              strokeWidth={isMain ? 1.5 : 1}
            />
          )
        })}
        {[...Array(16)].map((_, i) => {
          const a = (i * 22.5 - 90) * Math.PI / 180
          return (
            <circle key={i}
              cx={438 + Math.cos(a) * 100}
              cy={300 + Math.sin(a) * 100}
              r="2"
              fill="rgba(255,215,0,0.3)"/>
          )
        })}
        <circle cx="438" cy="300" r="24"
          fill="url(#hubGlow)" opacity="0.4"/>
        <circle cx="438" cy="300" r="18"
          fill="#111" stroke="#FFD700"
          strokeWidth="2"
          filter="url(#neonGlow)"/>
        <circle cx="438" cy="300" r="12"
          fill="#1a1a1a"
          stroke="rgba(255,215,0,0.4)"
          strokeWidth="1"/>
        <circle cx="438" cy="300" r="6"
          fill="#FFD700"
          filter="url(#neonGlow)"/>
        <circle cx="438" cy="300" r="3"
          fill="#000"/>
        <path d="M 438 182 A 118 118 0 0 1 552 352"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="6" fill="none"
          strokeLinecap="round"/>

        {/* ═══ FRAME ═══ */}
        {/* Shadow/depth tubes */}
        <line x1="253" y1="140" x2="158" y2="300"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="14" strokeLinecap="round"/>
        <line x1="253" y1="140" x2="268" y2="300"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="12" strokeLinecap="round"/>
        <line x1="253" y1="140" x2="368" y2="155"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth="10" strokeLinecap="round"/>

        {/* DOWN TUBE */}
        <line x1="253" y1="140" x2="158" y2="300"
          stroke="url(#tubeGold)" strokeWidth="10"
          strokeLinecap="round"
          filter="url(#softGlow)"/>
        {/* Down tube edge highlight */}
        <line x1="255" y1="138" x2="161" y2="296"
          stroke="rgba(255,255,200,0.15)"
          strokeWidth="2" strokeLinecap="round"/>

        {/* SEAT TUBE */}
        <line x1="253" y1="140" x2="268" y2="300"
          stroke="url(#tubeGold)" strokeWidth="9"
          strokeLinecap="round"
          filter="url(#softGlow)"/>

        {/* TOP TUBE - slightly sloped */}
        <line x1="255" y1="142" x2="368" y2="158"
          stroke="url(#tubeGold)" strokeWidth="8"
          strokeLinecap="round"
          filter="url(#softGlow)"/>
        <line x1="256" y1="140" x2="369" y2="156"
          stroke="rgba(255,255,200,0.12)"
          strokeWidth="2" strokeLinecap="round"/>

        {/* CHAIN STAY */}
        <line x1="158" y1="300" x2="268" y2="300"
          stroke="url(#tubeGold)" strokeWidth="7"
          strokeLinecap="round"/>

        {/* SEAT STAYS */}
        <line x1="158" y1="300" x2="268" y2="230"
          stroke="#CCAC00" strokeWidth="5"
          strokeLinecap="round"
          filter="url(#softGlow)"/>
        <line x1="268" y1="230" x2="268" y2="300"
          stroke="#CCAC00" strokeWidth="6"
          strokeLinecap="round"/>

        {/* ═══ FORK ═══ */}
        <line x1="253" y1="140" x2="158" y2="300"
          stroke="rgba(0,0,0,0)" strokeWidth="0"/>
        {/* Fork blades */}
        <line x1="370" y1="158" x2="406" y2="300"
          stroke="url(#tubeGold)" strokeWidth="7"
          strokeLinecap="round"
          filter="url(#softGlow)"/>
        <line x1="372" y1="157" x2="408" y2="298"
          stroke="rgba(255,255,200,0.1)"
          strokeWidth="2" strokeLinecap="round"/>
        <line x1="406" y1="300" x2="438" y2="300"
          stroke="url(#tubeGold)" strokeWidth="6"
          strokeLinecap="round"/>

        {/* ═══ HEAD TUBE ═══ */}
        <rect x="356" y="136" width="26" height="52"
          rx="8" fill="#1a1a1a"
          stroke="#FFD700" strokeWidth="2"
          filter="url(#neonGlow)"/>
        <rect x="360" y="140" width="18" height="44"
          rx="6"
          fill="rgba(255,215,0,0.08)"/>
        <line x1="369" y1="140" x2="369" y2="184"
          stroke="rgba(255,215,0,0.2)"
          strokeWidth="1"/>

        {/* ═══ BOTTOM BRACKET ═══ */}
        <circle cx="268" cy="300" r="22"
          fill="url(#hubGlow)" opacity="0.5"/>
        <circle cx="268" cy="300" r="16"
          fill="#111" stroke="#FFD700"
          strokeWidth="2.5"
          filter="url(#neonGlow)"/>
        <circle cx="268" cy="300" r="9"
          fill="#FFD700"
          filter="url(#neonGlow)"/>
        <circle cx="268" cy="300" r="5"
          fill="#020202"/>

        {/* ═══ CHAINRING ═══ */}
        {/* Outer chainring */}
        <circle cx="268" cy="300" r="42"
          stroke="#2a2a2a" strokeWidth="5"
          fill="none"/>
        {/* Chainring teeth effect */}
        <circle cx="268" cy="300" r="44"
          stroke="rgba(255,215,0,0.2)"
          strokeWidth="1.5" fill="none"
          strokeDasharray="3 2.5"/>
        {/* Inner ring */}
        <circle cx="268" cy="300" r="36"
          stroke="rgba(255,215,0,0.35)"
          strokeWidth="1" fill="none"
          strokeDasharray="8 4"/>
        <circle cx="268" cy="300" r="28"
          stroke="rgba(255,215,0,0.15)"
          strokeWidth="1" fill="none"/>
        {/* Chainring arms - 5 arm spider */}
        {[0, 72, 144, 216, 288].map((deg, i) => {
          const rad = deg * Math.PI / 180
          return (
            <line key={i}
              x1={268 + Math.cos(rad) * 9}
              y1={300 + Math.sin(rad) * 9}
              x2={268 + Math.cos(rad) * 36}
              y2={300 + Math.sin(rad) * 36}
              stroke="rgba(255,215,0,0.4)"
              strokeWidth="3"
              strokeLinecap="round"/>
          )
        })}
        {/* Chainring bolts */}
        {[36, 108, 180, 252, 324].map((deg, i) => {
          const rad = deg * Math.PI / 180
          return (
            <circle key={i}
              cx={268 + Math.cos(rad) * 32}
              cy={300 + Math.sin(rad) * 32}
              r="3.5"
              fill="#111"
              stroke="rgba(255,215,0,0.5)"
              strokeWidth="1.5"/>
          )
        })}

        {/* ═══ REAR SPROCKET ═══ */}
        <circle cx="158" cy="300" r="26"
          stroke="#333" strokeWidth="4"
          fill="#0d0d0d"/>
        <circle cx="158" cy="300" r="22"
          stroke="rgba(255,215,0,0.3)"
          strokeWidth="1.5" fill="none"
          strokeDasharray="4 2"/>

        {/* ═══ CHAIN ═══ */}
        {/* Top chain run */}
        <line x1="158" y1="278"
          x2="268" y2="260"
          stroke="#3a3a3a" strokeWidth="3"
          strokeDasharray="5 2.5"/>
        {/* Bottom chain run */}
        <line x1="158" y1="322"
          x2="268" y2="340"
          stroke="#3a3a3a" strokeWidth="3"
          strokeDasharray="5 2.5"/>
        {/* Rear wrap */}
        <path d="M 158 278 A 22 22 0 0 0 158 322"
          stroke="#3a3a3a" strokeWidth="3"
          strokeDasharray="5 2.5" fill="none"/>
        {/* Front wrap */}
        <path d="M 268 260 A 40 40 0 0 1 268 340"
          stroke="#3a3a3a" strokeWidth="3"
          strokeDasharray="5 2.5" fill="none"/>

        {/* ═══ CRANK ARM ═══ */}
        <line x1="268" y1="300" x2="308" y2="332"
          stroke="#FFD700" strokeWidth="7"
          strokeLinecap="round"
          filter="url(#neonGlow)"/>
        <circle cx="268" cy="300" r="6"
          fill="#FFD700"/>
        {/* Pedal body */}
        <rect x="304" y="329" width="26" height="9"
          rx="3" fill="#555"
          stroke="rgba(255,215,0,0.3)"
          strokeWidth="1"/>
        {/* Pedal pins */}
        {[310, 316, 322].map((x, i) => (
          <line key={i}
            x1={x} y1="329"
            x2={x} y2="338"
            stroke="#777" strokeWidth="1.5"/>
        ))}

        {/* ═══ SEAT POST ═══ */}
        <line x1="261" y1="148" x2="254" y2="96"
          stroke="url(#tubeSilver)"
          strokeWidth="7" strokeLinecap="round"/>
        {/* Seat clamp */}
        <rect x="255" y="144" width="16" height="8"
          rx="2" fill="#333"
          stroke="rgba(255,215,0,0.3)"
          strokeWidth="1"/>
        {/* SADDLE */}
        <path
          d="M 224 91 C 234 82 254 80 268 82
             C 282 80 294 84 298 91"
          stroke="#CCCCCC" strokeWidth="5"
          strokeLinecap="round" fill="none"
          filter="url(#softGlow)"/>
        {/* Saddle underside */}
        <path
          d="M 228 91 C 238 96 264 97 295 91"
          stroke="#666" strokeWidth="2"
          fill="none"/>
        {/* Saddle rails */}
        <line x1="238" y1="90"
          x2="234" y2="98"
          stroke="#555" strokeWidth="1.5"/>
        <line x1="288" y1="90"
          x2="292" y2="98"
          stroke="#555" strokeWidth="1.5"/>

        {/* ═══ STEM + HANDLEBAR ═══ */}
        {/* Stem */}
        <line x1="369" y1="154" x2="396" y2="116"
          stroke="url(#tubeSilver)"
          strokeWidth="7" strokeLinecap="round"/>
        {/* Stem clamp */}
        <rect x="390" y="112" width="14" height="12"
          rx="3" fill="#333"
          stroke="rgba(255,215,0,0.3)"
          strokeWidth="1"/>
        {/* DROP HANDLEBAR */}
        <path
          d="M 374 110 Q 404 98 424 112
             Q 438 122 432 140
             Q 428 152 418 150
             L 415 144"
          stroke="#CCCCCC" strokeWidth="6"
          strokeLinecap="round" fill="none"
          filter="url(#softGlow)"/>
        {/* Bar tape texture */}
        <path
          d="M 374 110 Q 404 98 424 112"
          stroke="rgba(255,215,0,0.2)"
          strokeWidth="2" fill="none"
          strokeDasharray="4 3"/>
        {/* Brake lever */}
        <path
          d="M 424 112 Q 436 118 432 134"
          stroke="#888" strokeWidth="4"
          strokeLinecap="round" fill="none"/>

        {/* ═══ MEASUREMENT ANNOTATIONS ═══ */}
        {/* Wheelbase */}
        <line x1="158" y1="438"
          x2="438" y2="438"
          stroke="rgba(255,215,0,0.15)"
          strokeWidth="0.5"
          strokeDasharray="4 4"/>
        <line x1="158" y1="432"
          x2="158" y2="444"
          stroke="rgba(255,215,0,0.3)"
          strokeWidth="1"/>
        <line x1="438" y1="432"
          x2="438" y2="444"
          stroke="rgba(255,215,0,0.3)"
          strokeWidth="1"/>
        <text x="298" y="455"
          textAnchor="middle"
          fill="rgba(255,215,0,0.25)"
          fontSize="8"
          fontFamily="DM Mono, monospace"
          letterSpacing="2">
          WHEELBASE · 1020mm
        </text>

        {/* Stack height */}
        <line x1="72" y1="80"
          x2="72" y2="420"
          stroke="rgba(255,215,0,0.1)"
          strokeWidth="0.5"
          strokeDasharray="4 4"/>
        <line x1="66" y1="80"
          x2="78" y2="80"
          stroke="rgba(255,215,0,0.25)"
          strokeWidth="1"/>
        <line x1="66" y1="420"
          x2="78" y2="420"
          stroke="rgba(255,215,0,0.25)"
          strokeWidth="1"/>

        {/* ═══ CORNER FRAME ═══ */}
        {[
          "M 12 12 L 36 12 L 36 16 L 16 16 L 16 36 L 12 36 Z",
          "M 568 12 L 544 12 L 544 16 L 564 16 L 564 36 L 568 36 Z",
          "M 12 468 L 36 468 L 36 464 L 16 464 L 16 444 L 12 444 Z",
          "M 568 468 L 544 468 L 544 464 L 564 464 L 564 444 L 568 444 Z",
        ].map((d, i) => (
          <path key={i} d={d}
            fill="rgba(255,215,0,0.25)"/>
        ))}

        {/* ═══ HEADER TEXT ═══ */}
        <text x="290" y="26"
          textAnchor="middle"
          fill="rgba(255,215,0,0.2)"
          fontSize="8"
          fontFamily="DM Mono, monospace"
          letterSpacing="6">
          TECHNICAL SCHEMATIC · REV.2024
        </text>
        <text x="290" y="40"
          textAnchor="middle"
          fill="rgba(255,215,0,0.1)"
          fontSize="7"
          fontFamily="DM Mono, monospace"
          letterSpacing="3">
          ROAD BICYCLE TYPE-R · SCALE 1:8
        </text>

        {/* ═══ CALLOUT LABELS ═══ */}
        {/* Carbon Frame */}
        <line x1="295" y1="210"
          x2="350" y2="185"
          stroke="rgba(255,215,0,0.15)"
          strokeWidth="0.8"
          strokeDasharray="3 3"/>
        <circle cx="295" cy="210" r="2"
          fill="rgba(255,215,0,0.4)"/>
        <text x="353" y="183"
          fill="rgba(255,215,0,0.3)"
          fontSize="7.5"
          fontFamily="DM Mono, monospace"
          letterSpacing="1.5">
          CARBON FIBER FRAME
        </text>

        {/* Shimano */}
        <line x1="268" y1="268"
          x2="200" y2="235"
          stroke="rgba(255,215,0,0.15)"
          strokeWidth="0.8"
          strokeDasharray="3 3"/>
        <circle cx="268" cy="268" r="2"
          fill="rgba(255,215,0,0.4)"/>
        <text x="100" y="233"
          fill="rgba(255,215,0,0.3)"
          fontSize="7.5"
          fontFamily="DM Mono, monospace"
          letterSpacing="1.5">
          SHIMANO 105 R7000
        </text>

        {/* 700c wheel */}
        <line x1="158" y1="185"
          x2="108" y2="160"
          stroke="rgba(255,215,0,0.15)"
          strokeWidth="0.8"
          strokeDasharray="3 3"/>
        <circle cx="158" cy="185" r="2"
          fill="rgba(255,215,0,0.4)"/>
        <text x="30" y="158"
          fill="rgba(255,215,0,0.3)"
          fontSize="7.5"
          fontFamily="DM Mono, monospace"
          letterSpacing="1.5">
          700c × 25mm
        </text>

        {/* Fork */}
        <line x1="392" y1="220"
          x2="460" y2="195"
          stroke="rgba(255,215,0,0.15)"
          strokeWidth="0.8"
          strokeDasharray="3 3"/>
        <circle cx="392" cy="220" r="2"
          fill="rgba(255,215,0,0.4)"/>
        <text x="463" y="193"
          fill="rgba(255,215,0,0.3)"
          fontSize="7.5"
          fontFamily="DM Mono, monospace"
          letterSpacing="1.5">
          CARBON FORK
        </text>

        {/* Ground reflection */}
        <ellipse cx="298" cy="424" rx="190" ry="5"
          fill="#FFD700" opacity="0.04"/>
        <ellipse cx="298" cy="424" rx="100" ry="3"
          fill="#FFD700" opacity="0.06"/>
      </svg>

      {/* DATA READOUT */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        fontFamily: 'DM Mono, monospace',
        fontSize: '9px',
        color: 'rgba(255,215,0,0.3)',
        letterSpacing: '2px',
        lineHeight: '2',
      }}>
        <div>WEIGHT ········ 7.8 KG</div>
        <div>MATERIAL ······ CARBON T800</div>
        <div>GROUPSET ······ SHIMANO 105</div>
        <div>WHEELSET ······ 700c × 25mm</div>
        <div>GEOMETRY ······ ENDURANCE
          <span style={{
            display: 'inline-block',
            width: '7px',
            height: '11px',
            background: '#FFD700',
            marginLeft: '4px',
            verticalAlign: 'middle',
            animation: 'blink 1s step-end infinite',
            opacity: 0.7,
          }}/>
        </div>
      </div>

      {/* SCAN LINE */}
      <div style={{
        position: 'absolute',
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.4) 50%, transparent 100%)',
        animation: 'scanDown 4s ease-in-out infinite',
        pointerEvents: 'none',
      }}/>

      {/* STATUS BADGE */}
      <div style={{
        position: 'absolute',
        top: '16px',
        right: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontFamily: 'DM Mono, monospace',
        fontSize: '8px',
        color: 'rgba(255,215,0,0.4)',
        letterSpacing: '2px',
      }}>
        <div style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#FFD700',
          animation: 'blink 1.5s ease infinite',
        }}/>
        ANALYSIS ACTIVE
      </div>

    </div>
  );
};

export default TechBike;
