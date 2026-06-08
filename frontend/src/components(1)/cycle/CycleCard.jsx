import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Scale, ShieldAlert } from 'lucide-react';
import { useCycles } from '../../context/CycleContext';
import { useCompare } from '../../context/CompareContext';
import { formatCurrency } from '../../utils/formatters';

const CycleCard = ({ cycle }) => {
    const { favorites, toggleFavorite } = useCycles();
    const { compareList, addToCompare, removeFromCompare } = useCompare();

    const isFav = favorites.includes(cycle.id);
    const isCompare = compareList.find(c => c.id === cycle.id);

    const handleCompareToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isCompare) removeFromCompare(cycle.id);
        else addToCompare(cycle);
    };

    const handleFavToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(cycle.id);
    };

    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="glass-panel rounded-xl overflow-hidden group flex flex-col h-full relative"
        >
            {/* Action Buttons Overlay */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                    onClick={handleFavToggle}
                    className={`p-2 rounded-full backdrop-blur-md border ${isFav ? 'bg-brand-red/20 border-brand-red text-brand-red' : 'bg-black/50 border-white/20 text-white hover:border-brand-red hover:text-brand-red'} transition-colors`}
                    title="Toggle Garage"
                >
                    <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                </button>
                <button 
                    onClick={handleCompareToggle}
                    className={`p-2 rounded-full backdrop-blur-md border ${isCompare ? 'bg-brand-gold/20 border-brand-gold text-brand-gold' : 'bg-black/50 border-white/20 text-white hover:border-brand-gold hover:text-brand-gold'} transition-colors`}
                    title="Toggle Compare"
                >
                    <Scale size={18} />
                </button>
            </div>

            <Link to={`/cycle/${cycle.id}`} className="block flex-grow flex flex-col">
                <div className="relative h-56 overflow-hidden bg-white/5">
                    <img 
                        src={cycle.image} 
                        alt={cycle.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=2070&auto=format&fit=crop";
                        }}
                    />
                    <div className="absolute bottom-3 left-3 flex gap-2">
                        {cycle.tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="bg-black/70 backdrop-blur-sm border border-white/10 text-white text-[10px] uppercase tracking-wider px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-brand-gold font-bebas tracking-widest text-sm">{cycle.brand}</span>
                        <span className="text-brand-muted font-dmono text-xs">{cycle.year}</span>
                    </div>
                    
                    <h3 className="font-bebas text-2xl text-white tracking-widest mb-1 truncate">{cycle.name}</h3>
                    <p className="text-brand-muted font-dsans text-sm mb-4 line-clamp-2 flex-grow">{cycle.overview.idealFor}</p>
                    
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
                        <div>
                            <p className="text-xs text-brand-muted font-dmono uppercase tracking-wider mb-1">Street Price</p>
                            <p className="text-white font-bebas text-2xl tracking-wider">{formatCurrency(cycle.pricing.street_inr)}</p>
                        </div>
                        <div className="text-right">
                            <span className="font-dmono text-xs text-brand-muted block">{cycle.frame.weight} kg</span>
                            <span className="font-dmono text-[10px] text-brand-red uppercase">{cycle.category}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default CycleCard;
