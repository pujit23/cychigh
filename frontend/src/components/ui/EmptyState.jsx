import React from 'react';
import { Bike } from 'lucide-react';

const EmptyState = ({ message = "No items found", subMessage, icon: Icon = Bike }) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center glass-panel rounded-xl my-8">
            <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center mb-6 gold-glow">
                <Icon size={40} className="text-brand-gold" />
            </div>
            <h3 className="heading-md mb-2">{message}</h3>
            {subMessage && <p className="text-brand-muted max-w-md">{subMessage}</p>}
        </div>
    );
};

export default EmptyState;
