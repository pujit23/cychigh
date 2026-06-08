import React from 'react';
import { MapPin, Navigation, Mountain } from 'lucide-react';

const routes = [
    { title: "Nandi Hills Climb", location: "Bangalore", type: "Road", dist: "22km", elev: "400m", diff: "Hard", desc: "The classic Bangalore climb. 40 hairpin bends to watch the sunrise." },
    { title: "Turahalli Forest", location: "Bangalore", type: "MTB", dist: "15km", elev: "150m", diff: "Medium", desc: "Rocky technical descents and loose gravel climbs. Perfect for trail training." },
    { title: "ECR Scenic Coast", location: "Chennai", type: "Road", dist: "60km", elev: "30m", diff: "Easy", desc: "Flat, fast, and windy ride along the Bay of Bengal coastline." },
    { title: "Lavasa Mutha Ghat", location: "Pune", type: "Road", dist: "45km", elev: "850m", diff: "Hard", desc: "Epic climbing route through the Western Ghats with stunning valley views." },
    { title: "Aravalli Trails", location: "Gurgaon", type: "Gravel", dist: "35km", elev: "200m", diff: "Medium", desc: "Off-road network in the NCR region. Dry, dusty, and incredibly fun." }
];

const RoutesPage = () => {
    return (
        <div className="py-12 max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
                <h1 className="heading-lg mb-4 text-brand-gold">Hallowed Ground</h1>
                <p className="text-xl text-brand-muted font-dsans max-w-2xl mx-auto">Explore the finest cycling routes curated by the community.</p>
            </div>

            <div className="space-y-6">
                {routes.map((route, i) => (
                    <div key={i} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-colors flex flex-col md:flex-row gap-6 items-center">
                        <div className="w-full md:w-48 h-32 bg-black/50 rounded-xl border border-white/10 flex items-center justify-center shrink-0 relative overflow-hidden group">
                            <Navigation size={32} className="text-brand-muted group-hover:text-brand-gold transition-colors" />
                            <div className="absolute inset-0 bg-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        
                        <div className="flex-1 w-full">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bebas text-3xl tracking-widest text-white m-0 leading-none mb-2">{route.title}</h3>
                                    <div className="flex items-center gap-2 text-xs font-dmono uppercase tracking-wider text-brand-muted">
                                        <MapPin size={14} className="text-brand-red" /> {route.location} • <Mountain size={14} /> {route.type}
                                    </div>
                                </div>
                                <span className={`px-3 py-1 text-xs font-dmono uppercase tracking-widest rounded ${route.diff === 'Hard' ? 'bg-brand-red/20 text-brand-red' : route.diff === 'Medium' ? 'bg-brand-gold/20 text-brand-gold' : 'bg-green-500/20 text-green-500'}`}>
                                    {route.diff}
                                </span>
                            </div>
                            
                            <p className="text-white/80 font-dsans leading-relaxed my-4">{route.desc}</p>
                            
                            <div className="flex gap-6 border-t border-white/10 pt-4">
                                <div>
                                    <span className="text-[10px] text-brand-muted uppercase tracking-widest font-dmono block mb-1">Distance</span>
                                    <span className="font-bebas text-xl text-white tracking-wider">{route.dist}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] text-brand-muted uppercase tracking-widest font-dmono block mb-1">Elevation</span>
                                    <span className="font-bebas text-xl text-white tracking-wider">{route.elev}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoutesPage;
