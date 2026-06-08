import React from 'react';
import { motion } from 'framer-motion';
import CompareSelector from '../components/compare/CompareSelector';
import CompareTable from '../components/compare/CompareTable';
import { useCompare } from '../context/CompareContext';

export default function ComparePage() {
    const { clearCompare, compareList } = useCompare();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full min-h-screen pb-20 pt-8"
            style={{ background: 'var(--bg-deepest)' }}
        >
            <div className="max-w-6xl mx-auto px-6">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 pb-6" style={{ borderBottom: '1px solid var(--border-subtle)' }}>
                    <div>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '20px', color: 'var(--gold)', letterSpacing: '4px', display: 'block', marginBottom: '8px' }}>
                            ENG.23
                        </span>
                        <h1 className="m-0" style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--text-primary)', textTransform: 'uppercase', lineHeight: 1 }}>
                            Cross-Telemetry Analysis
                        </h1>
                        <p className="m-0 mt-3" style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '3px' }}>
                            ISOLATE AND COMPARE VEHICLE METRICS
                        </p>
                    </div>
                    {compareList.length > 0 && (
                        <button
                            onClick={clearCompare}
                            className="focus:outline-none bg-transparent transition-colors group"
                            style={{ border: 'none', padding: 0 }}
                        >
                            <span className="group-hover:text-[var(--red)] transition-colors" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px' }}>
                                CLEAR SENSOR CACHE ✕
                            </span>
                        </button>
                    )}
                </div>

                <CompareSelector />

                {compareList.length === 2 ? (
                    <CompareTable />
                ) : (
                    <div className="w-full flex flex-col items-center justify-center text-center py-32"
                         style={{ background: 'var(--bg-dark)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)' }}>
                        <div className="flex items-center justify-center mb-6"
                             style={{ width: '64px', height: '64px', borderRadius: '50%', border: '1px solid var(--border-mid)' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1">
                                <line x1="12" y1="5" x2="12" y2="19"></line>
                                <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                        </div>
                        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-ghost)', textTransform: 'uppercase', letterSpacing: '3px' }}>
                            SELECT TWO CYCLES TO INITIATE SEQUENCE
                        </p>
                    </div>
                )}

            </div>
        </motion.div>
    );
}
