// ==============================================
// CycHigh — Compare Page
// ==============================================

import { useState, useEffect } from 'react';
import { fetchCycles, fetchCycleBySlug } from '../services/api';
import { FiX, FiPlus } from 'react-icons/fi';

export default function Compare() {
    const [allCycles, setAllCycles] = useState([]);
    const [selected, setSelected] = useState([]);
    const [compared, setCompared] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchCycles({ limit: 200 }).then((r) => setAllCycles(r.data.data || [])).catch(console.error);
    }, []);

    const addCycle = async (slug) => {
        if (selected.length >= 4 || selected.includes(slug)) return;
        setLoading(true);
        try {
            const res = await fetchCycleBySlug(slug);
            setSelected([...selected, slug]);
            setCompared([...compared, res.data.data]);
        } catch (err) { console.error(err); }
        setLoading(false);
        setSearchTerm('');
    };

    const removeCycle = (slug) => {
        setSelected(selected.filter((s) => s !== slug));
        setCompared(compared.filter((c) => c.slug !== slug));
    };

    const filtered = allCycles.filter((c) =>
        !selected.includes(c.slug) && c.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 8);

    const rows = [
        ['Brand', (c) => c.brand],
        ['Category', (c) => c.category],
        ['Year', (c) => c.year],
        ['Frame', (c) => c.specs?.frameMaterial],
        ['Suspension', (c) => c.specs?.suspensionType],
        ['Weight', (c) => c.specs?.weight ? `${c.specs.weight.min}-${c.specs.weight.max} ${c.specs.weight.unit}` : 'N/A'],
        ['Wheel Size', (c) => c.specs?.wheelSize],
        ['Tires', (c) => c.specs?.tireType],
        ['Gear System', (c) => c.specs?.gearSystem],
        ['Gear Count', (c) => c.specs?.gearCount],
        ['Brakes', (c) => c.brakes?.type],
        ['Front Brake', (c) => c.brakes?.front],
        ['Rotor Size', (c) => c.brakes?.rotorSize],
        ['Handlebar', (c) => c.ergonomics?.handlebarType],
        ['Saddle', (c) => c.ergonomics?.saddleType],
        ['Posture', (c) => c.ergonomics?.ridingPosture],
        ['Price (INR)', (c) => c.pricing?.entryLevel?.inr ? `₹${c.pricing.entryLevel.inr}` : 'N/A'],
        ['Price (USD)', (c) => c.pricing?.entryLevel?.usd ? `$${c.pricing.entryLevel.usd}` : 'N/A'],
    ];

    return (
        <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
            <div className="container">
                <div className="section-header">
                    <h2>Compare Cycles</h2>
                    <div className="section-line"></div>
                    <p>Select up to 4 cycles to compare side-by-side</p>
                </div>

                {/* Add Cycle */}
                {selected.length < 4 && (
                    <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                            <FiPlus style={{ color: 'var(--honey-gold)' }} />
                            <h4 style={{ fontSize: '1rem' }}>Add a Cycle ({4 - selected.length} slots remaining)</h4>
                        </div>
                        <input className="input" placeholder="Type to search cycles..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        {searchTerm && (
                            <div style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {filtered.map((c) => (
                                    <button key={c.slug} className="btn btn-ghost btn-sm" onClick={() => addCycle(c.slug)}>
                                        {c.name} – {c.brand}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Selected Tags */}
                {compared.length > 0 && (
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                        {compared.map((c) => (
                            <span key={c.slug} className="badge badge-gold" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
                                {c.name}
                                <FiX size={14} style={{ cursor: 'pointer' }} onClick={() => removeCycle(c.slug)} />
                            </span>
                        ))}
                    </div>
                )}

                {/* Comparison Table */}
                {compared.length >= 2 ? (
                    <div className="compare-table-wrap glass-card" style={{ padding: '0.5rem' }}>
                        <table className="compare-table">
                            <thead>
                                <tr>
                                    <th>Specification</th>
                                    {compared.map((c) => <th key={c.slug}>{c.name}</th>)}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map(([label, fn]) => (
                                    <tr key={label}>
                                        <td>{label}</td>
                                        {compared.map((c) => <td key={c.slug}>{fn(c) || '—'}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : compared.length === 1 ? (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Add at least one more cycle to compare</p>
                    </div>
                ) : (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>Start by searching and adding cycles above</p>
                    </div>
                )}
            </div>
            <div style={{ height: '3rem' }} />
        </div>
    );
}
