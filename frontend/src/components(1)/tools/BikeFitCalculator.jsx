import React, { useState } from 'react';
import { calculateSaddleHeight, calculateFrameSize } from '../../utils/bikeFitCalculator';
import { Ruler, Info } from 'lucide-react';

const BikeFitCalculator = () => {
    const [height, setHeight] = useState('');
    const [inseam, setInseam] = useState('');
    const [category, setCategory] = useState('Road');
    
    const saddleHeight = calculateSaddleHeight(Number(inseam));
    const frameSize = calculateFrameSize(Number(height), category);

    return (
        <div className="glass-panel p-6 md:p-8 rounded-2xl w-full max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-gold/10 rounded-lg">
                    <Ruler size={24} className="text-brand-gold" />
                </div>
                <h2 className="heading-md m-0">Bike Fit Details</h2>
            </div>
            
            <div className="space-y-4 mb-8">
                <div>
                    <label className="text-brand-muted text-sm font-dmono uppercase tracking-wider block mb-2">Riding Discipline</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="input-field py-3 px-4 appearance-none relative"
                    >
                        <option value="Road">Road / Endurance</option>
                        <option value="Mountain">Mountain / Trail</option>
                        <option value="Hybrid">Hybrid / City</option>
                    </select>
                </div>
                <div>
                    <label className="text-brand-muted text-sm font-dmono uppercase tracking-wider flex items-center gap-2 mb-2">
                        Overall Height (cm)
                    </label>
                    <input 
                        type="number" 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 175"
                        className="input-field py-3 px-4"
                    />
                </div>
                <div>
                    <label className="text-brand-muted text-sm font-dmono uppercase tracking-wider flex items-center gap-2 mb-2">
                        Inseam Length (cm) <Info size={14} title="Measure from crotch down to floor in bare feet." />
                    </label>
                    <input 
                        type="number" 
                        value={inseam}
                        onChange={(e) => setInseam(e.target.value)}
                        placeholder="e.g. 80"
                        className="input-field py-3 px-4"
                    />
                </div>
            </div>

            <div className="bg-black/40 border border-white/10 p-6 rounded-xl">
                <h3 className="font-bebas text-brand-gold tracking-widest text-xl mb-4 border-b border-white/10 pb-2">Your Recommended Fit</h3>
                <div className="flex justify-between items-end mb-4">
                    <span className="text-brand-muted font-dsans text-sm">Target Frame Size</span>
                    <span className="font-bebas text-2xl text-white tracking-widest">{height ? frameSize : '--'}</span>
                </div>
                <div className="flex justify-between items-end">
                    <span className="text-brand-muted font-dsans text-sm flex gap-1 items-center">
                        Saddle Height (BB to Saddle) <Info size={12} title="LeMond Method formula" />
                    </span>
                    <span className="font-bebas text-2xl text-white tracking-widest">{inseam ? `${saddleHeight} cm` : '--'}</span>
                </div>
            </div>
        </div>
    );
};

export default BikeFitCalculator;
