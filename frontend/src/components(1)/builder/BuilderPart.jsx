import React from 'react';
import { motion } from 'framer-motion';
import { Check, Info } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const BuilderPart = ({ part, isSelected, onSelect }) => {
    return (
        <motion.div 
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelect(part)}
            className={`cursor-pointer p-4 rounded-xl border transition-all ${isSelected ? 'bg-brand-gold/10 border-brand-gold' : 'bg-brand-panel border-white/10 hover:border-white/30'} flex flex-col h-full relative group`}
        >
            <div className="absolute top-3 right-3 text-white/30 group-hover:text-white/50 transition-colors">
                <Info size={16} />
            </div>
            
            <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center font-bebas text-lg text-brand-gold overflow-hidden">
                    {part.image ? <img src={part.image} alt={part.name} className="w-full h-full object-cover" /> : part.name.charAt(0)}
                </div>
                {isSelected && (
                    <div className="bg-brand-gold p-1 rounded-full text-black">
                        <Check size={14} strokeWidth={3} />
                    </div>
                )}
            </div>
            
            <h4 className="font-bebas text-white tracking-widest text-lg mb-1 leading-tight">{part.name}</h4>
            <p className="text-brand-muted font-dsans text-xs mb-4 line-clamp-2 flex-grow">{part.description}</p>
            
            <div className="flex items-end justify-between mt-auto">
                <span className="font-dmono text-xs text-brand-muted">{part.weight}g</span>
                <span className="font-bebas tracking-widest text-brand-gold text-lg">+{formatCurrency(part.price)}</span>
            </div>
        </motion.div>
    );
};

export default BuilderPart;
