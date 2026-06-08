import React from 'react';

const SpecRow = ({ label, value }) => {
    if (!value || value === "N/A" || value === "None") return null;

    return (
        <div className="flex flex-col sm:flex-row py-3 sm:py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors px-2 rounded-lg">
            <span className="text-brand-muted font-dsans text-sm sm:w-1/3 mb-1 sm:mb-0 uppercase tracking-widest">{label}</span>
            <span className="text-white font-dsans sm:w-2/3 text-right sm:text-left">{value}</span>
        </div>
    );
};

export default SpecRow;
