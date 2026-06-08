import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import CycleCard from '../components/cycle/CycleCard';
import { MOCK_CYCLES, CATEGORIES, BRANDS } from '../utils/constants';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('relevance');

  return (
    <PageLayout>
      <div className="w-full flex justify-center py-16 px-6 bg-[#050505] border-b border-[#141414]">
        <div className="w-full max-w-[800px]">
          <h1 className="font-display text-[48px] text-[#F0F0F0] leading-none mb-6 text-center">SEARCH ALL CYCLES</h1>
          <div className="relative">
            <input 
              autoFocus
              type="text" 
              placeholder="What are you looking for?" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-[#0A0A0A] border-2 border-[#1F1F1F] rounded-lg pl-14 pr-6 py-5 font-display text-[24px] text-[#F0F0F0] focus:outline-none focus:border-[#FFD700] transition-colors placeholder:text-[#333]"
            />
            <div className="absolute left-5 top-1/2 transform -translate-y-1/2 text-[#555]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto w-full px-6 py-12 flex flex-col lg:flex-row gap-8 min-h-[50vh]">
        
        {/* Filter Sidebar */}
        <div className="w-full lg:w-[280px] flex-shrink-0 space-y-8">
          <div>
            <h4 className="font-body text-[11px] text-[#FFD700] uppercase tracking-[2px] mb-4 pb-2 border-b border-[#141414]">Sort By</h4>
            <select 
              value={sort} 
              onChange={(e) => setSort(e.target.value)}
              className="w-full bg-[#080808] border border-[#1F1F1F] rounded p-3 font-body text-[13px] text-[#F0F0F0] focus:outline-none focus:border-[#FFD700]"
            >
              <option value="relevance">Relevance</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="name_asc">Name: A-Z</option>
            </select>
          </div>

          <div>
            <h4 className="font-body text-[11px] text-[#FFD700] uppercase tracking-[2px] mb-4 pb-2 border-b border-[#141414]">Category</h4>
            <div className="space-y-2 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
              {['All Categories', ...CATEGORIES].map((c, i) => (
                <label key={c} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="accent-[#FFD700]" defaultChecked={i===0} />
                  <span className="font-body text-[13px] text-[#AAAAAA] group-hover:text-[#F0F0F0] transition-colors">{c}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body text-[11px] text-[#FFD700] uppercase tracking-[2px] mb-4 pb-2 border-b border-[#141414]">Brands</h4>
            <div className="space-y-2 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
              {BRANDS.map(b => (
                <label key={b} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="accent-[#FFD700]" />
                  <span className="font-body text-[13px] text-[#AAAAAA] group-hover:text-[#F0F0F0] transition-colors">{b}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
             <h4 className="font-body text-[11px] text-[#FFD700] uppercase tracking-[2px] mb-4 pb-2 border-b border-[#141414]">Price Range</h4>
             <div className="flex items-center justify-between gap-4">
               <input type="number" placeholder="Min" className="w-full bg-[#080808] border border-[#1F1F1F] rounded p-2 text-center text-[#F0F0F0] font-mono text-[12px]" />
               <span className="text-[#555]">-</span>
               <input type="number" placeholder="Max" className="w-full bg-[#080808] border border-[#1F1F1F] rounded p-2 text-center text-[#F0F0F0] font-mono text-[12px]" />
             </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="flex-1">
          <div className="mb-6 flex justify-between items-center">
             <span className="font-body text-[13px] text-[#777]">Found <strong className="text-[#FFD700]">{query ? 0 : MOCK_CYCLES.length}</strong> cycles matching your criteria</span>
          </div>

          {!query ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 content-start">
              {MOCK_CYCLES.slice(0, 20).map(c => (
                <CycleCard key={c.id} cycle={c} />
              ))}
            </div>
          ) : (
            <div className="w-full h-[400px] border border-dashed border-[#1A1A1A] rounded flex flex-col items-center justify-center text-center p-6 bg-[#050505]">
              <span className="font-display text-[48px] text-[#222] mb-4">NO EXACT MATCHES</span>
              <p className="font-body text-[13px] text-[#555] uppercase tracking-[2px]">Try adjusting your search query or filters.</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default SearchPage;
