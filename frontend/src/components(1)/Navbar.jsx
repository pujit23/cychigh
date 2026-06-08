import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { pathname } = useLocation();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) setScrolled(true);
            else setScrolled(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [pathname]);

    const navLinks = [
        { name: 'Encyclopedia', path: '/encyclopedia' },
        { name: 'Compare', path: '/compare' },
        { name: 'Builder', path: '/builder' },
        { name: 'Tools', path: '/tools' },
        { name: 'Community', path: '/forum' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 h-[60px] ${scrolled ? 'bg-[#050505]/97 backdrop-blur-md border-b border-brand-gold/15' : 'bg-transparent border-b border-white/5'}`}>
            <div className="max-w-[1440px] mx-auto px-6 h-full flex items-center justify-between">
                
                {/* Logo Area */}
                <Link to="/" className="flex flex-col items-start justify-center pt-1 group transform hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-2 leading-none">
                        <span className="font-bebas text-brand-gold text-2xl tracking-[8px]" style={{ textShadow: "0 0 20px rgba(255,215,0,0.3)" }}>
                            P23
                        </span>
                        <div className="w-[1px] h-4 bg-white/20"></div>
                        <span className="font-bebas text-white text-[22px] tracking-widest leading-none mt-0.5">
                            CYCHIGH
                        </span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-8 translate-y-0.5">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.path}
                            className={`font-bebas text-lg tracking-widest uppercase transition-colors duration-300 hover:text-brand-gold hover:shadow-[0_0_10px_rgba(255,215,0,0.2)] ${pathname.includes(link.path) ? 'text-brand-gold drop-shadow-lg' : 'text-white/80'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth / Profile Desktop */}
                <div className="hidden lg:flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/dashboard" className="text-white hover:text-brand-gold transition-colors flex items-center gap-2 font-dmono text-sm">
                                <div className="w-8 h-8 rounded-full bg-brand-panel border border-brand-gold/30 flex items-center justify-center overflow-hidden shrink-0">
                                    {user.avatar ? <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" /> : <User size={16} className="text-brand-gold" />}
                                </div>
                                <span>{user.username}</span>
                            </Link>
                            {user.isAdmin && (
                                <Link to="/admin" className="text-brand-red text-xs font-dmono uppercase tracking-widest border border-brand-red/30 px-2 py-1 rounded">Admin</Link>
                            )}
                            <button onClick={logout} className="text-brand-muted hover:text-white text-xs font-dmono uppercase">Exit</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/auth" className="text-white/80 hover:text-white font-dmono text-sm uppercase tracking-wider">Login</Link>
                            <Link to="/login" className="btn-gold text-xs py-1.5 px-4">Premium Access</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button 
                    className="lg:hidden text-white/80 hover:text-brand-gold transition-colors focus:outline-none"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden absolute top-[60px] left-0 right-0 bg-[#050505]/95 backdrop-blur-xl border-b border-brand-gold/20 shadow-2xl overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-8 gap-6">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.path}
                                    className={`font-bebas text-3xl tracking-widest uppercase ${pathname.includes(link.path) ? 'text-brand-gold' : 'text-white'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-px bg-white/10 my-2" />
                            {user ? (
                                <>
                                    <Link to="/dashboard" className="font-bebas text-3xl tracking-widest text-brand-gold uppercase">My Garage</Link>
                                    <button onClick={logout} className="font-bebas text-3xl tracking-widest text-brand-red uppercase text-left">Logout</button>
                                </>
                            ) : (
                                <div className="flex flex-col gap-4 mt-2">
                                    <Link to="/auth" className="btn-outline text-center py-3">Standard Login</Link>
                                    <Link to="/login" className="btn-gold text-center py-3">Premium Access</Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
