import React, { useState, useMemo } from 'react';

// Using simple mock parts data
const MOCK_PARTS = {
  FRAME: [
    { id: 'fr1', brand: 'Trek', model: 'Superfly Carbon', weight: 1.2, cost: 85000, compatible: true },
    { id: 'fr2', brand: 'Specialized', model: 'Allez Sprint', weight: 1.5, cost: 65000, compatible: true },
    { id: 'fr3', brand: 'Giant', model: 'Talon Alloy', weight: 1.9, cost: 25000, compatible: true }
  ],
  FORK: [
    { id: 'fk1', brand: 'Fox', model: '32 Step-Cast Factory', weight: 1.3, cost: 75000, compatible: true },
    { id: 'fk2', brand: 'RockShox', model: 'Reba RL', weight: 1.6, cost: 45000, compatible: true },
    { id: 'fk3', brand: 'SR Suntour', model: 'XCR AIR', weight: 2.2, cost: 18000, compatible: false } // false for demo
  ],
  WHEELS: [
    { id: 'wh1', brand: 'DT Swiss', model: 'XRC 1200 Carbon', weight: 1.4, cost: 115000, compatible: true },
    { id: 'wh2', brand: 'Bontrager', model: 'Kovee Elite 23', weight: 1.7, cost: 55000, compatible: true },
    { id: 'wh3', brand: 'Mavic', model: 'Crossmax', weight: 1.9, cost: 28000, compatible: true }
  ],
  TIRES: [
    { id: 'tr1', brand: 'Maxxis', model: 'Ikon 3C EXO', weight: 0.6, cost: 5500, compatible: true },
    { id: 'tr2', brand: 'Schwalbe', model: 'Racing Ray Addix', weight: 0.65, cost: 6000, compatible: true },
    { id: 'tr3', brand: 'Continental', model: 'Cross King', weight: 0.7, cost: 4500, compatible: true }
  ],
  GROUPSET: [
    { id: 'gs1', brand: 'SRAM', model: 'XX1 Eagle AXS', weight: 1.5, cost: 185000, compatible: true },
    { id: 'gs2', brand: 'Shimano', model: 'XTR M9100', weight: 1.6, cost: 145000, compatible: true },
    { id: 'gs3', brand: 'Shimano', model: 'Deore XT M8100', weight: 1.8, cost: 75000, compatible: true }
  ],
  HANDLEBAR: [
    { id: 'hb1', brand: 'RaceFace', model: 'Next SL Carbon', weight: 0.17, cost: 12000, compatible: true },
    { id: 'hb2', brand: 'Renthal', model: 'Fatbar Lite', weight: 0.27, cost: 7500, compatible: true }
  ],
  SADDLE: [
    { id: 'sd1', brand: 'WTB', model: 'Volt Carbon', weight: 0.15, cost: 14000, compatible: true },
    { id: 'sd2', brand: 'Prologo', model: 'Dimension NDR', weight: 0.21, cost: 9500, compatible: true }
  ],
  PEDALS: [
    { id: 'pd1', brand: 'Shimano', model: 'XTR M9100', weight: 0.31, cost: 12500, compatible: true },
    { id: 'pd2', brand: 'Crankbrothers', model: 'Eggbeater 3', weight: 0.28, cost: 9500, compatible: true },
    { id: 'pd3', brand: 'RaceFace', model: 'Chester Flat', weight: 0.34, cost: 4000, compatible: true }
  ]
};

const CATEGORY_COLORS = {
  FRAME: '#FFD700', FORK: '#DC2626', WHEELS: '#F0F0F0', TIRES: '#555555', 
  GROUPSET: '#997F00', HANDLEBAR: '#B91C1C', SADDLE: '#AAAAAA', PEDALS: '#777777'
};

const BuilderPage = () => {
  const [activeTab, setActiveTab] = useState('FRAME');
  const [buildName, setBuildName] = useState('Dream Build Alpha');
  const [selectedParts, setSelectedParts] = useState({
    FRAME: null, FORK: null, WHEELS: null, TIRES: null,
    GROUPSET: null, HANDLEBAR: null, SADDLE: null, PEDALS: null
  });

  const handleSelectPart = (category, part) => {
    setSelectedParts(prev => ({ ...prev, [category]: part }));
  };

  const removePart = (category) => {
    setSelectedParts(prev => ({ ...prev, [category]: null }));
  };

  const { totalWeight, totalCost, isComplete } = useMemo(() => {
    let w = 0; let c = 0; let completeCount = 0;
    Object.values(selectedParts).forEach(part => {
      if (part) {
        // Multiplier for tires, wheels, and pedals which are typically pairs, though usually sold as sets/pairs.
        // Assuming weight/cost is per required set.
        w += part.weight;
        c += part.cost;
        completeCount++;
      }
    });
    return {
      totalWeight: w.toFixed(2),
      totalCost: c.toLocaleString('en-IN'),
      isComplete: completeCount === Object.keys(selectedParts).length
    };
  }, [selectedParts]);

  // SVG Donut implementation
  const calculateStrokeDasharray = (weight) => {
    if (totalWeight == 0) return `0 100`;
    return `${(weight / totalWeight) * 100} 100`;
  };

  let cumulativeOffset = 0;
  
  return (
    <div className="w-full bg-[#020202] min-h-screen">
      {/* Navbar space filler if fixed, but assuming PageLayout normally handles this. Using standard full page logic here. */}
      
      {/* HEADER */}
      <div className="px-6 py-8 border-b border-[#0D0D0D] bg-[#050505]">
        <h1 className="font-display text-[64px] md:text-[80px] text-[#F0F0F0] leading-none mb-2 tracking-tight">BIKE BUILDER</h1>
        <p className="font-body text-[13px] text-[#444444] uppercase tracking-[3px]">Configure your dream build</p>
      </div>

      {/* 3 COLUMN LAYOUT */}
      <div className="flex flex-col lg:flex-row h-full min-h-[calc(100vh-180px)]">
        
        {/* LEFT COMPONENT SELECTOR (300px) */}
        <div className="w-full lg:w-[320px] bg-[#0A0A0A] border-r border-[#0D0D0D] flex flex-col flex-shrink-0">
          
          {/* TABS (Horizontal scrolling or grid) */}
          <div className="flex overflow-x-auto lg:flex-wrap border-b border-[#141414] custom-scrollbar">
            {Object.keys(MOCK_PARTS).map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex-1 min-w-[100px] lg:w-1/2 py-3 px-2 font-body text-[10px] uppercase tracking-[1px] border-b-2 transition-colors ${activeTab === cat ? 'border-[#FFD700] text-[#FFD700] bg-[#111]' : 'border-transparent text-[#555] hover:text-[#AAAAAA]'}`}
              >
                {cat}
                {selectedParts[cat] && <span className="ml-[4px] text-[#FFD700]">•</span>}
              </button>
            ))}
          </div>

          {/* PARTS LIST */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {MOCK_PARTS[activeTab].map(part => {
              const isSelected = selectedParts[activeTab]?.id === part.id;
              
              return (
                <div 
                  key={part.id}
                  onClick={() => handleSelectPart(activeTab, part)}
                  className={`mb-3 p-4 rounded border transition-colors cursor-pointer group relative overflow-hidden ${isSelected ? 'bg-[#111111] border-[#FFD700]' : 'bg-[#050505] border-[#1F1F1F] hover:border-[#FFD700] hover:bg-[#0A0A0A]'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-body text-[10px] text-[#AAAAAA] uppercase tracking-[1px]">{part.brand}</span>
                    <span className={`w-2 h-2 rounded-full ${part.compatible ? 'bg-[#16B364]' : 'bg-[#DC2626]'}`} title={part.compatible ? 'Compatible' : 'Incompatible Issue'}></span>
                  </div>
                  <h4 className="font-display text-[22px] text-[#F0F0F0] leading-tight mb-4 group-hover:text-[#FFD700] transition-colors">{part.model}</h4>
                  
                  <div className="flex justify-between items-end">
                    <span className="font-mono text-[12px] text-[#555555]">{part.weight} kg</span>
                    <span className="font-mono text-[16px] text-[#FFD700]">₹{part.cost.toLocaleString('en-IN')}</span>
                  </div>

                  {isSelected && (
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#FFD700] flex items-center justify-center rounded-bl-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CENTER BUILD SUMMARY (FLEX 1) */}
        <div className="flex-1 bg-[#020202] p-6 lg:p-12 overflow-y-auto">
          <input 
            type="text" 
            value={buildName}
            onChange={(e) => setBuildName(e.target.value)}
            className="w-full bg-transparent border-none font-display text-[48px] text-[#F0F0F0] focus:outline-none focus:text-[#FFD700] mb-8 border-b border-transparent focus:border-[#2A2A2A] transition-colors"
          />

          <div className="w-full h-[8px] bg-[#111111] rounded-full overflow-hidden mb-8 flex">
            {Object.entries(selectedParts).map(([cat, part]) => {
              if (!part) return null;
              const width = (part.weight / (totalWeight || 1)) * 100;
              return (
                <div 
                  key={cat} 
                  style={{ width: `${width}%`, backgroundColor: CATEGORY_COLORS[cat] }} 
                  className="h-full group relative"
                  title={`${cat}: ${part.weight}kg`}
                ></div>
              );
            })}
          </div>

          <table className="w-full text-left font-body">
            <thead>
              <tr className="border-b border-[#141414] text-[10px] text-[#555] uppercase tracking-[2px]">
                <th className="py-4 font-normal">Category</th>
                <th className="py-4 font-normal">Component</th>
                <th className="py-4 font-normal">Weight</th>
                <th className="py-4 font-normal text-right">Cost</th>
                <th className="py-4 font-normal text-right"></th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(selectedParts).map(([cat, part]) => (
                <tr key={cat} className="border-b border-[#0D0D0D] group hover:bg-[#080808] transition-colors">
                  <td className="py-4 flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: CATEGORY_COLORS[cat] }}></span>
                    <span className="text-[12px] text-[#555555] uppercase tracking-[1px]">{cat}</span>
                  </td>
                  <td className="py-4">
                    {part ? (
                      <div>
                        <span className="text-[12px] text-[#AAAAAA]">{part.brand} </span>
                        <span className="text-[14px] text-[#F0F0F0] font-bold group-hover:text-[#FFD700] transition-colors">{part.model}</span>
                      </div>
                    ) : (
                      <span className="text-[12px] text-[#333333] italic">Not selected</span>
                    )}
                  </td>
                  <td className="py-4 font-mono text-[13px] text-[#777]">{part ? `${part.weight} kg` : '-'}</td>
                  <td className="py-4 font-mono text-[16px] text-[#FFD700] text-right">{part ? `₹${part.cost.toLocaleString('en-IN')}` : '-'}</td>
                  <td className="py-4 text-right">
                    {part && (
                      <button onClick={() => removePart(cat)} className="text-[16px] text-[#333333] hover:text-[#DC2626] transition-colors">×</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Compatibility Warnings Map */}
          {Object.entries(selectedParts).map(([cat, part]) => {
            if (part && !part.compatible) {
              return (
                <div key={cat} className="mt-8 bg-[#DC2626]/10 border border-[#DC2626] p-4 rounded flex items-start gap-4">
                  <span className="text-[#DC2626] mt-0.5">⚠️</span>
                  <div>
                    <h5 className="font-body text-[12px] font-bold text-[#DC2626] uppercase">Compatibility Issue</h5>
                    <p className="font-body text-[12px] text-[#AAAAAA] mt-1">The selected {cat.toLowerCase()} ({part.brand} {part.model}) may not be natively compatible with the current frame standards without adapters.</p>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* RIGHT ACTIONS & STATS (280px) */}
        <div className="w-full lg:w-[280px] bg-[#050505] border-l border-[#0D0D0D] p-6 flex flex-col items-center flex-shrink-0">
          
          <div className="w-[180px] h-[180px] mb-8 relative flex items-center justify-center">
            {/* Simple CSS Donut implementation using SVG */}
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 origin-center drop-shadow-[0_0_15px_rgba(255,215,0,0.1)]">
              {Object.entries(selectedParts).map(([cat, part], i) => {
                if (!part) return null;
                const dasharray = calculateStrokeDasharray(part.weight);
                const strokeColor = CATEGORY_COLORS[cat];
                const circle = (
                  <circle
                    key={cat}
                    cx="18" cy="18" r="15.91549430918954"
                    fill="transparent" stroke={strokeColor} strokeWidth="2"
                    strokeDasharray={dasharray} strokeDashoffset={-cumulativeOffset}
                    className="transition-all duration-500"
                  ></circle>
                );
                cumulativeOffset += (part.weight / totalWeight) * 100;
                return circle;
              })}
              {totalWeight == 0 && (
                 <circle cx="18" cy="18" r="15.91549430918954" fill="transparent" stroke="#111" strokeWidth="1"></circle>
              )}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-body text-[9px] text-[#555] uppercase tracking-[2px] mb-1">TOTAL</span>
              <span className="font-mono text-[32px] text-[#F0F0F0] leading-none">{totalWeight > 0 ? totalWeight : '0.00'}</span>
              <span className="font-body text-[10px] text-[#777] mt-1">kg</span>
            </div>
          </div>

          <div className="w-full flex justify-between items-center bg-[#0C0C0C] border border-[#141414] p-4 rounded mb-8">
            <span className="font-body text-[10px] text-[#555] uppercase tracking-[2px]">Cost</span>
            <span className="font-mono text-[24px] text-[#FFD700]">₹{totalCost}</span>
          </div>

          <div className="w-full mt-auto space-y-3">
            <button 
              className={`w-full py-3 font-display text-[16px] tracking-[3px] uppercase transition-colors ${isComplete ? 'bg-[#FFD700] text-[#000] hover:bg-[#FFE033]' : 'bg-[#1A1A1A] text-[#555] cursor-not-allowed border border-[#2A2A2A]'}`}
            >
              SAVE BUILD
            </button>
            <button className="w-full py-3 border border-[#1F1F1F] text-[#AAAAAA] hover:text-[#F0F0F0] hover:border-[#555] font-display text-[16px] tracking-[3px] uppercase transition-colors">
              SHARE BUILD
            </button>
            <button 
              className="w-full py-3 text-[#DC2626] hover:text-[#F87171] font-display text-[14px] tracking-[3px] uppercase transition-colors"
              onClick={() => setSelectedParts({ FRAME: null, FORK: null, WHEELS: null, TIRES: null, GROUPSET: null, HANDLEBAR: null, SADDLE: null, PEDALS: null })}
            >
              RESET ALL
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BuilderPage;
