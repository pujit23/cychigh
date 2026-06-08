import React, { useState } from 'react';
import { Scale } from 'lucide-react';

const WeightSimulator = () => {
    const [baseWeight, setBaseWeight] = useState(10.5); // kg
    const [budget, setBudget] = useState(50000); // INR

    // Dumb heuristic: 10,000 INR roughly saves 100g on mid-high end bikes
    const weightSaved = (budget / 10000) * 0.1;
    const newWeight = Math.max(6.8, baseWeight - weightSaved).toFixed(2); // UCI limit ~6.8kg
    const percentSaved = (((baseWeight - newWeight) / baseWeight) * 100).toFixed(1);

    return (
        <div className="glass-panel p-6 rounded-2xl w-full h-full flex flex-col border border-white/10 hover:border-brand-gold/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <Scale size={20} className="text-brand-gold" />
                <h3 className="font-bebas text-2xl tracking-widest">Upgrade Weight Sim</h3>
            </div>
            
            <div className="space-y-4 mb-6 flex-grow">
                <div>
                    <label className="text-brand-muted text-xs font-dmono uppercase block mb-2">Base Cycle Weight (kg)</label>
                    <input 
                        type="number" step="0.1" 
                        value={baseWeight} onChange={(e) => setBaseWeight(Number(e.target.value))} 
                        className="input-field text-center font-bebas text-xl" 
                    />
                </div>
                <div>
                    <label className="text-brand-muted text-xs font-dmono uppercase block mb-2">Upgrade Budget (₹)</label>
                    <input 
                        type="range" min="0" max="250000" step="5000"
                        value={budget} onChange={(e) => setBudget(Number(e.target.value))} 
                        className="w-full accent-brand-gold h-2 bg-white/10 rounded-lg appearance-none cursor-pointer" 
                    />
                    <div className="text-right text-brand-gold font-dmono mt-2">₹{budget.toLocaleString()}</div>
                </div>
            </div>

            <div className="flex gap-4 mt-auto">
                <div className="flex-1 bg-black/40 p-4 rounded-xl border border-white/5 text-center flex flex-col justify-center">
                    <p className="text-[10px] text-brand-muted uppercase font-dmono tracking-widest mb-1">Estimated Weight</p>
                    <p className="font-bebas text-4xl text-white leading-none">{newWeight} <span className="text-xl text-white/50">kg</span></p>
                </div>
                <div className="flex-1 bg-brand-gold/10 p-4 rounded-xl border border-brand-gold/30 text-center flex flex-col justify-center">
                    <p className="text-[10px] text-brand-gold uppercase font-dmono tracking-widest mb-1">Weight Saved</p>
                    <p className="font-bebas text-3xl text-brand-gold leading-none">-{percentSaved}%</p>
                </div>
            </div>
        </div>
    );
};

export default WeightSimulator;
