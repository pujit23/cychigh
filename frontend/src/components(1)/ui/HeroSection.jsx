import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HeroSection = () => {
    return (
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden rounded-3xl mt-4 mx-4 md:mx-auto max-w-7xl">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1532298229144-0ec0c57615c7?q=80&w=2022&auto=format&fit=crop" 
                    alt="Cycling Hero Background" 
                    className="w-full h-full object-cover object-center opacity-70"
                />
            </div>

            {/* Content */}
            <div className="relative z-20 w-full px-8 md:px-16 flex flex-col items-start max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="text-brand-gold font-dmono tracking-widest text-sm mb-4 block inline-block border border-brand-gold/30 px-4 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                        CYCHIGH PLATFORM v2.0
                    </span>
                    <h1 className="font-bebas text-6xl md:text-8xl lg:text-9xl text-white leading-[0.9] tracking-wider uppercase mb-6 drop-shadow-2xl text-shadow-glow">
                        Know Your <br />
                        <span className="text-brand-red">Ride.</span>
                    </h1>
                    <p className="text-brand-muted font-dsans text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
                        The world's most comprehensive cycling knowledge hub. Discover, build, compare, and track over 120 meticulously detailed cycles.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/encyclopedia" className="btn-gold text-lg px-8 py-4 w-full sm:w-auto text-center">
                            Explore Cycles
                        </Link>
                        <Link to="/quiz" className="btn-outline text-lg px-8 py-4 w-full sm:w-auto text-center">
                            Find My Match
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
