import React from 'react';
import { Target } from 'lucide-react';

const UpgradeRecommender = () => {
    const upgrades = [
        { name: "Tires", cost: "₹4k - ₹12k", impact: "High", desc: "Best bang for buck. Decreases rolling resistance vastly." },
        { name: "Wheelset", cost: "₹30k - ₹1.5L", impact: "Very High", desc: "Drops rotational weight, massive acceleration bump." },
        { name: "Saddle", cost: "₹3k - ₹15k", impact: "Medium", desc: "Pure comfort upgrade for longer endurance rides." },
        { name: "Groupset", cost: "₹40k - ₹2L", impact: "High", desc: "Better shifting feel, weight savings, more gears." }
    ];

    return (
        <div className="glass-panel p-6 rounded-2xl w-full h-full border border-white/10 hover:border-brand-gold/30 transition-colors">
            <div className="flex items-center gap-3 mb-6">
                <Target size={20} className="text-brand-gold" />
                <h3 className="font-bebas text-2xl tracking-widest">Upgrade Impact</h3>
            </div>
            
            <div className="space-y-4">
                {upgrades.map((u, i) => (
                    <div key={i} className="bg-black/30 p-4 rounded-lg border border-white/5">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bebas text-xl tracking-widest text-white">{u.name}</span>
                            <span className="font-dmono text-[10px] text-black bg-brand-gold px-2 py-1 rounded uppercase tracking-widest">{u.impact}</span>
                        </div>
                        <p className="text-sm text-brand-muted font-dsans mb-3">{u.desc}</p>
                        <span className="text-xs text-brand-red font-dmono tracking-wider">Est: {u.cost}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UpgradeRecommender;
