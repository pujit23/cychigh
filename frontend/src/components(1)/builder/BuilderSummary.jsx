import React from 'react';
import { useBuilder } from '../../context/BuilderContext';
import { formatCurrency } from '../../utils/formatters';
import { ShieldAlert, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BuilderSummary = () => {
    const { build, totalCost, totalWeight, warnings, resetBuild, removePart } = useBuilder();

    const partsList = [
        { key: 'frame', label: 'Frameset' },
        { key: 'fork', label: 'Suspension' },
        { key: 'wheels', label: 'Wheelset' },
        { key: 'drivetrain', label: 'Drivetrain' },
        { key: 'brakes', label: 'Brakes' },
        { key: 'cockpit', label: 'Cockpit' }
    ];

    return (
        <div className="glass-panel p-6 rounded-xl flex flex-col h-full sticky top-24">
            <div className="flex justify-between items-center mb-6">
                <h3 className="heading-md m-0">Build Summary</h3>
                <button onClick={resetBuild} className="text-brand-red hover:text-brand-red-hover flex items-center gap-1 text-sm font-dmono uppercase transition-colors">
                    <Trash2 size={16} /> Reset
                </button>
            </div>

            <AnimatePresence>
                {warnings.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-brand-red/10 border border-brand-red/30 rounded-lg p-4 mb-6"
                    >
                        <div className="flex items-center gap-2 text-brand-red mb-2">
                            <ShieldAlert size={18} />
                            <span className="font-bebas tracking-widest text-lg">Compatibility Warnings</span>
                        </div>
                        <ul className="list-disc pl-5 text-sm font-dsans text-white/80 space-y-1">
                            {warnings.map((w, i) => <li key={i}>{w}</li>)}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 mb-6">
                <div className="space-y-4">
                    {partsList.map(({ key, label }) => (
                        <div key={key} className="border-b border-white/5 pb-4 last:border-0">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-brand-muted font-dmono text-xs uppercase tracking-widest">{label}</span>
                                {build[key] && (
                                    <button onClick={() => removePart(key)} className="text-white/30 hover:text-brand-red transition-colors">
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                            {build[key] ? (
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-dsans text-white text-sm font-medium">{build[key].name}</p>
                                        <p className="font-dmono text-xs text-brand-muted mt-1">{build[key].weight}g</p>
                                    </div>
                                    <p className="font-dmono text-brand-gold text-sm">{formatCurrency(build[key].price)}</p>
                                </div>
                            ) : (
                                <div className="h-8 border border-dashed border-white/10 rounded flex items-center px-3 text-white/20 text-xs italic">
                                    Select {label.toLowerCase()}...
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="border-t border-brand-gold/20 pt-6 mt-auto">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-bebas tracking-widest text-brand-muted text-lg">Total Weight</span>
                    <span className="font-dmono text-white">{(totalWeight / 1000).toFixed(2)} kg</span>
                </div>
                <div className="flex justify-between items-end mb-6">
                    <span className="font-bebas tracking-widest text-white text-2xl uppercase">Build Est.</span>
                    <span className="font-bebas text-brand-gold text-4xl">{formatCurrency(totalCost)}</span>
                </div>
                
                <button 
                    disabled={totalCost === 0 || warnings.length > 0} 
                    className={`w-full py-4 text-center btn-gold ${totalCost === 0 || warnings.length > 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Save Build
                </button>
            </div>
        </div>
    );
};

export default BuilderSummary;
