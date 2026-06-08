// ==============================================
// CycHigh — Explore Page (Browse All Cycles)
// ==============================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CycleCard from '../components/CycleCard';
import { fetchCycles } from '../services/api';
import { FiSearch, FiFilter } from 'react-icons/fi';

const BRANDS = ['All', 'Trek', 'Giant', 'Specialized', 'Cannondale', 'Scott', 'Merida', 'Marin', 'Polygon', 'Btwin', 'Canyon', 'Bianchi', 'Cube', 'Hero', 'Hercules', 'Firefox', 'Montra'];
const CATEGORIES = ['All', 'Mountain Bike', 'Road Bike', 'Hybrid Bike', 'Gravel Bike', 'Electric Bike'];
const SORTS = [
    { label: 'Newest', value: '-createdAt' },
    { label: 'Name A-Z', value: 'name' },
    { label: 'Name Z-A', value: '-name' },
    { label: 'Brand A-Z', value: 'brand' },
];

export default function Explore() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [cycles, setCycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [brand, setBrand] = useState(searchParams.get('brand') || 'All');
    const [category, setCategory] = useState(searchParams.get('category') || 'All');
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [sort, setSort] = useState('-createdAt');

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const params = { page, limit: 12, sort };
                if (brand !== 'All') params.brand = brand;
                if (category !== 'All') params.category = category;
                if (search) params.search = search;
                const res = await fetchCycles(params);
                setCycles(res.data.data || []);
                setTotal(res.data.total || 0);
            } catch (err) { console.error(err); }
            setLoading(false);
        };
        load();
    }, [page, brand, category, search, sort]);

    const totalPages = Math.ceil(total / 12);

    return (
        <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
            <div className="container">
                <div className="section-header" style={{ marginBottom: '1.5rem' }}>
                    <h2>Explore Cycles</h2>
                    <div className="section-line"></div>
                    <p>Browse our collection of {total} cycles</p>
                </div>

                {/* Filters */}
                <div className="filters-bar" id="filters">
                    <div className="filter-group" style={{ flex: 1, minWidth: 200 }}>
                        <label><FiSearch size={12} /> Search</label>
                        <input className="input" placeholder="Search by name..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
                    </div>
                    <div className="filter-group">
                        <label><FiFilter size={12} /> Brand</label>
                        <select className="select" value={brand} onChange={(e) => { setBrand(e.target.value); setPage(1); }}>
                            {BRANDS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Category</label>
                        <select className="select" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
                            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Sort</label>
                        <select className="select" value={sort} onChange={(e) => setSort(e.target.value)}>
                            {SORTS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="loader-page"><div className="spinner"></div></div>
                ) : cycles.length === 0 ? (
                    <div className="loader-page"><p>No cycles found. Try adjusting your filters.</p></div>
                ) : (
                    <>
                        <div className="cycle-grid">{cycles.map((c) => <CycleCard key={c._id || c.slug} cycle={c} />)}</div>
                        {totalPages > 1 && (
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                                <button className="btn btn-ghost btn-sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>← Prev</button>
                                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => (
                                    <button key={i + 1} className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                                ))}
                                <button className="btn btn-ghost btn-sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Next →</button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <div style={{ height: '3rem' }} />
        </div>
    );
}
