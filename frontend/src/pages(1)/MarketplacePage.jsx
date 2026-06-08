import React from 'react';
import { Tag, MapPin } from 'lucide-react';

const MarketplacePage = () => {
    return (
        <div className="py-12 max-w-7xl mx-auto px-4">
             <div className="text-center mb-16">
                <h1 className="heading-lg mb-4 text-brand-gold drop-shadow-[0_0_20px_rgba(255,215,0,0.2)]">Premium Marketplace</h1>
                <p className="text-xl text-brand-muted font-dsans max-w-2xl mx-auto">Buy and sell pre-owned, high-end bicycles and components.</p>
            </div>

            <div className="flex justify-center mb-12">
                <div className="glass-panel py-8 px-12 text-center border-dashed border-2 border-brand-red/50 bg-brand-red/5">
                    <h2 className="font-bebas text-3xl text-white mb-2 tracking-widest">Marketplace Launching Soon</h2>
                    <p className="text-brand-muted font-dsans">We are building a secure escrow system for premium trades.</p>
                </div>
            </div>

            <h3 className="font-bebas text-2xl tracking-widest text-white mb-6 border-b border-white/10 pb-4">Preview Sandbox Listings</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-60 grayscale pointer-events-none">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="glass-panel p-4 rounded-xl">
                        <div className="w-full h-48 bg-black/50 rounded-lg mb-4 flex items-center justify-center">
                            <span className="text-brand-muted font-bebas text-2xl">Image Placeholder</span>
                        </div>
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-lg text-white">S-Works Tarmac SL7 Frame</h4>
                            <span className="font-bebas text-xl text-brand-gold">₹2.8L</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-brand-muted font-dmono uppercase tracking-widest mb-4">
                            <MapPin size={12} /> Bangalore • <Tag size={12} /> Used
                        </div>
                        <button className="w-full py-2 bg-white/5 border border-white/10 rounded font-dmono uppercase text-xs tracking-widest">View Details</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarketplacePage;
