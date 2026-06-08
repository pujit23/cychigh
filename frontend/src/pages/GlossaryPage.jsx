import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCycles } from '../context/CycleContext';
import PartsBadge from '../components/cycle/PartsBadge';
import GlossaryModal from '../components/ui/GlossaryModal';
import { FiSearch } from 'react-icons/fi';

export default function GlossaryPage() {
    const { cycles, loading } = useCycles();
    const [search, setSearch] = useState('');
    const [activePart, setActivePart] = useState(null);

    // Extract all unique parts from all cycles
    const allParts = React.useMemo(() => {
        const partsMap = new Map();
        cycles.forEach(cycle => {
            cycle.parts?.forEach(item => {
                if (item.part && item.part.name && !partsMap.has(item.part.name + item.part.model)) {
                    partsMap.set(item.part.name + item.part.model, {
                        ...item.part,
                        cycleFoundIn: cycle.name // Track origin for context
                    });
                }
            });
        });
        return Array.from(partsMap.values());
    }, [cycles]);

    const filteredParts = React.useMemo(() => {
        return allParts.filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.brand.toLowerCase().includes(search.toLowerCase()) ||
            p.category.toLowerCase().includes(search.toLowerCase())
        );
    }, [allParts, search]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto px-6 py-12"
        >
            <div className="text-center mb-16">
                <h1 className="font-heading text-5xl md:text-7xl text-gold tracking-widest drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] mb-4">
                    PARTS HIVE
                </h1>
                <p className="font-body text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                    The ultimate component encyclopedia. Explore every individual part used across our entire cycle database.
                </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12 relative">
                <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-gold text-xl" />
                <input
                    type="text"
                    placeholder="Search components by name, brand, or category..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-bee-panel border border-bee-border rounded-full px-14 py-4 text-white text-lg focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors shadow-glow"
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-xs font-bold font-heading tracking-widest text-gold bg-gold/10 px-3 py-1 rounded">
                    {filteredParts.length} PARTS
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-20">
                    <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
                </div>
            ) : filteredParts.length === 0 ? (
                <div className="text-center p-20 text-gray-500">
                    <div className="text-6xl mb-4 opacity-50">🐝❓</div>
                    <p className="text-xl font-heading tracking-wider">NO COMPONENTS FOUND</p>
                    <p className="text-sm">Try adjusting your search terms.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredParts.map((part, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <PartsBadge part={part} onClick={setActivePart} />
                        </motion.div>
                    ))}
                </div>
            )}

            <GlossaryModal isOpen={!!activePart} onClose={() => setActivePart(null)} part={activePart} />
        </motion.div>
    );
}
