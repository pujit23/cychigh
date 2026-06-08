import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-white/5 bg-brand-black pt-16 pb-8">
            <div className="max-w-[1440px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 leading-none mb-6">
                            <span className="font-bebas text-brand-gold text-3xl tracking-[8px]">
                                P23
                            </span>
                            <div className="w-[1px] h-6 bg-white/20"></div>
                            <span className="font-bebas text-white text-[28px] tracking-widest mt-1">
                                CYCHIGH
                            </span>
                        </div>
                        <p className="text-brand-muted font-dsans text-sm leading-relaxed mb-6 max-w-xs">
                            The world's most complete cycling knowledge platform. Discover your perfect ride, build dream setups, and join a passionate community.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-brand-muted hover:text-brand-gold transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-brand-muted hover:text-brand-gold transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-brand-muted hover:text-brand-gold transition-colors"><Github size={20} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bebas text-white tracking-widest text-xl mb-6 uppercase">Platform</h4>
                        <ul className="flex flex-col gap-3 font-dsans text-sm text-brand-muted">
                            <li><Link to="/encyclopedia" className="hover:text-brand-gold transition-colors">Encyclopedia</Link></li>
                            <li><Link to="/compare" className="hover:text-brand-gold transition-colors">Compare Cycles</Link></li>
                            <li><Link to="/builder" className="hover:text-brand-gold transition-colors">Bike Builder</Link></li>
                            <li><Link to="/marketplace" className="hover:text-brand-gold transition-colors">Marketplace</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-bebas text-white tracking-widest text-xl mb-6 uppercase">Tools</h4>
                        <ul className="flex flex-col gap-3 font-dsans text-sm text-brand-muted">
                            <li><Link to="/fit" className="hover:text-brand-gold transition-colors">Bike Fit Calc</Link></li>
                            <li><Link to="/ratio" className="hover:text-brand-gold transition-colors">Gear Ratios</Link></li>
                            <li><Link to="/dictionary" className="hover:text-brand-gold transition-colors">Glossary</Link></li>
                            <li><Link to="/quiz" className="hover:text-brand-gold transition-colors">Rider Quiz</Link></li>
                        </ul>
                    </div>

                    <div className="p-6 border border-brand-gold/10 rounded-xl bg-brand-panel/30">
                        <h4 className="font-bebas text-brand-gold tracking-widest text-xl mb-2 uppercase">Premium Access</h4>
                        <p className="font-dsans text-xs text-brand-muted mb-4 leading-relaxed">Unlock advanced weight simulation, market price tracking, and unlimited garage slots.</p>
                        <Link to="/login" className="btn-outline text-xs py-2 w-full text-center block">Upgrade Now</Link>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-brand-muted text-xs font-dmono tracking-wider">
                        &copy; {new Date().getFullYear()} CycHigh. All rights reserved.
                    </p>
                    <p className="text-white/30 text-xs font-dmono tracking-widest uppercase">
                        Made by <span className="text-brand-red">Pujit Balanthiran</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
