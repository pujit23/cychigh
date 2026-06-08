import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCycles } from '../../context/CycleContext';
import { BRANDS, CATEGORIES } from '../../utils/constants';

const Sidebar = () => {
  const [search, setSearch] = useState('');
  const [activeBrand, setActiveBrand] = useState('all');
  const { cycles, loading, filters } = useCycles();

  const filteredCycles = cycles.filter(cycle => {
    const brandMatch = activeBrand === 'all' || 
      cycle.brand?.toLowerCase() === 
      activeBrand?.toLowerCase()
    const categoryMatch = filters.category === 'all' || 
      cycle.category?.toLowerCase() === 
      filters.category?.toLowerCase()
    const searchMatch = !search || 
      cycle.name?.toLowerCase().includes(
        search.toLowerCase()) ||
      cycle.brand?.toLowerCase().includes(
        search.toLowerCase()) ||
      cycle.fullName?.toLowerCase().includes(
        search.toLowerCase())
    return brandMatch && categoryMatch && searchMatch
  });

  return (
    <aside className="w-[260px] bg-[#080808] border-r border-[#0D0D0D] flex flex-col h-[calc(100vh-56px)] sticky top-[56px] overflow-y-auto hidden md:flex flex-shrink-0">
      
      {/* 1. SEARCH */}
      <div className="p-4 border-b border-[#0D0D0D]">
        <input 
          type="text" 
          placeholder="SEARCH CYCLES..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-[#050505] border border-[#141414] rounded p-2 text-[11px] font-body text-[#444444] focus:outline-none focus:border-[#FFD700] focus:text-[#F0F0F0] transition-colors placeholder:text-[#444444] transition-all duration-300"
        />
      </div>

      {/* 2. BRANDS */}
      <div className="p-4 border-b border-[#0D0D0D]">
        <h3 className="font-body text-[9px] text-[#333333] uppercase tracking-[3px] mb-3">BRANDS</h3>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveBrand('all')}
            className={`text-[10px] font-body uppercase px-2 py-1 rounded transition-colors border ${activeBrand === 'all' ? 'border-[#FFD700] text-[#FFD700] bg-transparent' : 'border-transparent text-[#555555] bg-transparent hover:text-[#AAAAAA]'}`}
          >
            All
          </button>
          {BRANDS.map(b => (
            <button 
              key={b}
              onClick={() => setActiveBrand(b)}
              className={`text-[10px] font-body uppercase px-2 py-1 rounded transition-colors border ${activeBrand === b ? 'border-[#FFD700] text-[#FFD700] bg-transparent' : 'border-transparent text-[#555555] bg-transparent hover:text-[#AAAAAA]'}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* 3. CATEGORIES */}
      <div className="p-4 border-b border-[#0D0D0D]">
        <h3 className="font-body text-[9px] text-[#333333] uppercase tracking-[3px] mb-3">CATEGORIES</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.slice(0, 7).map(c => (
            <span key={c} className="text-[10px] uppercase font-body text-[#555555] px-2 py-1 rounded border border-transparent hover:border-[#2A2A2A] cursor-pointer transition-colors">
              {c}
            </span>
          ))}
        </div>
      </div>

      {/* 4. CYCLES */}
      <div className="p-4 flex-1">
        <h3 className="font-body text-[9px] text-[#333333] uppercase tracking-[3px] mb-3">CYCLES ({String(filteredCycles.length).padStart(3,'0')}-{String(cycles.length).padStart(3,'0')})</h3>
        <ul className="flex flex-col gap-1">
          {filteredCycles.map((c, i) => (
            <li key={c.id}>
              <Link to={`/cycle/${c.id}`} className="group flex items-center h-[36px] hover:bg-[#0C0C0C] px-2 rounded transition-all duration-200 border-l-[2px] border-transparent hover:border-[#FFD700]">
                <span className="font-mono text-[10px] text-[#333333] w-8">{(i + 1).toString().padStart(3, '0')}</span>
                <span className="font-body text-[12px] text-[#666666] group-hover:text-[#AAAAAA] truncate w-full group-focus:text-[#FFD700]">{c.fullName || c.name}</span>
              </Link>
            </li>
          ))}
          {loading && cycles.length === 0 && (
            <li className="font-body text-[11px] text-[#555555] italic">Loading cycles...</li>
          )}
          {!loading && cycles.length === 0 && (
            <li className="font-body text-[11px] text-[#555555] italic">No cycles available.</li>
          )}
          {!loading && cycles.length > 0 && filteredCycles.length === 0 && (
            <li className="font-body text-[11px] text-[#555555] italic">No cycles match search.</li>
          )}
        </ul>
      </div>

      {/* 5. RECENTLY VIEWED (Placeholder for now) */}
      <div className="p-4 border-t border-[#0D0D0D] bg-[#050505]">
        <h3 className="font-body text-[9px] text-[#333333] uppercase tracking-[3px] mb-2 flex items-center gap-1">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#FFD700]">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          RECENTLY VIEWED
        </h3>
        <p className="text-[10px] text-[#555555] font-body uppercase pl-4">No recent cycles</p>
      </div>
    </aside>
  );
};

export default Sidebar;
