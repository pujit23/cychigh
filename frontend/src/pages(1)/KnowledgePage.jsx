import React from 'react';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';

const articles = [
    { title: "The Aero vs Weight Debate", category: "Science", time: "8 min read", excerpt: "At what gradient does weight matter more than aerodynamics? We crunch the numbers using Newton's laws." },
    { title: "Choosing Your First Gravel Bike", category: "Guide", time: "12 min read", excerpt: "Everything you need to know about tire clearance, geometry flaring, and 1x vs 2x drivetrains." },
    { title: "Tubeless Setup Masterclass", category: "Workshop", time: "6 min read", excerpt: "Stop using innertubes. Here is a foolproof guide to seating tubeless tires without an air compressor." },
    { title: "Nutrition for Century Rides", category: "Training", time: "10 min read", excerpt: "Bonking is a choice. Learn how to calculate carbohydrate intake per hour for endurance efforts." }
];

const KnowledgePage = () => {
    return (
        <div className="py-12 max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <h1 className="heading-lg mb-2">Knowledge Hub</h1>
                    <p className="text-xl text-brand-muted font-dsans">In-depth articles, science, and guides.</p>
                </div>
                <div className="flex gap-2">
                    {['All', 'Science', 'Guide', 'Workshop'].map(cat => (
                        <button key={cat} className="px-4 py-2 border border-white/10 rounded-full text-sm font-dmono uppercase hover:border-brand-gold text-brand-muted hover:text-brand-gold transition-colors">
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((art, i) => (
                    <article key={i} className="glass-panel p-8 rounded-2xl flex flex-col h-full border border-white/5 hover:border-brand-gold/30 transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="bg-brand-red/20 text-brand-red text-xs font-dmono px-3 py-1 rounded-full uppercase tracking-wider">{art.category}</span>
                            <span className="flex items-center gap-1 text-xs text-brand-muted font-dmono"><Clock size={12} /> {art.time}</span>
                        </div>
                        
                        <h2 className="font-bebas text-3xl tracking-widest text-white mb-4 group-hover:text-brand-gold transition-colors">{art.title}</h2>
                        <p className="text-white/70 font-dsans leading-relaxed mb-8 flex-grow">{art.excerpt}</p>
                        
                        <div className="flex items-center gap-2 text-sm font-dmono uppercase tracking-widest text-brand-gold mt-auto group-hover:translate-x-2 transition-transform">
                            Read Article <ArrowRight size={16} />
                        </div>
                    </article>
                ))}
            </div>
            
            <div className="mt-16 bg-gradient-to-r from-brand-gold/10 to-transparent border border-brand-gold/20 p-8 rounded-2xl flex items-center justify-between">
                <div>
                    <h3 className="font-bebas text-2xl tracking-widest text-brand-gold mb-2">Subscribe to the P23 Newsletter</h3>
                    <p className="text-brand-muted font-dsans">Get the latest deep dives directly in your inbox.</p>
                </div>
                <button className="btn-gold whitespace-nowrap">Subscribe</button>
            </div>
        </div>
    );
};

export default KnowledgePage;
