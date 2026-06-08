// ==============================================
// CycHigh — Glossary Page
// ==============================================

import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const GLOSSARY_DATA = [
    { term: 'Derailleur', category: 'Drivetrain', desc: 'A mechanism that moves the chain from one sprocket to another for gear shifting. Comes in front and rear variants.' },
    { term: 'Cassette', category: 'Drivetrain', desc: 'The cluster of sprockets on the rear wheel hub. Measured by number of speeds (e.g., 11-speed) and gear range (e.g., 11-42T).' },
    { term: 'Freewheel', category: 'Drivetrain', desc: 'An older design where the ratchet mechanism is built into the gear cluster. Common on budget bikes.' },
    { term: 'Crankset', category: 'Drivetrain', desc: 'The component consisting of crank arms and chainrings that converts pedaling into chain movement.' },
    { term: 'Bottom Bracket', category: 'Drivetrain', desc: 'The bearing assembly that connects the crankset to the frame, allowing smooth rotation. Types: BSA threaded, press-fit BB86.' },
    { term: 'Chainring', category: 'Drivetrain', desc: 'The toothed ring attached to the crankset. 1x systems use one; 2x/3x use multiple chainrings.' },
    { term: 'Hydraulic Disc Brakes', category: 'Brakes', desc: 'Braking system using hydraulic fluid and pistons to press brake pads against a rotor. Offers best stopping power and modulation.' },
    { term: 'Mechanical Disc Brakes', category: 'Brakes', desc: 'Disc brakes using a cable to actuate the caliper instead of hydraulic fluid. Easier to maintain but less powerful.' },
    { term: 'V-Brake', category: 'Brakes', desc: 'Linear-pull rim brake. Common on budget bikes. Pads press against the wheel rim to slow down.' },
    { term: 'Caliper Brake', category: 'Brakes', desc: 'Dual-pivot rim brake common on road bikes. Lightweight but less effective in wet conditions.' },
    { term: 'Rotor', category: 'Brakes', desc: 'The metal disc attached to the wheel hub used in disc brake systems. Common sizes: 160mm, 180mm, 200mm, 203mm.' },
    { term: 'Presta Valve', category: 'Wheels', desc: 'A narrow valve type common on road and performance bikes. Requires a specific pump head or adapter.' },
    { term: 'Schrader Valve', category: 'Wheels', desc: 'A wider valve type (same as car tires). Common on MTBs and budget bikes. Easier to inflate at gas stations.' },
    { term: 'Tubeless', category: 'Wheels', desc: 'A tire system without inner tubes. Uses sealant to prevent punctures. Allows lower tire pressure for better grip.' },
    { term: 'Spoke Count', category: 'Wheels', desc: 'Number of spokes in a wheel. More spokes = stronger wheel. Common counts: 24 (road), 28, 32 (MTB/hybrid), 36 (heavy-duty).' },
    { term: 'Hardtail', category: 'Suspension', desc: 'A bike with front suspension fork only and a rigid rear triangle. Lighter and more efficient than full-suspension.' },
    { term: 'Full Suspension', category: 'Suspension', desc: 'A bike with both front fork and rear shock absorber suspension. Better comfort and traction on rough terrain.' },
    { term: 'Air Fork', category: 'Suspension', desc: 'A suspension fork using air springs. Lighter and adjustable by changing air pressure. Premium option.' },
    { term: 'Coil Fork', category: 'Suspension', desc: 'A suspension fork using metal coil springs. Heavier but simpler and cheaper. Common on budget bikes.' },
    { term: 'Travel', category: 'Suspension', desc: 'The maximum distance a suspension fork or shock can compress. XC: 80-100mm, Trail: 120-140mm, Enduro: 150-170mm, DH: 200mm.' },
    { term: 'Lockout', category: 'Suspension', desc: 'A feature that locks the suspension fork in a rigid position for efficient pedaling on flat/paved surfaces.' },
    { term: '1x Drivetrain', category: 'Drivetrain', desc: 'A single chainring setup at the front (no front derailleur). Simpler, lighter, and reduces chain drops.' },
    { term: '2x Drivetrain', category: 'Drivetrain', desc: 'Two chainrings at the front with a front derailleur. Offers wider gear range but more complexity.' },
    { term: 'Groupset', category: 'Drivetrain', desc: 'The complete collection of gearing and braking components. Shimano tiers: Tourney → Altus → Acera → Alivio → Deore → SLX → XT → XTR.' },
    { term: 'Drop Bar', category: 'Ergonomics', desc: 'Curved handlebar common on road/gravel bikes. Offers multiple hand positions and aerodynamic posture.' },
    { term: 'Flat Bar', category: 'Ergonomics', desc: 'Straight handlebar common on MTBs and hybrids. Provides upright riding position and better control.' },
    { term: 'Riser Bar', category: 'Ergonomics', desc: 'A flat bar with upward sweep at the ends. Common on MTBs for more upright position and leverage.' },
    { term: 'Geometry', category: 'Frame', desc: 'The angles and dimensions of a bike frame that determine handling characteristics (head angle, seat angle, reach, stack).' },
    { term: 'PSI', category: 'Wheels', desc: 'Pounds per Square Inch — tire pressure measurement. Road: 80-130, Hybrid: 50-80, MTB: 20-50 PSI.' },
    { term: 'QR (Quick Release)', category: 'Wheels', desc: 'A lever mechanism to quickly remove wheels without tools. Being replaced by thru-axles on modern bikes.' },
    { term: 'Thru-Axle', category: 'Wheels', desc: 'A bolt-on axle system that provides better stiffness and wheel alignment compared to quick release.' },
];

export default function Glossary() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');

    const categories = ['All', ...new Set(GLOSSARY_DATA.map((g) => g.category))];

    const filtered = GLOSSARY_DATA.filter((g) => {
        const matchSearch = g.term.toLowerCase().includes(search.toLowerCase()) || g.desc.toLowerCase().includes(search.toLowerCase());
        const matchCat = category === 'All' || g.category === category;
        return matchSearch && matchCat;
    });

    return (
        <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
            <div className="container">
                <div className="section-header">
                    <h2>Parts Glossary</h2>
                    <div className="section-line"></div>
                    <p>Learn about bicycle components and terminology</p>
                </div>

                <div className="filters-bar" style={{ marginBottom: '2rem' }}>
                    <div className="filter-group" style={{ flex: 1 }}>
                        <label><FiSearch size={12} /> Search Terms</label>
                        <input className="input" placeholder="Search glossary..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                    <div className="filter-group">
                        <label>Category</label>
                        <select className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
                            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                    {filtered.map((g) => (
                        <div key={g.term} className="glass-card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                    <h3 style={{ fontSize: '1.1rem' }}>{g.term}</h3>
                                    <span className="badge badge-gold">{g.category}</span>
                                </div>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>{g.desc}</p>
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                            <p style={{ color: 'var(--text-muted)' }}>No glossary terms found</p>
                        </div>
                    )}
                </div>
            </div>
            <div style={{ height: '3rem' }} />
        </div>
    );
}
