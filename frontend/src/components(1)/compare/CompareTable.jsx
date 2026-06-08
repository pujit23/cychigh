import React from 'react';
import { useCompare } from '../../context/CompareContext';
import { Check, Minus } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

const CompareTable = () => {
    const { compareList } = useCompare();

    if (compareList.length === 0) return null;

    const dataRows = [
        { label: "Overview", data: "placeholder_row_header", empty: true },
        { label: "Brand", key: "brand" },
        { label: "Category", key: "category" },
        { label: "Type", key: "type" },
        { label: "Price", fn: (c) => formatCurrency(c.pricing?.street_inr) },
        { label: "Core Specs", data: "placeholder_row_header", empty: true },
        { label: "Frame Material", fn: (c) => c.frame?.material },
        { label: "Weight", fn: (c) => `${c.frame?.weight} kg` },
        { label: "Fork", fn: (c) => `${c.fork?.brand} ${c.fork?.travel !== 'Rigid' ? c.fork?.travel : 'Rigid'}` },
        { label: "Drivetrain", data: "placeholder_row_header", empty: true },
        { label: "Groupset", fn: (c) => c.drivetrain?.groupset },
        { label: "Speeds", fn: (c) => c.drivetrain?.speeds },
        { label: "Brakes", data: "placeholder_row_header", empty: true },
        { label: "Type", fn: (c) => c.brakes?.type },
        { label: "Wheels & Extras", data: "placeholder_row_header", empty: true },
        { label: "Wheel Size", fn: (c) => c.wheels?.size },
        { label: "Tubeless Ready", fn: (c) => c.wheels?.front?.tubelessReady ? <Check size={18} className="text-brand-gold mx-auto" /> : <Minus size={18} className="text-white/30 mx-auto" /> },
        { label: "Dropper Post", fn: (c) => c.cockpit?.dropperPost ? <Check size={18} className="text-brand-gold mx-auto" /> : <Minus size={18} className="text-white/30 mx-auto" /> },
    ];

    return (
        <div className="w-full overflow-x-auto glass-panel rounded-xl custom-scrollbar pb-6 mt-8">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                    <tr>
                        <th className="p-4 w-1/4 border-b border-white/10 bg-black/40 backdrop-blur-md sticky left-0 z-10">
                            <span className="font-bebas text-brand-gold tracking-widest text-xl">Feature</span>
                        </th>
                        {compareList.map(c => (
                            <th key={c.id} className="p-6 border-b border-white/10 w-1/4 bg-black/20 text-center">
                                <img src={c.image} alt={c.name} className="w-full h-32 object-cover rounded-lg mb-3 border border-white/5" />
                                <p className="font-bebas tracking-widest text-brand-gold text-sm m-0">{c.brand}</p>
                                <p className="text-white font-bold text-lg leading-tight">{c.name}</p>
                            </th>
                        ))}
                        {/* Fill empty columns if less than 3 */}
                        {[...Array(3 - compareList.length)].map((_, i) => (
                            <th key={`empty-${i}`} className="p-4 border-b border-white/10 w-1/4 bg-black/10"></th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {dataRows.map((row, idx) => (
                        <tr key={idx} className={`${row.empty ? 'bg-white/5' : 'hover:bg-white/5'} transition-colors group`}>
                            {row.empty ? (
                                <td colSpan={4} className="p-3 pl-6 border-b border-white/10 sticky left-0 z-10 bg-white/5">
                                    <span className="font-bebas tracking-widest text-brand-muted text-lg uppercase">{row.label}</span>
                                </td>
                            ) : (
                                <>
                                    <td className="p-4 pl-6 border-b border-white/10 bg-brand-panel/90 md:bg-transparent backdrop-blur-md sticky left-0 z-10 font-dmono text-xs uppercase tracking-wider text-white/70 group-hover:text-brand-gold transition-colors">
                                        {row.label}
                                    </td>
                                    {compareList.map(c => (
                                        <td key={c.id} className="p-4 border-b border-white/10 text-center font-dsans text-sm text-white/90">
                                            {row.key ? c[row.key] : (row.fn ? row.fn(c) : '-')}
                                        </td>
                                    ))}
                                    {[...Array(3 - compareList.length)].map((_, i) => (
                                        <td key={`empty-td-${i}`} className="p-4 border-b border-white/10"></td>
                                    ))}
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompareTable;
