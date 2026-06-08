import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCycles } from '../../context/CycleContext';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
    const { allCycles, cycles: filteredCycles, filters, updateFilters, selectedCycle } = useCycles();
    const nav = useNavigate();
    const location = useLocation();

    // Feature 2: Recently Viewed
    const [recentSlugs, setRecentSlugs] = useState([]);

    useEffect(() => {
        try {
            const stored = JSON.parse(localStorage.getItem('recentCycles')) || [];
            setRecentSlugs(stored);
        } catch(e) {}
    }, [location.pathname]);

    const recentCycles = useMemo(() => {
        if (!recentSlugs.length) return [];
        return recentSlugs.map(slug => allCycles.find(c => c.slug === slug)).filter(Boolean);
    }, [recentSlugs, allCycles]);

    const BRAND_TABS = ['All', 'Trek', 'Giant', 'Specialized', 'Hero', 'Hercules', 'Others'];
    const CATEGORIES = ['All', 'MTB', 'Road', 'Hybrid', 'Gravel', 'City', 'Electric'];

    const groupedCycles = useMemo(() => {
        const map = new Map();
        (filteredCycles || []).forEach(c => {
            if (!map.has(c.brand)) map.set(c.brand, []);
            map.get(c.brand).push(c);
        });
        return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    }, [filteredCycles]);

    const handleSearchClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const SidebarContent = (
        <div className="w-full h-full flex flex-col relative"
             style={{ 
                 background: 'var(--bg-deep)', 
                 borderRight: '1px solid var(--border-subtle)',
             }}>

            {/* BRAND TABS */}
            <div className="flex-shrink-0 overflow-x-auto overflow-y-hidden whitespace-nowrap hide-scrollbar flex gap-2"
                 style={{ padding: '16px 16px 0' }}>
                {BRAND_TABS.map(brand => {
                    const isActive = filters.brand === brand || (brand === 'All' && !filters.brand);
                    return (
                        <button
                            key={brand}
                            onClick={() => updateFilters({ brand: brand === 'All' ? '' : brand })}
                            className="relative focus:outline-none transition-colors group"
                            style={{ 
                                fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase',
                                letterSpacing: '2px', padding: '8px 12px',
                                color: isActive ? 'var(--text-primary)' : 'var(--text-ghost)',
                                backgroundColor: 'transparent'
                            }}
                        >
                            <span className="group-hover:text-[var(--text-tertiary)] transition-colors">{brand}</span>
                            <div className="absolute bottom-0 left-0 h-[2px] transition-all duration-100 ease-out"
                                 style={{ 
                                     background: isActive ? 'var(--gold)' : 'transparent',
                                     width: isActive ? '100%' : '0%'
                                 }}>
                            </div>
                        </button>
                    )
                })}
            </div>

            {/* CATEGORY CHIPS */}
            <div className="flex-shrink-0 flex flex-wrap gap-2" style={{ padding: '12px 16px' }}>
                {CATEGORIES.map(cat => {
                    const isActive = filters.category === cat || (cat === 'All' && !filters.category);
                    return (
                        <button
                            key={cat}
                            onClick={() => updateFilters({ category: cat === 'All' ? '' : cat })}
                            className="focus:outline-none transition-colors"
                            style={{
                                fontFamily: 'var(--font-body)', fontSize: '9px', textTransform: 'uppercase',
                                letterSpacing: '1px', padding: '4px 10px',
                                borderRadius: 'var(--radius-sm)',
                                border: isActive ? '1px solid var(--gold)' : '1px solid var(--border-soft)',
                                color: isActive ? 'var(--gold)' : 'var(--text-ghost)',
                                background: isActive ? 'var(--gold-ghost)' : 'transparent'
                            }}
                        >
                            {cat}
                        </button>
                    )
                })}
            </div>

            {/* SEARCH INPUT */}
            <div className="relative flex-shrink-0" style={{ margin: '0 16px 8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                     className="absolute left-[12px] top-1/2 -translate-y-1/2" style={{ color: 'var(--text-ghost)' }}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    placeholder="Search cycle... (/)"
                    value={filters.search || ''}
                    onChange={(e) => updateFilters({ search: e.target.value })}
                    className="w-full focus:outline-none transition-all"
                    style={{
                        height: '36px', background: 'var(--bg-void)', border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)', padding: '0 12px 0 36px',
                        fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-secondary)'
                    }}
                />
            </div>

            {/* RESULTS COUNT */}
            <div className="flex-shrink-0" style={{ padding: '4px 16px 8px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: 'var(--text-ghost)', letterSpacing: '1px' }}>
                    {filteredCycles.length} CYCLES
                </span>
            </div>

            {/* CYCLE LIST */}
            <div className="flex-1 overflow-y-auto custom-scroll-sidebar relative">
                
                {recentCycles.length > 0 && !filters.search && !filters.brand && !filters.category && (
                    <div className="mb-2">
                        <div className="flex items-center" style={{ padding: '16px 16px 6px', borderTop: 'none' }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-void)', letterSpacing: '4px' }}>
                                RECENTLY VIEWED
                            </span>
                        </div>
                        {recentCycles.map((cycle) => {
                            const isActive = selectedCycle?.slug === cycle.slug;
                            return (
                                <NavLink
                                    key={`recent-${cycle._id}`}
                                    to={`/cycle/${cycle.slug}`}
                                    className="cycle-item-link flex justify-between items-center group relative focus:outline-none"
                                    style={{
                                        padding: '11px 16px', borderBottom: '1px solid var(--border-ghost)',
                                        background: isActive ? 'var(--gold-ghost)' : 'transparent',
                                        transition: 'var(--transition-fast)'
                                    }}
                                >
                                    <div className="absolute left-0 top-0 bottom-0 cycle-item-bar"
                                         style={{ 
                                             width: '2px', transition: 'var(--transition-fast)',
                                             background: isActive ? 'var(--gold)' : 'transparent' 
                                         }}></div>
                                    <div className="flex items-center w-full">
                                        <div className="cycle-item-num flex justify-center items-center" style={{ width: '28px', flexShrink: 0, marginRight: '10px' }}>
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: isActive ? 'var(--gold)' : 'var(--text-void)' }}>
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <polyline points="12 6 12 12 16 14"></polyline>
                                            </svg>
                                        </div>
                                        <div className="flex flex-col flex-1 truncate max-w-full">
                                            <span className="cycle-item-name truncate" style={{ 
                                                fontFamily: 'var(--font-body)', fontSize: '12px', transition: 'var(--transition-fast)',
                                                color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                                                fontWeight: isActive ? 500 : 400
                                            }}>{cycle.name}</span>
                                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--text-ghost)', marginTop: '1px' }}>{cycle.category}</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-void)', letterSpacing: '1px', marginTop: '2px' }}>{cycle.brand}</span>
                                        </div>
                                    </div>
                                </NavLink>
                            )
                        })}
                    </div>
                )}

                {(groupedCycles || []).map(([brand, list], idx) => (
                    <div key={brand} className="mb-0">
                        {/* Brand Header */}
                        <div className="flex items-center" style={{ 
                            padding: '16px 16px 6px',
                            borderTop: idx === 0 && (!recentCycles.length || filters.search) ? 'none' : '1px solid var(--border-ghost)' 
                        }}>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-void)', letterSpacing: '4px' }}>
                                {brand}
                            </span>
                        </div>

                        {/* Cycles */}
                        {(list || []).map((cycle) => {
                            const padNumber = String(allCycles.findIndex(c => c._id === cycle._id) + 1).padStart(3, '0');
                            const isActive = selectedCycle?.slug === cycle.slug && (location.pathname.startsWith('/cycle/') || location.pathname === '/');

                            return (
                                <NavLink
                                    key={cycle._id}
                                    to={`/cycle/${cycle.slug}`}
                                    className="cycle-item-link flex justify-between items-center group relative focus:outline-none"
                                    style={{
                                        padding: '11px 16px', borderBottom: '1px solid var(--border-ghost)',
                                        background: isActive ? 'var(--gold-ghost)' : 'transparent',
                                        transition: 'var(--transition-fast)'
                                    }}
                                >
                                    {/* Left Accent Bar */}
                                    <div className="absolute left-0 top-0 bottom-0 cycle-item-bar"
                                         style={{ 
                                             width: '2px', transition: 'var(--transition-fast)',
                                             background: isActive ? 'var(--gold)' : 'transparent' 
                                         }}></div>

                                    <div className="flex items-start w-full">
                                        <div className="cycle-item-num" style={{ 
                                            fontFamily: 'var(--font-mono)', fontSize: '10px', 
                                            color: isActive ? 'var(--gold)' : 'var(--text-void)', 
                                            width: '28px', flexShrink: 0, marginRight: '10px',
                                            transition: 'var(--transition-fast)'
                                        }}>
                                            {padNumber}
                                        </div>
                                        
                                        <div className="flex flex-col flex-1 truncate max-w-full">
                                            <span className="cycle-item-name truncate" style={{ 
                                                fontFamily: 'var(--font-body)', fontSize: '12px', transition: 'var(--transition-fast)',
                                                color: isActive ? 'var(--text-primary)' : 'var(--text-tertiary)',
                                                fontWeight: isActive ? 500 : 400
                                            }}>
                                                {cycle.name}
                                            </span>
                                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--text-ghost)', marginTop: '1px' }}>
                                                {cycle.category}
                                            </span>
                                        </div>

                                        <div className="flex flex-col items-end">
                                            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', color: 'var(--text-void)', letterSpacing: '1px', alignSelf: 'flex-start', marginTop: '2px' }}>
                                                {brand}
                                            </span>
                                        </div>
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>
                ))}
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                .cycle-item-link, .brand-tab {
                    outline: none;
                }
                .cycle-item-link:focus-visible::before, .brand-tab:focus-visible {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border: 1px solid var(--gold);
                    border-radius: inherit;
                    pointer-events: none;
                }
                .hide-scrollbar::-webkit-scrollbar { display: none; }
                .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                .custom-scroll-sidebar::-webkit-scrollbar { width: 2px; }
                .custom-scroll-sidebar::-webkit-scrollbar-track { background: transparent; }
                .custom-scroll-sidebar::-webkit-scrollbar-thumb { background: var(--bg-surface); }
                
                .cycle-item-link:hover:not(.active) { background: var(--bg-dark) !important; }
                .cycle-item-link:hover:not(.active) .cycle-item-bar { background: var(--border-strong) !important; }
                .cycle-item-link:hover:not(.active) .cycle-item-name { color: var(--text-secondary) !important; }
                
                input:focus::placeholder { opacity: 0.5; }
            `}} />
        </div>
    );

    // Desktop
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
        return (
            <aside className="fixed left-0 bottom-0 z-40 flex-shrink-0"
                   style={{ width: '260px', top: '56px', height: 'calc(100vh - 56px)' }}>
                {SidebarContent}
            </aside>
        );
    }

    // Mobile
    return (
        <AnimatePresence>
            {isOpen && (
                <React.Fragment>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#050505]/90 backdrop-blur-sm z-[60] md:hidden"
                    />
                    <motion.aside
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed left-0 top-[56px] bottom-0 w-[260px] z-[70] md:hidden"
                        style={{ height: 'calc(100vh - 56px)' }}
                    >
                        {SidebarContent}
                    </motion.aside>
                </React.Fragment>
            )}
        </AnimatePresence>
    );
}
