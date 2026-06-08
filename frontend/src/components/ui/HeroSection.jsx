import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedBike = () => (
  <div style={{
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  }}>
    {/* GOLD GLOW BEHIND BIKE */}
    <div style={{
      position: 'absolute',
      width: '400px',
      height: '400px',
      background: 'radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'goldPulse 3s ease-in-out infinite',
    }}/>

    {/* BIKE SVG */}
    <svg
      viewBox="0 0 560 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: '520px',
        height: '390px',
        filter: 'drop-shadow(0 0 30px rgba(255,215,0,0.2))',
        animation: 'bikeFloat 3s ease-in-out infinite',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {/* REAR WHEEL */}
      <circle cx="150" cy="290" r="110" stroke="#2a2a2a" strokeWidth="8" fill="none"/>
      <circle cx="150" cy="290" r="12" fill="#FFD700"/>
      <line x1="150" y1="180" x2="150" y2="400" stroke="#2a2a2a" strokeWidth="2"/>
      <line x1="40" y1="290" x2="260" y2="290" stroke="#2a2a2a" strokeWidth="2"/>
      <line x1="72" y1="212" x2="228" y2="368" stroke="#2a2a2a" strokeWidth="2"/>
      <line x1="228" y1="212" x2="72" y2="368" stroke="#2a2a2a" strokeWidth="2"/>
      <line x1="90" y1="196" x2="210" y2="384" stroke="#222" strokeWidth="1.5"/>
      <line x1="210" y1="196" x2="90" y2="384" stroke="#222" strokeWidth="1.5"/>
      <circle cx="150" cy="290" r="110" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="60 640" fill="none" opacity="0.5"/>

      {/* FRONT WHEEL */}
      <circle cx="410" cy="290" r="110" stroke="#2a2a2a" strokeWidth="8" fill="none"/>
      <circle cx="410" cy="290" r="12" fill="#FFD700"/>
      <line x1="410" y1="180" x2="410" y2="400" stroke="#2a2a2a" strokeWidth="2"/>
      <line x1="300" y1="290" x2="520" y2="290" stroke="#2a2a2a" strokeWidth="2"/>
      <line x1="332" y1="212" x2="488" y2="368" stroke="#2a2a2a" strokeWidth="2"/>
      <line x1="488" y1="212" x2="332" y2="368" stroke="#2a2a2a" strokeWidth="2"/>
      <line x1="350" y1="196" x2="470" y2="384" stroke="#222" strokeWidth="1.5"/>
      <line x1="470" y1="196" x2="350" y2="384" stroke="#222" strokeWidth="1.5"/>
      <circle cx="410" cy="290" r="110" stroke="#FFD700" strokeWidth="1.5" strokeDasharray="60 640" fill="none" opacity="0.5"/>

      {/* FRAME */}
      <line x1="220" y1="130" x2="150" y2="290" stroke="#FFD700" strokeWidth="7" strokeLinecap="round"/>
      <line x1="220" y1="130" x2="235" y2="290" stroke="#CCAC00" strokeWidth="6" strokeLinecap="round"/>
      <line x1="220" y1="130" x2="330" y2="150" stroke="#FFD700" strokeWidth="6" strokeLinecap="round"/>
      <line x1="150" y1="290" x2="235" y2="290" stroke="#CCAC00" strokeWidth="5" strokeLinecap="round"/>
      <line x1="150" y1="290" x2="235" y2="220" stroke="#997F00" strokeWidth="4" strokeLinecap="round"/>
      <line x1="235" y1="220" x2="235" y2="290" stroke="#997F00" strokeWidth="4" strokeLinecap="round"/>

      {/* FORK */}
      <line x1="330" y1="150" x2="360" y2="290" stroke="#FFD700" strokeWidth="5" strokeLinecap="round"/>
      <line x1="360" y1="290" x2="410" y2="290" stroke="#FFD700" strokeWidth="4" strokeLinecap="round"/>

      {/* HEAD TUBE */}
      <rect x="318" y="128" width="18" height="42" rx="4" fill="#FFD700"/>

      {/* BOTTOM BRACKET */}
      <circle cx="235" cy="290" r="14" fill="#FFD700"/>
      <circle cx="235" cy="290" r="7" fill="#020202"/>

      {/* CHAINRING */}
      <circle cx="235" cy="290" r="32" stroke="#444" strokeWidth="3" fill="none"/>
      <circle cx="235" cy="290" r="26" stroke="#FFD700" strokeWidth="1.5" fill="none" opacity="0.6"/>

      {/* CRANK + PEDAL */}
      <line x1="235" y1="290" x2="270" y2="318" stroke="#FFD700" strokeWidth="5" strokeLinecap="round"/>
      <rect x="264" y="315" width="22" height="7" rx="2" fill="#AAAAAA"/>

      {/* SEAT POST + SADDLE */}
      <line x1="226" y1="132" x2="220" y2="88" stroke="#AAAAAA" strokeWidth="5" strokeLinecap="round"/>
      <path d="M 196 85 Q 222 76 250 85" stroke="#F0F0F0" strokeWidth="6" strokeLinecap="round" fill="none"/>

      {/* HANDLEBAR */}
      <line x1="330" y1="142" x2="356" y2="108" stroke="#AAAAAA" strokeWidth="5" strokeLinecap="round"/>
      <path d="M 342 106 Q 366 98 382 108 Q 392 116 386 130" stroke="#F0F0F0" strokeWidth="5" strokeLinecap="round" fill="none"/>

      {/* CHAIN */}
      <path d="M 265 292 Q 320 312 362 292" stroke="#333" strokeWidth="2" strokeDasharray="4 3" fill="none"/>

      {/* GROUND SHADOW */}
      <ellipse cx="280" cy="410" rx="170" ry="6" fill="#FFD700" opacity="0.05"/>
    </svg>
  </div>
);

const HeroSection = () => {
  return (
    <section style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '100vh',
      padding: '0 64px',
      background: '#020202',
      position: 'relative',
      overflow: 'hidden',
    }} className="border-b border-border-subtle">
      <div className="relative z-10" style={{ flex: 1, maxWidth: '50%' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[#333333] mb-0" 
          style={{ fontSize: '140px', lineHeight: 0.85, margin: 0 }}
        >
          KNOW YOUR
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-gold m-0 drop-shadow-[0_0_80px_rgba(255,215,0,0.15)]" 
          style={{ fontSize: '140px', lineHeight: 0.85, margin: 0 }}
        >
          RIDE
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="font-body text-sm text-[#555555] mt-6 max-w-xl"
        >
          The ultimate cycle knowledge hub. Compare specs, calculate fits, and explore 
          the world's premium bicycles with data-driven precision.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link to="/search" className="border border-gold text-gold font-body font-medium uppercase text-sm tracking-wider px-8 py-3 rounded hover:bg-gold-ghost transition-colors">
            EXPLORE CYCLES
          </Link>
          <Link to="/quiz" className="bg-red text-white font-body font-medium uppercase text-sm tracking-wider px-8 py-3 rounded hover:bg-red-700 transition-colors border border-red hover:border-red-700">
            FIND MY MATCH
          </Link>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-12 mt-16 pt-8 border-t border-border-ghost"
        >
          <div>
            <span className="block font-mono text-gold text-2xl">120</span>
            <span className="font-body text-xs text-[#444444] uppercase tracking-wider">CYCLES</span>
          </div>
          <div>
            <span className="block font-mono text-gold text-2xl">25</span>
            <span className="font-body text-xs text-[#444444] uppercase tracking-wider">BRANDS</span>
          </div>
          <div>
            <span className="block font-mono text-gold text-2xl">10</span>
            <span className="font-body text-xs text-[#444444] uppercase tracking-wider">CATEGORIES</span>
          </div>
        </motion.div>
      </div>

      <AnimatedBike />
    </section>
  );
};

export default HeroSection;
