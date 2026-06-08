import React, { useState } from 'react';
import { calculateGearRatio, getSpeedAtCadence } from '../../utils/gearCalculator';
import { Settings } from 'lucide-react';

const GearRatioCalculator = () => {
    const [chainring, setChainring] = useState(50);
    const [cassette, setCassette] = useState(11);
    const [wheelSize, setWheelSize] = useState(28); // Roughly 700c with tire

    const result = calculateGearRatio(chainring, cassette, wheelSize);
    const speed = getSpeedAtCadence(result.inches, 90);

    return (
        <div className="glass-panel p-6 md:p-8 rounded-2xl w-full max-w-lg mx-auto border hover:border-brand-gold/50 transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-brand-gold/10 rounded-lg">
                    <Settings size={24} className="text-brand-gold" />
                </div>
                <h2 className="heading-md m-0">Gear Ratio Analyzer</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                    <label className="text-brand-muted text-sm font-dmono uppercase block mb-2">Chainring Teeth</label>
                    <input type="number" value={chainring} onChange={(e) => setChainring(Number(e.target.value))} className="input-field text-center font-bebas text-2xl" />
                </div>
                <div>
                    <label className="text-brand-muted text-sm font-dmono uppercase block mb-2">Cassette Cog Teeth</label>
                    <input type="number" value={cassette} onChange={(e) => setCassette(Number(e.target.value))} className="input-field text-center font-bebas text-2xl" />
                </div>
                <div className="col-span-2">
                    <label className="text-brand-muted text-sm font-dmono uppercase block mb-2">Wheel Dia. (Inches)</label>
                    <input type="number" value={wheelSize} step={0.5} onChange={(e) => setWheelSize(Number(e.target.value))} className="input-field text-center font-bebas text-2xl" />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div className="text-center">
                    <p className="font-bebas text-3xl text-white">{result.ratio}</p>
                    <p className="text-[10px] text-brand-muted uppercase tracking-widest font-dmono">Ratio (Front/Rear)</p>
                </div>
                <div className="text-center border-l border-r border-white/10">
                    <p className="font-bebas text-3xl text-brand-gold">{result.inches}</p>
                    <p className="text-[10px] text-brand-muted uppercase tracking-widest font-dmono">Gear Inches</p>
                </div>
                <div className="text-center">
                    <p className="font-bebas text-3xl text-brand-red">{speed}</p>
                    <p className="text-[10px] text-brand-muted uppercase tracking-widest font-dmono">km/h @ 90rpm</p>
                </div>
            </div>
        </div>
    );
};

export default GearRatioCalculator;
