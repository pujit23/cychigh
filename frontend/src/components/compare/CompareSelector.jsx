import React, { useState } from 'react';
import { MOCK_CYCLES } from '../../utils/constants';

const CompareSelector = ({ selectedCycle, onSelect, onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredCycles = MOCK_CYCLES.filter(c => 
    c.fullName.toLowerCase().includes(search.toLowerCase())
  ).slice(0, 10);

  if (selectedCycle) {
    return (
      <div className="bg-[#0C0C0C] border border-[#1F1F1F] rounded-md p-6 relative flex flex-col h-full group hover:border-[#FFD700] transition-colors">
        <button 
          onClick={onRemove}
          className="absolute top-4 right-4 text-[#333333] hover:text-[#DC2626] font-body text-[10px] uppercase tracking-[2px] transition-colors flex items-center gap-1"
        >
          <span className="text-[14px]">×</span> REMOVE
        </button>
        
        <div className="w-full aspect-video bg-[#050505] rounded border border-[#141414] mb-4 overflow-hidden flex items-center justify-center">
          <img src={selectedCycle.image} alt={selectedCycle.name} className="w-full h-full object-cover opacity-80" onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/050505/FFD700?text=" + selectedCycle.name }} />
        </div>
        
        <div className="flex flex-col flex-1">
          <span className="inline-block text-[9px] font-body uppercase border border-[#FFD700] text-[#FFD700] px-2 py-0.5 rounded w-fit mb-2">
            {selectedCycle.brand}
          </span>
          <h3 className="font-display text-[32px] md:text-[40px] text-[#F0F0F0] leading-none mb-4">{selectedCycle.name}</h3>
          
          <div className="mt-auto pt-4 border-t border-[#141414]">
            <span className="font-mono text-[24px] text-[#FFD700]">{selectedCycle.price_inr}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] border border-dashed border-[#1F1F1F] rounded-md p-6 h-full flex flex-col items-center justify-center min-h-[300px] relative transition-colors hover:border-[#FFD700]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-full h-full flex flex-col items-center justify-center group"
        >
          <div className="w-16 h-16 rounded-full bg-[#0C0C0C] flex items-center justify-center mb-4 group-hover:bg-[#111] transition-colors border border-[#141414]">
            <span className="font-mono text-[32px] text-[#222222] group-hover:text-[#FFD700]">+</span>
          </div>
          <span className="font-body text-[11px] text-[#333333] uppercase tracking-[3px] group-hover:text-[#AAAAAA]">SELECT A CYCLE</span>
        </button>
      ) : (
        <div className="w-full h-full flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-[#141414] pb-2">
            <input 
              autoFocus
              type="text" 
              placeholder="Search cycles..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none text-[13px] font-body text-[#F0F0F0] focus:outline-none w-full placeholder:text-[#333]"
            />
            <button onClick={() => setIsOpen(false)} className="text-[#555] hover:text-[#FFD700]">×</button>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1 max-h-[250px]">
            {filteredCycles.map(c => (
              <button 
                key={c.id} 
                onClick={() => onSelect(c)}
                className="flex flex-col items-start p-2 hover:bg-[#111111] rounded text-left border-l-2 border-transparent hover:border-[#FFD700] transition-colors"
              >
                <span className="font-body text-[12px] text-[#AAAAAA]">{c.fullName}</span>
                <span className="font-mono text-[10px] text-[#555555]">{c.price_inr}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareSelector;
