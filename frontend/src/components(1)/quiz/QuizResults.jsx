import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import CycleCard from '../cycle/CycleCard';

const QuizResults = ({ results, onRestart }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-8"
        >
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div>
                    <h2 className="heading-lg m-0 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]">Your Perfect Match</h2>
                    <p className="text-brand-muted font-dsans text-lg mt-2">Based on your riding profile, here are the top recommendations.</p>
                </div>
                <button onClick={onRestart} className="btn-outline flex items-center gap-2">
                    <RotateCcw size={18} /> Retake Quiz
                </button>
            </div>

            {results && results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {results.map((cycle, i) => (
                        <motion.div
                            key={cycle.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                        >
                            {/* Top Match Badge */}
                            {i === 0 && (
                                <div className="bg-brand-gold text-black text-center font-bebas tracking-widest uppercase py-1 text-sm rounded-t-xl z-20 relative">
                                    ★ Top Match ★
                                </div>
                            )}
                            <div className={i === 0 ? '-mt-1 relative z-10 h-full' : 'h-full'}>
                                <CycleCard cycle={cycle} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="glass-panel p-12 text-center rounded-xl">
                    <p className="text-xl text-brand-muted mb-4">No perfect matches found. Try adjusting your constraints.</p>
                    <button onClick={onRestart} className="btn-gold">Start Over</button>
                </div>
            )}
        </motion.div>
    );
};

export default QuizResults;
