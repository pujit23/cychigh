import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-bg-deepest flex flex-col items-center justify-center p-6 relative overflow-hidden bg-noise">

            {/* Massive Ghost Text Background */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none"
            >
                <span className="font-heading text-[240px] md:text-[360px] lg:text-[480px] text-[#0F0F0F] leading-none m-0">404</span>
            </motion.div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="font-body text-[12px] md:text-[14px] uppercase tracking-[0.4em] text-text-muted mb-8 text-center pt-10">
                    SYSTEM ERROR: TELEMETRY NOT FOUND
                </h1>

                <Link
                    to="/"
                    className="font-body text-[13px] text-gold hover:text-text-primary transition-colors uppercase tracking-widest border border-gold/20 hover:border-gold/50 px-6 py-3 bg-[rgba(255,215,0,0.02)]"
                >
                    ← Return to Dashboard
                </Link>
            </div>

        </div>
    );
}
