import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="w-full z-20 print-hidden"
                style={{ 
                    background: 'var(--bg-void)', 
                    borderTop: '1px solid var(--border-subtle)', 
                    padding: '40px 48px 32px' 
                }}>
            
            {/* Main Row */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center sm:items-start gap-8 md:gap-0">
                
                {/* Left */}
                <div className="flex flex-col items-center sm:items-start md:flex-1 justify-center md:justify-start">
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', color: 'var(--gold)', letterSpacing: '6px', lineHeight: 1 }}>
                        P 2 3
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--text-ghost)', marginTop: '4px' }}>
                        CycHigh
                    </span>
                </div>

                {/* Center */}
                <div className="flex justify-center md:flex-1 items-center h-full">
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-void)', letterSpacing: '6px', marginTop: '10px' }}>
                        KNOW YOUR RIDE
                    </span>
                </div>

                {/* Right */}
                <div className="flex justify-center md:flex-1 md:justify-end items-center h-full">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-ghost)' }}>
                        Made by Pujit Balanthiran
                    </span>
                </div>

            </div>

            {/* Links Row */}
            <div className="max-w-7xl mx-auto flex justify-center items-center flex-wrap gap-4" style={{ marginTop: '32px' }}>
                <NavLink to="/" className="hover:text-[var(--text-secondary)] transition-colors focus:outline-none" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-ghost)', letterSpacing: '2px' }}>HOME</NavLink>
                <span style={{ color: 'var(--text-void)' }}>·</span>
                <NavLink to="/compare" className="hover:text-[var(--text-secondary)] transition-colors focus:outline-none" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-ghost)', letterSpacing: '2px' }}>COMPARE</NavLink>
                <span style={{ color: 'var(--text-void)' }}>·</span>
                <NavLink to="/glossary" className="hover:text-[var(--text-secondary)] transition-colors focus:outline-none" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-ghost)', letterSpacing: '2px' }}>GLOSSARY</NavLink>
                <span style={{ color: 'var(--text-void)' }}>·</span>
                <NavLink to="/admin" className="hover:text-[var(--text-secondary)] transition-colors focus:outline-none" style={{ fontFamily: 'var(--font-body)', fontSize: '10px', textTransform: 'uppercase', color: 'var(--text-ghost)', letterSpacing: '2px' }}>ADMIN</NavLink>
            </div>

            {/* Bottom Line */}
            <div className="max-w-7xl mx-auto text-center" style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-ghost)' }}>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--text-void)' }}>
                    © 2025 CycHigh. All rights reserved.
                </span>
            </div>

        </footer>
    );
}
