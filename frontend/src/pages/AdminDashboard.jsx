// ==============================================
// CycHigh — Admin Dashboard
// ==============================================

import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { fetchCycles, deleteCycle } from '../services/api';
import { FiHome, FiList, FiTrash2, FiEdit, FiLogOut } from 'react-icons/fi';
import { MdPedalBike } from 'react-icons/md';

export default function AdminDashboard() {
    const { admin, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cycles, setCycles] = useState([]);
    const [stats, setStats] = useState({ total: 0, brands: 0, categories: 0 });
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [view, setView] = useState('dashboard');

    useEffect(() => {
        if (!admin) { navigate('/admin/login'); return; }
        loadCycles();
    }, [admin, page]);

    const loadCycles = async () => {
        setLoading(true);
        try {
            const res = await fetchCycles({ page, limit: 15 });
            setCycles(res.data.data || []);
            setTotal(res.data.total || 0);
            setStats({ total: res.data.total || 0, brands: new Set((res.data.data || []).map((c) => c.brand)).size, categories: new Set((res.data.data || []).map((c) => c.category)).size });
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Delete "${name}"?`)) return;
        try {
            await deleteCycle(id);
            loadCycles();
        } catch (err) { alert('Failed to delete'); }
    };

    if (!admin) return null;
    const totalPages = Math.ceil(total / 15);

    return (
        <div className="admin-layout">
            <aside className="admin-sidebar">
                <div style={{ marginBottom: '2rem' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Admin Panel</p>
                    <p style={{ fontWeight: 600 }}>{admin.name}</p>
                </div>
                <button className={`admin-sidebar-link ${view === 'dashboard' ? 'active' : ''}`} onClick={() => setView('dashboard')}><FiHome /> Dashboard</button>
                <button className={`admin-sidebar-link ${view === 'cycles' ? 'active' : ''}`} onClick={() => setView('cycles')}><MdPedalBike /> Manage Cycles</button>
                <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
                    <button className="admin-sidebar-link" onClick={() => { logout(); navigate('/'); }}><FiLogOut /> Logout</button>
                </div>
            </aside>

            <div className="admin-content">
                {view === 'dashboard' && (
                    <>
                        <h2 style={{ marginBottom: '1.5rem' }}>Dashboard</h2>
                        <div className="admin-stat-grid">
                            <div className="glass-card admin-stat-card">
                                <div className="stat-value">{stats.total}</div>
                                <div className="stat-name">Total Cycles</div>
                            </div>
                            <div className="glass-card admin-stat-card">
                                <div className="stat-value">{stats.brands}</div>
                                <div className="stat-name">Brands</div>
                            </div>
                            <div className="glass-card admin-stat-card">
                                <div className="stat-value">{stats.categories}</div>
                                <div className="stat-name">Categories</div>
                            </div>
                        </div>
                        <div className="glass-card">
                            <h3 style={{ marginBottom: '1rem' }}>Quick Actions</h3>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <button className="btn btn-primary" onClick={() => setView('cycles')}><FiList /> Manage Cycles</button>
                                <button className="btn btn-outline" onClick={() => navigate('/explore')}>View Site</button>
                            </div>
                        </div>
                    </>
                )}

                {view === 'cycles' && (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2>Manage Cycles ({total})</h2>
                        </div>
                        {loading ? <div className="spinner"></div> : (
                            <div className="glass-card admin-table-wrap">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Brand</th>
                                            <th>Category</th>
                                            <th>Year</th>
                                            <th>Price (INR)</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cycles.map((c) => (
                                            <tr key={c._id}>
                                                <td><a href={`/cycle/${c.slug}`} style={{ color: 'var(--honey-gold)' }}>{c.name}</a></td>
                                                <td>{c.brand}</td>
                                                <td>{c.category}</td>
                                                <td>{c.year}</td>
                                                <td>₹{c.pricing?.entryLevel?.inr || 'N/A'}</td>
                                                <td>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        <button className="btn btn-ghost btn-sm" onClick={() => navigate(`/cycle/${c.slug}`)}><FiEdit size={14} /></button>
                                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id, c.name)}><FiTrash2 size={14} /></button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
                                <button className="btn btn-ghost btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Prev</button>
                                <span style={{ padding: '0.5rem 1rem', color: 'var(--text-muted)' }}>Page {page} of {totalPages}</span>
                                <button className="btn btn-ghost btn-sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next →</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
