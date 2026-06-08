import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/formatters';

const CycleSpotlight = ({ cycle }) => {
    if (!cycle) return null;

    return (
        <div className="relative overflow-hidden rounded-2xl glass-panel group">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent z-10" />
            
            <motion.img 
                src={cycle.image} 
                alt={cycle.name}
                className="w-full h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <span className="text-brand-red font-bebas tracking-widest text-sm mb-2 block">{cycle.category}</span>
                    <h2 className="heading-lg m-0">{cycle.brand} {cycle.name}</h2>
                    <p className="text-brand-gold font-dmono mt-2">{formatCurrency(cycle.pricing?.street_inr)} <span className="text-brand-muted text-sm line-through ml-2">{formatCurrency(cycle.pricing?.mrp_inr)}</span></p>
                </div>
                
                <Link to={`/cycle/${cycle.id}`} className="btn-gold flex items-center gap-2">
                    View Details <ArrowRight size={18} />
                </Link>
            </div>
            
            <div className="absolute top-4 right-4 z-20">
                <span className="bg-black/60 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1 font-dmono rounded-full">
                    {cycle.type}
                </span>
            </div>
        </div>
    );
};

export default CycleSpotlight;
