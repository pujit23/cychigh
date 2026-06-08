import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center relative p-6 bg-bee-black overflow-hidden">
            <div className="absolute inset-0 bg-hex-grid opacity-30 pointer-events-none" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-bee-black pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative z-10 text-center max-w-lg"
            >
                <div className="text-[120px] font-heading font-bold text-gold opacity-10 leading-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none glitch">
                    404
                </div>

                <div className="text-[120px] filter drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] mb-8 bee-fly inline-block">🐝</div>

                <h1 className="font-heading text-6xl text-gold tracking-widest drop-shadow-[0_0_10px_rgba(255,215,0,0.3)] mb-4">
                    LOST IN THE HIVE
                </h1>

                <p className="font-body text-gray-400 text-lg mb-10">
                    The cycle or page you're searching for does not exist or has been removed from the encyclopedia.
                </p>

                <Link
                    to="/"
                    className="inline-flex bg-gold text-bee-black font-heading text-2xl tracking-widest px-10 py-4 rounded-xl shadow-glow hover:shadow-glow-lg transition-all hover:scale-[1.05]"
                >
                    RETURN TO BASE
                </Link>
            </motion.div>
        </div>
    );
}
