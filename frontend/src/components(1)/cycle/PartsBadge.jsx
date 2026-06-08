import React from 'react';
import { motion } from 'framer-motion';

const PartsBadge = ({ text, type = 'default' }) => {
    let bg = 'bg-brand-panel border-white/10 text-white';
    if (type === 'premium') bg = 'bg-brand-panel border-brand-gold text-brand-gold';
    if (type === 'alert') bg = 'bg-brand-red/10 border-brand-red text-brand-red';

    return (
        <motion.span 
            whileHover={{ scale: 1.05 }}
            className={`inline-block px-3 py-1 border rounded-full text-xs font-dmono uppercase tracking-wider ${bg} shadow-sm backdrop-blur-sm`}
        >
            {text}
        </motion.span>
    );
};

export default PartsBadge;
