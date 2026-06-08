import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ toggleMobileSidebar }) {
    const location = useLocation();
    const isCompareActive = location.pathname === '/compare';
    const compareCount = 0; // Placeholder for actual context/state
    
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <nav className="h-[56px] w-full sticky top-0 z-[1000] flex items-center justify-between px-6 transition-all"
             style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(24px)', borderBottom: '1px solid var(--border-subtle)' }}>

            {/* LEFT ZONE */}
            <div className="flex items-center gap-4">
                {/* Mobile Hamburger */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-5 h-5 focus:outline-none relative group"
                    onClick={toggleMobileSidebar}
                >
                    <span className="w-[20px] h-[1.5px] bg-[#555] group-hover:bg-[#FFD700] transition-transform duration-300 absolute -translate-y-[6px]"></span>
                    <span className="w-[20px] h-[1.5px] bg-[#555] group-hover:bg-[#FFD700] transition-opacity duration-300 absolute"></span>
                    <span className="w-[20px] h-[1.5px] bg-[#555] group-hover:bg-[#FFD700] transition-transform duration-300 absolute translate-y-[6px]"></span>
                </button>

                <NavLink to="/" className="flex items-center gap-4 focus:outline-none group">
                    <span className="text-[22px] text-[var(--gold)] tracking-[8px] leading-none" style={{ fontFamily: 'var(--font-display)', textShadow: 'none' }}>
                        P23
                    </span>
                    <div className="w-[1px] h-[28px] bg-[#1A1A1A] hidden sm:block"></div>
                    <div className="hidden sm:flex flex-col justify-center">
                        <span className="text-[20px] text-[var(--text-primary)] leading-none tracking-[2px]" style={{ fontFamily: 'var(--font-display)' }}>
                            CYCHIGH
                        </span>
                        <span className="text-[10px] text-[var(--text-ghost)] leading-none mt-1 tracking-[1px]" style={{ fontFamily: 'var(--font-body)' }}>
                            Cycle Knowledge Hub
                        </span>
                    </div>
                </NavLink>
            </div>

            {/* RIGHT ZONE */}
            <div className="flex items-center gap-2 sm:gap-[8px]">
                
                {/* Search */}
                <div className="flex items-center mr-2">
                    <AnimatePresence>
                        {searchOpen && (
                            <motion.input
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: 200, opacity: 1 }}
                                exit={{ width: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-[30px] bg-[var(--bg-void)] border border-[var(--border-subtle)] rounded-[var(--radius-sm)] px-3 text-[12px] text-[var(--text-secondary)] font-body focus:outline-none focus:border-[var(--gold)] mr-2"
                                autoFocus
                            />
                        )}
                    </AnimatePresence>
                    <button 
                        onClick={() => setSearchOpen(!searchOpen)}
                        className="p-1 text-[var(--text-muted)] hover:text-[var(--gold)] focus:outline-none transition-colors"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                    </button>
                </div>

                <div className="w-[1px] h-[20px] bg-[#1A1A1A] hidden sm:block mx-1"></div>

                <NavLink
                    to="/compare"
                    className="relative flex items-center gap-2 text-[11px] uppercase tracking-[2px] transition-colors focus:outline-none group px-2 py-1"
                    style={{ 
                        fontFamily: 'var(--font-body)',
                        color: isCompareActive ? 'var(--gold)' : 'var(--text-muted)' 
                    }}
                >
                    <span className="group-hover:text-[var(--gold)] transition-colors">COMPARE</span>
                    {compareCount > 0 && (
                        <span className="flex items-center justify-center w-[16px] h-[16px] rounded-full bg-[var(--gold)] text-[#000] text-[10px] leading-none" style={{ fontFamily: 'var(--font-mono)' }}>
                            {compareCount}
                        </span>
                    )}
                    {isCompareActive && (
                        <motion.div layoutId="navUnderline" className="absolute bottom-0 left-0 w-full h-[1px] bg-[var(--gold)]" />
                    )}
                </NavLink>

                <div className="w-[1px] h-[20px] bg-[#1A1A1A] hidden sm:block mx-1"></div>

                <NavLink
                    to="/admin"
                    className="relative hidden sm:flex items-center text-[11px] uppercase tracking-[2px] transition-colors focus:outline-none group px-2 py-1 text-[var(--text-muted)] hover:text-[var(--gold)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                >
                    <span>ADMIN</span>
                </NavLink>
            </div>
        </nav>
    );
}
