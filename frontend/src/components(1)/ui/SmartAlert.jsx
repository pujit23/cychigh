import React from 'react';
import { Bell, Tag, AlertTriangle } from 'lucide-react';

const SmartAlert = ({ alert }) => {
    const getIcon = () => {
        switch (alert.type) {
            case 'price': return <Tag size={20} className="text-brand-gold" />;
            case 'system': return <Bell size={20} className="text-brand-red" />;
            default: return <AlertTriangle size={20} className="text-white" />;
        }
    };

    return (
        <div className={`p-4 rounded-lg flex items-start gap-4 transition-all ${alert.isRead ? 'bg-white/5 opacity-70' : 'bg-brand-panel border border-brand-gold/20 shadow-lg'}`}>
            <div className="mt-1">
                {getIcon()}
            </div>
            <div>
                <p className="text-white text-sm md:text-base leading-relaxed">{alert.message}</p>
                <div className="text-brand-muted text-xs mt-2 font-dmono">
                    {new Date(alert.createdAt || Date.now()).toLocaleDateString()}
                </div>
            </div>
        </div>
    );
};

export default SmartAlert;
