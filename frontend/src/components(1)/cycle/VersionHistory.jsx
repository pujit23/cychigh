import React from 'react';
import { History, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const VersionHistory = ({ versions }) => {
    if (!versions || versions.length === 0) return null;

    return (
        <div className="glass-panel p-6 rounded-xl mt-6">
            <div className="flex items-center gap-3 mb-6">
                <History className="text-brand-gold" size={24} />
                <h3 className="heading-md m-0">Version History</h3>
            </div>
            
            <div className="space-y-6">
                {versions.map((ver, idx) => (
                    <div key={idx} className="relative pl-6 border-l-2 border-brand-gold/30 last:pb-0">
                        <div className="absolute w-3 h-3 bg-brand-gold rounded-full -left-[7.5px] top-1 shadow-[0_0_10px_rgba(255,215,0,0.5)]"></div>
                        <div className="mb-1 flex items-center justify-between">
                            <span className="font-bebas text-xl text-white tracking-widest">{ver.year} Edition</span>
                            <span className="font-dmono text-sm text-brand-gold">{formatCurrency(ver.price_inr)}</span>
                        </div>
                        <ul className="space-y-2 mt-3">
                            {ver.changes.map((change, i) => (
                                <li key={i} className="text-sm font-dsans text-brand-muted flex items-start gap-2">
                                    <ArrowRight size={14} className="mt-1 text-brand-red shrink-0" />
                                    <span>{change}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VersionHistory;
