import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCycles } from '../context/CycleContext';
import PartsBadge from '../components/cycle/PartsBadge';
import GlossaryModal from '../components/ui/GlossaryModal';

export default function GlossaryPage() {
    const { allCycles } = useCycles();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPart, setSelectedPart] = useState(null);

    // Extract parts from all cycles to create a massive database of parts
    const allParts = useMemo(() => {
        const partsMap = new Map();

        allCycles.forEach(cycle => {
            if (cycle.drivetrain?.derailleurRear) {
                partsMap.set(cycle.drivetrain.derailleurRear, {
                    name: cycle.drivetrain.derailleurRear, category: 'Derailleur', brand: 'Shimano', cycleFoundIn: cycle.name
                });
            }
            if (cycle.brakes?.type) {
                partsMap.set(cycle.brakes.type, {
                    name: cycle.brakes.type, category: 'Brakes', brand: 'Tektro', cycleFoundIn: cycle.name
                });
            }
            if (cycle.specs?.frameMaterial) {
                partsMap.set(cycle.specs.frameMaterial, {
                    name: cycle.specs.frameMaterial, category: 'Frame', brand: cycle.brand, cycleFoundIn: cycle.name
                });
            }
            if (cycle.specs?.suspensionType && cycle.specs.suspensionType !== 'Rigid') {
                partsMap.set(cycle.specs.suspensionType, {
                    name: cycle.specs.suspensionType, category: 'Suspension', brand: 'Suntour', cycleFoundIn: cycle.name
                });
            }
        });

        return Array.from(partsMap.values());
    }, [allCycles]);

    const filteredParts = useMemo(() => {
        if (!searchTerm) return allParts;
        const term = searchTerm.toLowerCase();
        return allParts.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            p.brand.toLowerCase().includes(term)
        );
    }, [allParts, searchTerm]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-bg-deepest pb-20 mt-[56px]"
        >
            <div className="w-full bg-bg-dark border-b border-border-subtle pt-16 pb-12 px-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-sharp-grid opacity-50 z-0"></div>
                <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <span className="font-heading text-xl text-gold tracking-[0.3em] block mb-2">DB.23</span>
                        <h1 className="font-heading text-5xl md:text-7xl text-text-primary uppercase m-0 leading-none">Global Component Matrix</h1>
                        <p className="font-body text-xs text-text-muted mt-4 max-w-lg tracking-widest leading-relaxed">
                            CROSS-REFERENCING {allParts.length} ISOLATED TELEMETRY BLUEPRINTS ACROSS ALL PLATFORMS.
                        </p>
                    </div>

                    <div className="w-full md:w-80 relative">
                        <input
                            type="text"
                            placeholder="QUERY MATRIX..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-[#050505] border border-border-mid text-text-primary px-4 py-3 font-mono text-sm focus:border-gold transition-colors rounded-none outline-none"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-12">
                {filteredParts.length === 0 ? (
                    <div className="text-center py-20 font-body text-xs text-text-muted uppercase tracking-[0.3em]">
                        SYSTEM RESPONSE: <span className="text-danger">0 REGISTERS FOUND</span>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-4">
                        {(filteredParts || []).map((part, i) => (
                            <PartsBadge
                                key={i}
                                part={part}
                                onClick={() => setSelectedPart(part)}
                            />
                        ))}
                    </div>
                )}
            </div>

            <GlossaryModal
                isOpen={!!selectedPart}
                onClose={() => setSelectedPart(null)}
                part={selectedPart}
            />
        </motion.div>
    );
}
