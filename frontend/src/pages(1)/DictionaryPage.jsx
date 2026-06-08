import React, { useState } from 'react';

const terms = [
    { term: "Cadence", def: "The rate at which a cyclist pedals (revolutions per minute, RPM)." },
    { term: "Cassette", def: "The cluster of sprockets on the rear hub of the bicycle." },
    { term: "Derailleur", def: "The mechanism that moves the chain from one gear to another." },
    { term: "Drops", def: "The lower, curved portion of road bike handlebars." },
    { term: "Groupset", def: "The collective components that make up a bicycle's drivetrain and brakes." },
    { term: "Bottom Bracket", def: "The bearing assembly that connects the crankset to the bicycle frame." },
    { term: "Travel", def: "The maximum distance a suspension fork or rear shock can compress." },
    { term: "Tubeless", def: "A tire system that eliminates the inner tube, using sealant instead." },
    // A sample of 8 for UI. Real seed data has all 50+.
];

const DictionaryPage = () => {
    const [search, setSearch] = useState('');

    const filtered = terms.filter(t => t.term.toLowerCase().includes(search.toLowerCase()) || t.def.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="max-w-4xl mx-auto py-8">
            <h1 className="heading-lg text-center mb-4">Cycling Dictionary</h1>
            <p className="text-brand-muted text-center mb-8 font-dsans">Know your terms. Learn the language of the ride.</p>

            <div className="mb-12">
                <input 
                    type="text" 
                    placeholder="Search terms..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input-field w-full py-4 text-lg"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((t, idx) => (
                    <div key={idx} className="glass-panel p-6 rounded-xl border border-white/10 hover:border-brand-gold/30 transition-colors">
                        <h3 className="font-bebas text-2xl tracking-widest text-brand-gold mb-2">{t.term}</h3>
                        <p className="text-white/80 font-dsans leading-relaxed">{t.def}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DictionaryPage;
