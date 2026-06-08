import React, { useState } from 'react';
import { useCycles } from '../../context/CycleContext';
import { useCompare } from '../../context/CompareContext';
import { Plus, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CompareSelector = () => {
    const { cycles, loading } = useCycles();
    const { compareList, addToCompare, removeFromCompare, clearCompare } = useCompare();
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const filtered = cycles.filter(c => 
        (c.name.toLowerCase().includes(search.toLowerCase()) || 
         c.brand.toLowerCase().includes(search.toLowerCase())) &&
        !compareList.find(comp => comp.id === c.id)
    ).slice(0, 5);

    return (
        <div className="w-full glass-panel p-6 rounded-xl mb-8 border border-brand-gold/20 relative z-50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
                <div>
                    <h2 className="heading-md">Comparison Garage</h2>
                    <p className="text-brand-muted text-sm">{compareList.length} of 3 cycles selected for head-to-head.</p>
                </div>
                {compareList.length > 0 && (
                    <button onClick={clearCompare} className="btn-outline text-xs py-1.5 px-4">
                        Clear Garage
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Render Selected */}
                {compareList.map((cycle) => (
                    <div key={cycle.id} className="relative bg-black/50 border border-white/10 rounded-lg p-4 flex gap-4 items-center group">
                        <button 
                            onClick={() => removeFromCompare(cycle.id)}
                            className="absolute -top-2 -right-2 bg-brand-red text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X size={14} />
                        </button>
                        <img src={cycle.image} alt={cycle.name} className="w-16 h-12 object-cover rounded" />
                        <div>
                            <p className="font-bebas tracking-widest text-brand-gold text-sm m-0">{cycle.brand}</p>
                            <p className="text-white text-sm font-bold truncate pr-4">{cycle.name}</p>
                        </div>
                    </div>
                ))}

                {/* Dropdown Adder */}
                {compareList.length < 3 && (
                    <div className="relative">
                        <div 
                            className="border-2 border-dashed border-white/20 rounded-lg p-4 h-full flex flex-col items-center justify-center cursor-pointer hover:border-brand-gold/50 transition-colors bg-white/5 group"
                            onClick={() => setShowDropdown(true)}
                        >
                            <Plus size={24} className="text-white/50 group-hover:text-brand-gold mb-2" />
                            <span className="font-dmono text-xs text-white/50 group-hover:text-brand-gold uppercase">Add Cycle</span>
                        </div>

                        <AnimatePresence>
                            {showDropdown && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-brand-panel border border-brand-gold/30 rounded-lg shadow-2xl z-50 p-4"
                                >
                                    <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
                                        <div className="flex items-center gap-2 flex-grow pr-4">
                                            <Search size={16} className="text-brand-gold" />
                                            <input 
                                                type="text" 
                                                autoFocus
                                                placeholder="Search to add..."
                                                className="bg-transparent border-none text-sm text-white w-full focus:outline-none placeholder-white/30"
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                            />
                                        </div>
                                        <button onClick={() => setShowDropdown(false)}><X size={16} className="text-brand-muted hover:text-white" /></button>
                                    </div>
                                    <div className="flex flex-col gap-2 max-h-48 overflow-y-auto">
                                        {!loading && filtered.length === 0 && <p className="text-xs text-brand-muted text-center py-4">No results.</p>}
                                        {filtered.map(c => (
                                            <button 
                                                key={c.id} 
                                                className="text-left px-3 py-2 text-sm text-white hover:bg-white/10 rounded flex justify-between items-center"
                                                onClick={() => { addToCompare(c); setShowDropdown(false); setSearch(''); }}
                                            >
                                                <span>{c.brand} <span className="font-bold">{c.name}</span></span>
                                                <Plus size={14} className="text-brand-gold" />
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompareSelector;
