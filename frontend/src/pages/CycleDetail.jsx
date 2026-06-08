// ==============================================
// CycHigh — Cycle Detail Page
// ==============================================

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchCycleBySlug } from '../services/api';
import { FiChevronRight, FiHome } from 'react-icons/fi';
import { MdPedalBike } from 'react-icons/md';

const TABS = ['Overview', 'Specifications', 'Wheels & Brakes', 'Drivetrain', 'Ergonomics', 'Pricing', 'Maintenance'];

export default function CycleDetail() {
    const { slug } = useParams();
    const [cycle, setCycle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tab, setTab] = useState('Overview');

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const res = await fetchCycleBySlug(slug);
                setCycle(res.data.data);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, [slug]);

    if (loading) return <div className="loader-page" style={{ paddingTop: 100 }}><div className="spinner"></div></div>;
    if (!cycle) return <div className="loader-page" style={{ paddingTop: 100 }}><p>Cycle not found</p></div>;

    const s = cycle.specs || {};
    const w = cycle.wheels || {};
    const b = cycle.brakes || {};
    const d = cycle.drivetrain || {};
    const e = cycle.ergonomics || {};
    const p = cycle.pricing || {};
    const m = cycle.maintenance || {};
    const o = cycle.overview || {};

    const Spec = ({ label, value }) => value ? (
        <div className="spec-item"><span className="spec-label">{label}</span><span className="spec-value">{value}</span></div>
    ) : null;

    return (
        <div>
            {/* Header */}
            <div className="detail-header">
                <div className="container">
                    <div className="detail-breadcrumb">
                        <Link to="/"><FiHome /></Link> <FiChevronRight size={14} />
                        <Link to="/explore">Explore</Link> <FiChevronRight size={14} />
                        <span>{cycle.name}</span>
                    </div>
                    <div className="detail-title-row">
                        <div>
                            <h1>{cycle.name}</h1>
                            <div className="detail-tags" style={{ marginTop: '0.75rem' }}>
                                <span className="badge badge-gold">{cycle.brand}</span>
                                <span className="badge badge-blue">{cycle.category}</span>
                                {cycle.type === 'motorized' && <span className="badge badge-green">E-Bike</span>}
                                <span className="badge badge-gold">{cycle.year}</span>
                            </div>
                        </div>
                        <div className="detail-price">₹{p.entryLevel?.inr || 'N/A'}</div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
                <div className="detail-tabs">
                    {TABS.map((t) => (
                        <div key={t} className={`detail-tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>{t}</div>
                    ))}
                </div>

                {/* Tab Content */}
                {tab === 'Overview' && (
                    <div>
                        <div className="detail-section">
                            <h3><span className="section-icon">📖</span> Overview</h3>
                            <div className="spec-grid">
                                <Spec label="Full Name" value={o.fullName} />
                                <Spec label="Origin" value={o.origin} />
                                <Spec label="Primary Use" value={o.primaryUse} />
                                <Spec label="Skill Level" value={o.skillLevel} />
                                <Spec label="Terrain Type" value={o.terrainType?.join(', ')} />
                            </div>
                            {o.history && <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{o.history}</p>}
                        </div>
                        {cycle.pros?.length > 0 && (
                            <div className="detail-section">
                                <h3><span className="section-icon">✅</span> Pros</h3>
                                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
                                    {cycle.pros.map((pro, i) => <li key={i} style={{ padding: '0.5rem 1rem', background: 'rgba(46,204,113,0.08)', borderRadius: 8, fontSize: '0.9rem' }}>✓ {pro}</li>)}
                                </ul>
                            </div>
                        )}
                        {cycle.cons?.length > 0 && (
                            <div className="detail-section">
                                <h3><span className="section-icon">⚠️</span> Cons</h3>
                                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.5rem' }}>
                                    {cycle.cons.map((con, i) => <li key={i} style={{ padding: '0.5rem 1rem', background: 'rgba(231,76,60,0.08)', borderRadius: 8, fontSize: '0.9rem' }}>✗ {con}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {tab === 'Specifications' && (
                    <div className="detail-section">
                        <h3><span className="section-icon">⚙️</span> Core Specifications</h3>
                        <div className="spec-grid">
                            <Spec label="Frame Material" value={s.frameMaterial} />
                            <Spec label="Frame Geometry" value={s.frameGeometry} />
                            <Spec label="Suspension" value={s.suspensionType} />
                            <Spec label="Weight" value={s.weight ? `${s.weight.min} – ${s.weight.max} ${s.weight.unit}` : null} />
                            <Spec label="Max Load" value={s.maxLoadCapacity ? `${s.maxLoadCapacity} kg` : null} />
                            <Spec label="Wheel Size" value={s.wheelSize} />
                            <Spec label="Tire Type" value={s.tireType} />
                            <Spec label="Rim Type" value={s.rimType} />
                            <Spec label="Gear Count" value={s.gearCount} />
                            <Spec label="Gear System" value={s.gearSystem} />
                            <Spec label="Drivetrain" value={s.drivetrainType} />
                            <Spec label="Shifter" value={s.shifterType} />
                            <Spec label="Crankset" value={s.crankset} />
                            <Spec label="Bottom Bracket" value={s.bottomBracket} />
                        </div>
                    </div>
                )}

                {tab === 'Wheels & Brakes' && (
                    <div>
                        <div className="detail-section">
                            <h3><span className="section-icon">🛞</span> Wheels</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                {['front', 'rear'].map((side) => w[side] && (
                                    <div key={side} className="glass-card">
                                        <h4 style={{ color: 'var(--honey-gold)', marginBottom: '0.75rem', textTransform: 'capitalize' }}>{side} Wheel</h4>
                                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                                            <Spec label="Size" value={w[side].size} />
                                            <Spec label="PSI" value={w[side].psi} />
                                            <Spec label="Tube Size" value={w[side].tubeSize} />
                                            <Spec label="Rim Diameter" value={w[side].rimDiameter} />
                                            <Spec label="Rim Width" value={w[side].rimWidth} />
                                            <Spec label="Spokes" value={w[side].spokeCount} />
                                            <Spec label="Valve" value={w[side].valveType} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="detail-section">
                            <h3><span className="section-icon">🛑</span> Brakes</h3>
                            <div className="spec-grid">
                                <Spec label="Type" value={b.type} />
                                <Spec label="Front" value={b.front} />
                                <Spec label="Rear" value={b.rear} />
                                <Spec label="Rotor Size" value={b.rotorSize} />
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'Drivetrain' && (
                    <div className="detail-section">
                        <h3><span className="section-icon">⛓️</span> Drivetrain</h3>
                        <div className="spec-grid">
                            <Spec label="Pedal Type" value={d.pedalType} />
                            <Spec label="Crank Arm Length" value={d.crankArmLength} />
                            <Spec label="Chain" value={d.chainStandard} />
                            <Spec label="Cassette/Freewheel" value={d.freewheelOrCassette} />
                            <Spec label="Front Derailleur" value={d.frontDerailleur} />
                            <Spec label="Rear Derailleur" value={d.rearDerailleur} />
                        </div>
                    </div>
                )}

                {tab === 'Ergonomics' && (
                    <div className="detail-section">
                        <h3><span className="section-icon">🪑</span> Ergonomics</h3>
                        <div className="spec-grid">
                            <Spec label="Handlebar Type" value={e.handlebarType} />
                            <Spec label="Handlebar Width" value={e.handlebarWidth} />
                            <Spec label="Saddle" value={e.saddleType} />
                            <Spec label="Seat Height Range" value={e.seatHeightRange} />
                            <Spec label="Riding Posture" value={e.ridingPosture} />
                        </div>
                    </div>
                )}

                {tab === 'Pricing' && (
                    <div className="detail-section">
                        <h3><span className="section-icon">💰</span> Pricing</h3>
                        <div className="spec-grid">
                            <Spec label="Entry Level (INR)" value={p.entryLevel?.inr ? `₹${p.entryLevel.inr}` : null} />
                            <Spec label="Entry Level (USD)" value={p.entryLevel?.usd ? `$${p.entryLevel.usd}` : null} />
                            <Spec label="Mid Range (INR)" value={p.midRange?.inr ? `₹${p.midRange.inr}` : null} />
                            <Spec label="Mid Range (USD)" value={p.midRange?.usd ? `$${p.midRange.usd}` : null} />
                            <Spec label="Premium (INR)" value={p.premium?.inr ? `₹${p.premium.inr}` : null} />
                            <Spec label="Premium (USD)" value={p.premium?.usd ? `$${p.premium.usd}` : null} />
                        </div>
                    </div>
                )}

                {tab === 'Maintenance' && (
                    <div className="detail-section">
                        <h3><span className="section-icon">🔧</span> Maintenance</h3>
                        <div className="spec-grid">
                            <Spec label="Service Interval" value={m.serviceInterval} />
                        </div>
                        {m.commonIssues?.length > 0 && (
                            <div style={{ marginTop: '1rem' }}>
                                <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Common Issues</h4>
                                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                    {m.commonIssues.map((issue, i) => <li key={i}>{issue}</li>)}
                                </ul>
                            </div>
                        )}
                        {m.tasks?.length > 0 && (
                            <div style={{ marginTop: '1rem' }}>
                                <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Maintenance Tasks</h4>
                                <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', color: 'var(--text-secondary)' }}>
                                    {m.tasks.map((task, i) => <li key={i}>{task}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* Who Is It For */}
                {cycle.whoIsItFor && (
                    <div className="detail-section glass-card" style={{ marginTop: '2rem' }}>
                        <h3><span className="section-icon">👤</span> Who Is It For?</h3>
                        <Spec label="Ideal Rider" value={cycle.whoIsItFor.idealRider} />
                        {cycle.whoIsItFor.bestScenarios?.length > 0 && (
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
                                {cycle.whoIsItFor.bestScenarios.map((s, i) => <span key={i} className="badge badge-gold">{s}</span>)}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
