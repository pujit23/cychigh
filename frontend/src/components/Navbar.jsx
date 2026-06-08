import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FiSearch, FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
    const [q, setQ] = useState('');
    const [open, setOpen] = useState(false);
    const { user, logout, isLoggedIn } = useAuth();
    const nav = useNavigate();
    const loc = useLocation();
    const active = (p) => loc.pathname === p ? 'text-gold' : 'text-gray-400 hover:text-gold';

    const search = (e) => { e.preventDefault(); if (q.trim()) { nav(`/explore?search=${encodeURIComponent(q.trim())}`); setQ(''); setOpen(false); } };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-bee-black/95 backdrop-blur-xl border-b border-bee-border h-[70px] flex items-center px-6">
            {/* P23 Logo */}
            <Link to="/" className="flex items-center gap-3 mr-6">
                <span className="font-heading text-gold text-3xl tracking-[4px] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">P23</span>
                <div className="hidden sm:block border-l border-bee-border pl-3">
                    <span className="font-heading text-xl text-white tracking-wider">CYCHIGH</span>
                    <p className="text-[10px] text-gray-600 -mt-1">Cycle Knowledge Hub</p>
                </div>
            </Link>

            {/* Nav Links */}
            <div className={`${open ? 'flex' : 'hidden'} md:flex flex-col md:flex-row fixed md:static top-[70px] left-0 right-0 bg-bee-black md:bg-transparent z-40 items-center gap-1 p-4 md:p-0 border-b md:border-0 border-bee-border`}>
                {[['/', 'Home'], ['/explore', 'Explore'], ['/compare', 'Compare'], ['/glossary', 'Glossary']].map(([p, l]) => (
                    <Link key={p} to={p} onClick={() => setOpen(false)} className={`${active(p)} px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300`}>{l}</Link>
                ))}
                {isLoggedIn && <Link to="/admin" onClick={() => setOpen(false)} className={`${active('/admin')} px-3 py-2 rounded-lg text-sm font-medium`}>Admin</Link>}
            </div>

            <div className="flex-1" />

            {/* Search */}
            <form onSubmit={search} className="hidden sm:flex items-center gap-2 bg-bee-card border border-bee-border rounded-full px-4 py-2 min-w-[220px]">
                <FiSearch className="text-gray-500" size={14} />
                <input type="text" placeholder="Search cycles..." value={q} onChange={e => setQ(e.target.value)} className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600" />
            </form>

            {/* User Section */}
            {isLoggedIn ? (
                <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
                    <div style={{
                        width: '32px', height: '32px',
                        borderRadius: '50%',
                        background: '#FFD700',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'Bebas Neue, sans-serif',
                        fontSize: '14px',
                        color: '#000',
                        cursor: 'pointer',
                    }}>
                        {user?.username?.[0]?.toUpperCase()}
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            background: 'none',
                            border: '1px solid #333',
                            color: '#555',
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '10px',
                            letterSpacing: '2px',
                            padding: '6px 12px',
                            cursor: 'pointer',
                        }}
                    >
                        LOGOUT
                    </button>
                </div>
            ) : (
                <Link to="/auth" style={{
                    fontFamily: 'Bebas Neue, sans-serif',
                    fontSize: '14px',
                    letterSpacing: '3px',
                    color: '#000',
                    background: '#FFD700',
                    padding: '6px 16px',
                    textDecoration: 'none',
                }}>
                    LOGIN
                </Link>
            )}

            {/* Mobile Toggle */}
            <button onClick={() => setOpen(!open)} className="md:hidden ml-3 text-white text-xl" aria-label="Menu">
                {open ? <FiX /> : <FiMenu />}
            </button>
        </nav>
    );
}
