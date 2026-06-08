import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../../utils/formatters';

export default function GlossaryModal({ isOpen, onClose, part }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!part) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/85 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-lg bg-bee-card border border-gold/30 rounded-2xl shadow-glow overflow-y-auto max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="sticky top-0 right-0 p-4 flex justify-end">
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-bee-mid text-gray-400 hover:text-white hover:bg-bee-border transition-colors"
                            >
                                ×
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-8 pb-8 pt-2">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="font-heading text-4xl text-gold tracking-widest">{part.name}</h2>
                                    <p className="text-white text-lg font-medium">{part.brand} {part.model && `- ${part.model}`}</p>
                                </div>
                                <div className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
                                    {part.category === 'Drivetrain' ? '⚙️' : part.category === 'Brakes' ? '🛑' : '🔧'}
                                </div>
                            </div>

                            <div className="mb-8">
                                <p className="text-gray-400 text-base leading-relaxed">{part.description || 'No description available for this part.'}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="bg-bee-black border border-bee-border p-4 rounded-xl">
                                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Category</span>
                                    <span className="text-white font-medium">{part.category}</span>
                                </div>

                                <div className="bg-bee-black border border-bee-border p-4 rounded-xl">
                                    <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Upgradeable</span>
                                    {part.upgradeable ? (
                                        <span className="inline-block px-2 py-0.5 bg-success/10 text-success text-sm font-bold rounded border border-success/20">YES</span>
                                    ) : (
                                        <span className="inline-block px-2 py-0.5 bg-danger/10 text-danger text-sm font-bold rounded border border-danger/20">NO</span>
                                    )}
                                </div>
                            </div>

                            {part.cost?.inr && (
                                <div className="border-t border-bee-border pt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                    <div>
                                        <span className="block text-xs text-gray-500 uppercase tracking-wider mb-1">Estimated Replacement Cost</span>
                                        <div className="flex items-baseline gap-3">
                                            <span className="font-heading text-3xl text-gold">{formatCurrency(part.cost.inr, 'INR')}</span>
                                            <span className="text-gray-500 text-sm">~ {formatCurrency(part.cost.usd, 'USD')}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
