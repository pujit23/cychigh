import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCycles } from '../context/CycleContext';
import Sidebar from '../components/layout/Sidebar';
import HeroSection from '../components/ui/HeroSection';
import CycleDetail from '../components/cycle/CycleDetail';
import { CardSkeleton } from '../components/ui/LoadingSkeleton';

export default function Home() {
    const { cycles: filteredCycles, loading, selectedCycle, selectCycle } = useCycles();
    const nav = useNavigate();
    const location = useLocation();
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Parse URL to control split view
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const slug = params.get('cycle');
        if (slug) {
            selectCycle(slug);
        } else {
            selectCycle(null);
        }
    }, [location, selectCycle]);

    const handleExplore = () => {
        if (filteredCycles.length > 0) {
            nav(`/?cycle=${filteredCycles[0].slug}`);
        }
    };

    return (
        <div className="flex w-full min-h-screen bg-bg-deepest relative">

            {/* Sidebar Area */}
            <Sidebar
                isOpen={isMobileSidebarOpen}
                onClose={() => setIsMobileSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <main className="flex-1 md:ml-[260px] min-h-screen transition-all bg-bg-deepest">
                <AnimatePresence mode="wait">
                    {!selectedCycle ? (
                        <motion.div
                            key="hero"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full"
                        >
                            <HeroSection onExplore={handleExplore} />

                            {/* Mobile View Cycle Grid - Replaces Hero on small screen scroll */}
                            <div className="md:hidden px-4 py-8 space-y-4">
                                <h3 className="font-heading text-xl text-text-muted uppercase tracking-[0.2em] mb-4">MOBILE DIRECTORY</h3>
                                {loading ? (
                                    [1, 2, 3].map(i => <CardSkeleton key={i} />)
                                ) : (
                                    (filteredCycles || []).map(cycle => (
                                        <div
                                            key={cycle._id}
                                            onClick={() => nav(`/cycle/${cycle.slug}`)}
                                            className="bg-bg-dark border border-[#1F1F1F] p-4 flex justify-between items-center group cursor-pointer"
                                        >
                                            <div className="flex flex-col">
                                                <span className="font-body text-[10px] text-text-muted uppercase tracking-[0.2em]">{cycle.brand}</span>
                                                <span className="font-heading text-2xl text-text-primary group-hover:text-gold transition-colors">{cycle.name}</span>
                                            </div>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-text-muted group-hover:text-gold transition-colors">
                                                <polyline points="9 18 15 12 9 6"></polyline>
                                            </svg>
                                        </div>
                                    ))
                                )}
                            </div>

                        </motion.div>
                    ) : (
                        <motion.div
                            key="detail"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full min-h-screen relative"
                        >
                            <button
                                onClick={() => nav('/')}
                                className="absolute top-4 right-6 font-body text-[11px] text-text-muted hover:text-gold uppercase tracking-[0.2em] z-50 transition-colors focus:outline-none"
                            >
                                ✕ CLOSE TELEMETRY
                            </button>
                            <CycleDetail cycle={selectedCycle} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Mobile Sidebar Toggle Button */}
            <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0C0C0C] border border-[#2A2A2A] text-text-primary px-8 py-3 rounded-sharp shadow-dark-lift font-heading text-lg tracking-[0.2em] uppercase active:bg-gold active:text-bg-deepest transition-colors focus:outline-none"
            >
                INDEX
            </button>

        </div>
    );
}
