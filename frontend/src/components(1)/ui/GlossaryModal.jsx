import React, { useEffect, useState } from 'react';
import { X, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GlossaryModal = ({ isOpen, onClose, glossaryData }) => {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Lock body scroll
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => document.body.style.overflow = 'unset';
    }, [isOpen]);

    if (!isOpen) return null;

    const filtered = glossaryData.filter(item => 
        item.term.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.definition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div 
                    initial={{ scale: 0.95, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.95, y: 20 }}
                    className="bg-brand-panel border border-brand-gold/20 w-full max-w-3xl max-h-[85vh] rounded-xl shadow-2xl overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-brand-gold/10 flex justify-between items-center bg-black/40">
                        <div className="flex items-center gap-3">
                            <BookOpen className="text-brand-gold" size={24} />
                            <h2 className="heading-md m-0 flex items-center pt-2">Cycling Glossary</h2>
                        </div>
                        <button onClick={onClose} className="text-white/50 hover:text-brand-red transition-colors">
                            <X size={24} />
                        </button>
                    </div>
                    
                    {/* Search */}
                    <div className="p-4 border-b border-white/5">
                        <input 
                            type="text" 
                            placeholder="Search terms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field rounded-lg"
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                        {filtered.length === 0 ? (
                            <p className="text-brand-muted text-center py-10">No terms found bridging your search.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                {filtered.map((item, idx) => (
                                    <div key={idx} className="group">
                                        <h3 className="text-brand-gold font-dsans font-bold text-lg mb-1 group-hover:text-white transition-colors">{item.term}</h3>
                                        <p className="text-brand-muted text-sm leading-relaxed">{item.definition}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default GlossaryModal;
