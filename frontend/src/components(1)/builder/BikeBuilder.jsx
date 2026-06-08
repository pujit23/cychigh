import React, { useState } from 'react';
import BuilderPart from './BuilderPart';
import BuilderSummary from './BuilderSummary';
import { useBuilder } from '../../context/BuilderContext';
import { motion, AnimatePresence } from 'framer-motion';

// Mock DB of parts for the builder
const partsDatabase = {
    frame: [
        { id: 'f1', name: 'Carbon Aero Road', price: 120000, weight: 1100, description: 'Aggressive aero carbon frame.', type: 'Road', wheelSize: '700c' },
        { id: 'f2', name: 'Enduro AL-MTB', price: 85000, weight: 3200, description: 'Tough aluminum full suspension.', type: 'Mountain', wheelSize: '29in' },
        { id: 'f3', name: 'Gravel Titanium', price: 150000, weight: 1800, description: 'Versatile titanium gravel frame.', type: 'Gravel', wheelSize: '700c' },
    ],
    wheels: [
        { id: 'w1', name: 'Zipp 404 Firecrest', price: 200000, weight: 1450, description: 'Deep section aero carbon wheels.', size: '700c' },
        { id: 'w2', name: 'DT Swiss EX1700', price: 70000, weight: 1850, description: 'Bombproof alloy enduro wheelset.', size: '29in' },
    ],
    drivetrain: [
        { id: 'd1', name: 'Shimano Ultegra Di2', price: 210000, weight: 2400, description: '12-speed electronic road shifting.', gears: 12 },
        { id: 'd2', name: 'SRAM GX Eagle AXS', price: 95000, weight: 1900, description: 'Wireless 12-speed MTB shifting.', gears: 12 },
    ]
};

const categories = [
    { id: 'frame', label: 'Frameset' },
    { id: 'wheels', label: 'Wheelset' },
    { id: 'drivetrain', label: 'Drivetrain' }
];

const BikeBuilder = () => {
    const { build, updatePart } = useBuilder();
    const [activeTab, setActiveTab] = useState('frame');

    return (
        <div className="flex flex-col lg:flex-row gap-8 min-h-[70vh]">
            <div className="w-full lg:w-2/3 flex flex-col">
                
                {/* Tabs */}
                <div className="flex overflow-x-auto custom-scrollbar gap-2 mb-8 bg-black/40 p-2 rounded-xl border border-white/5">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`px-6 py-3 font-bebas tracking-widest text-lg rounded-lg transition-all whitespace-nowrap ${activeTab === cat.id ? 'bg-brand-gold text-black' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Parts Grid */}
                <div className="flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {(partsDatabase[activeTab] || []).map(part => (
                                <BuilderPart 
                                    key={part.id} 
                                    part={part} 
                                    isSelected={build[activeTab]?.id === part.id}
                                    onSelect={(p) => updatePart(activeTab, p)}
                                />
                            ))}
                            {(!partsDatabase[activeTab] || partsDatabase[activeTab].length === 0) && (
                                <div className="col-span-full py-12 text-center text-brand-muted border border-dashed border-white/10 rounded-xl">
                                    Parts catalog updating...
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <div className="w-full lg:w-1/3">
                <BuilderSummary />
            </div>
        </div>
    );
};

export default BikeBuilder;
