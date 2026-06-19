import React, { useState } from 'react';
import { Disc } from 'lucide-react';

const TireFinder = () => {
    const [terrain, setTerrain] = useState('Road');

    const recs = {
        'Road': { width: '25c - 28c', pressure: '85 - 100 PSI', tread: 'Slick / Minimal', example: 'Continental Grand Prix 5000' },
        'Gravel': { width: '38c - 45c', pressure: '35 - 50 PSI', tread: 'Knobby edges, smooth center', example: 'Panaracer GravelKing SK' },
        'XC MTB': { width: '2.1" - 2.4"', pressure: '22 - 30 PSI', tread: 'Fast rolling knobs', example: 'Maxxis Ikon' },
        'Enduro': { width: '2.4" - 2.6"', pressure: '20 - 28 PSI', tread: 'Aggressive side knobs', example: 'Maxxis Assegai / Minion DHR II' },
    };

    const cur = recs[terrain];

    return (
        <div className="glass-panel p-6 rounded-2xl w-full h-full flex flex-col border border-white/10 hover:border-brand-gold/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <Disc size={20} className="text-brand-gold" />
                <h3 className="font-bebas text-2xl tracking-widest">Tire Finder</h3>
            </div>
            
            <div className="flex gap-2 mb-6 overflow-x-auto custom-scrollbar pb-2">
                {Object.keys(recs).map(t => (
                    <button 
                        key={t} 
                        onClick={() => setTerrain(t)}
                        className={`px-4 py-1.5 rounded-full text-xs font-dmono uppercase whitespace-nowrap border ${terrain === t ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/10 text-white/50 hover:text-white'}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="space-y-4 flex-grow">
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-brand-muted text-sm font-dsans">Ideal Width</span>
                    <span className="text-white font-bebas text-xl">{cur.width}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-brand-muted text-sm font-dsans">Rec. Pressure</span>
                    <span className="text-brand-gold font-bebas text-xl">{cur.pressure}</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-brand-muted text-sm font-dsans">Tread Pattern</span>
                    <span className="text-white text-sm font-dsans text-right max-w-[60%]">{cur.tread}</span>
                </div>
                <div className="bg-black/30 p-4 rounded-lg mt-auto border border-white/5">
                    <span className="text-[10px] text-brand-muted uppercase tracking-widest font-dmono block mb-1">Gold Standard Example</span>
                    <span className="text-brand-red font-bebas text-lg tracking-widest leading-none">{cur.example}</span>
                </div>
            </div>
        </div>
    );
};

export default TireFinder;
