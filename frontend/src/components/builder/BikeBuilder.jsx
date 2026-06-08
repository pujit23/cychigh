import React, { useState, useEffect } from 'react';
import { useBuilder } from '../../context/BuilderContext';
import BuilderPart from './BuilderPart';
import BuilderSummary from './BuilderSummary';
import PageLayout from '../layout/PageLayout';

const CATEGORIES = ['Frame', 'Wheels', 'Drivetrain', 'Cockpit', 'Brakes'];
const PARTS_DB = {
  Frame: [{ id: 'f1', name: 'Aero Carbon Frame', price: 120000, weight: 950 }, { id: 'f2', name: 'Alloy Endurance', price: 45000, weight: 1400 }],
  Wheels: [{ id: 'w1', name: 'Zipp 404 Firecrest', price: 150000, weight: 1450 }, { id: 'w2', name: 'Mavic Aksium', price: 15000, weight: 1840 }],
  Drivetrain: [{ id: 'd1', name: 'Shimano Ultegra Di2', price: 110000, weight: 2050 }, { id: 'd2', name: 'SRAM Rival eTap', price: 85000, weight: 2200 }],
  Cockpit: [{ id: 'c1', name: 'Integrated Carbon Bar', price: 35000, weight: 320 }, { id: 'c2', name: 'Alloy Drop Bar', price: 5000, weight: 280 }],
  Brakes: [{ id: 'b1', name: 'Hydraulic Disc Flat Mount', price: 25000, weight: 450 }, { id: 'b2', name: 'Rim Brake Dual Pivot', price: 12000, weight: 300 }]
};

const BikeBuilder = () => {
  const { build, setBuild } = useBuilder();
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);
  const [warnings, setWarnings] = useState([]);

  const handleSelect = (category, part) => {
    setBuild({ ...build, [category]: part });
  };

  useEffect(() => {
    const newWarnings = [];
    if (build.Frame?.id === 'f1' && build.Brakes?.id === 'b2') {
      newWarnings.push("Aero Carbon Frame only supports Disc Brakes.");
    }
    setWarnings(newWarnings);
  }, [build]);

  return (
    <PageLayout>
      <div className="p-8 max-w-7xl mx-auto w-full flex flex-col h-full">
        <h1 className="font-display text-5xl text-gold mb-8">CUSTOM BIKE BUILDER</h1>
        <div className="flex flex-col lg:flex-row gap-8 flex-1">
          {/* Column 1: Tabs */}
          <div className="lg:w-1/4 flex flex-col gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-left p-4 uppercase font-body tracking-widest text-sm rounded border transition-colors ${activeTab === cat ? 'bg-gold text-[#000] border-gold font-bold' : 'bg-bg-dark text-text-secondary border-border-soft hover:border-gold'}`}
              >
                {cat}
                {build[cat] && <span className="block text-[10px] mt-1 opacity-80 truncate">{build[cat].name}</span>}
              </button>
            ))}
          </div>

          {/* Column 2: Parts Selection */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            <h2 className="font-display text-3xl text-white mb-4">Select {activeTab}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {PARTS_DB[activeTab].map(part => (
                 <BuilderPart 
                   key={part.id} 
                   part={part} 
                   isSelected={build[activeTab]?.id === part.id}
                   onSelect={() => handleSelect(activeTab, part)}
                 />
               ))}
            </div>
            
            {warnings.length > 0 && (
              <div className="mt-8 p-4 bg-red-ghost border border-red rounded">
                <h4 className="font-display text-red text-xl mb-2">COMPATIBILITY WARNINGS</h4>
                <ul className="list-disc pl-5 font-body text-sm text-white">
                   {warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* Column 3: Summary */}
          <div className="lg:w-1/4">
            <BuilderSummary build={build} categories={CATEGORIES} warnings={warnings} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default BikeBuilder;
