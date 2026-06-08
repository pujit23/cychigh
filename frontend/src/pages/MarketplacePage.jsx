import React from 'react';
import PageLayout from '../components/layout/PageLayout';

const MOCK_LISTINGS = [
  { id: 1, title: 'Trek Marlin 7 (2022) - Medium', type: 'Complete Bike', cond: 'Like New', price: '₹45,000', loc: 'Bengaluru', user: 'RiderX', img: 'https://via.placeholder.com/300x200/050505/FFD700?text=Marlin' },
  { id: 2, title: 'Shimano Ultegra R8000 Groupset', type: 'Components', cond: 'Used', price: '₹35,000', loc: 'Mumbai', user: 'Roadie', img: 'https://via.placeholder.com/300x200/050505/FFD700?text=Ultegra' },
  { id: 3, title: 'Fox 32 Float Performance 100mm', type: 'Components', cond: 'Good', price: '₹25,000', loc: 'Pune', user: 'TrailShredder', img: 'https://via.placeholder.com/300x200/050505/FFD700?text=Fox+32' },
  { id: 4, title: 'Specialized Allez E5 (2020)', type: 'Complete Bike', cond: 'Fair', price: '₹38,000', loc: 'Delhi', user: 'CommuterDan', img: 'https://via.placeholder.com/300x200/050505/FFD700?text=Allez' },
  { id: 5, title: 'Bontrager Aeolus Pro 3V Carbon Wheels', type: 'Wheels', cond: 'Like New', price: '₹85,000', loc: 'Chennai', user: 'CarbonKid', img: 'https://via.placeholder.com/300x200/050505/FFD700?text=Aeolus' },
  { id: 6, title: 'Garmin Edge 530', type: 'Accessories', cond: 'Like New', price: '₹18,000', loc: 'Bengaluru', user: 'DataGeek', img: 'https://via.placeholder.com/300x200/050505/FFD700?text=Garmin' }
];

const MarketplacePage = () => {
  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto w-full px-6 py-12 min-h-screen">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 border-b border-[#141414] pb-8 gap-6">
          <div>
            <h1 className="font-display text-[56px] md:text-[80px] text-[#F0F0F0] leading-none mb-2">MARKETPLACE</h1>
            <p className="font-body text-[13px] text-[#555] tracking-[2px] uppercase">Buy and sell gear with fellow riders</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-[#111] border border-[#333] text-[#F0F0F0] px-6 py-3 font-body text-[12px] uppercase tracking-[2px] rounded hover:border-[#FFD700] hover:text-[#FFD700] transition-colors">
              MY LISTINGS
            </button>
            <button className="bg-[#FFD700] text-[#000] px-6 py-3 font-body text-[12px] uppercase tracking-[2px] rounded hover:bg-[#FFE033] transition-colors">
              SELL GEAR +
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <div className="w-full lg:w-[260px] flex-shrink-0 space-y-8">
            <div>
              <input type="text" placeholder="Search Listings..." className="w-full bg-[#050505] border border-[#1F1F1F] rounded p-3 font-body text-[13px] focus:outline-none focus:border-[#FFD700] transition-colors text-[#F0F0F0]" />
            </div>
            
            <div>
              <h4 className="font-body text-[11px] text-[#555] uppercase tracking-[2px] mb-4">Category</h4>
              <div className="space-y-2">
                {['All Categories', 'Complete Bike', 'Frames', 'Wheels', 'Components', 'Accessories'].map((c, i) => (
                  <label key={c} className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="cat" className="accent-[#FFD700]" defaultChecked={i===0} />
                    <span className="font-body text-[13px] text-[#AAAAAA] group-hover:text-[#F0F0F0] transition-colors">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-body text-[11px] text-[#555] uppercase tracking-[2px] mb-4">Condition</h4>
              <div className="space-y-2">
                {['Any Condition', 'New', 'Like New', 'Good', 'Fair', 'For Parts'].map((c, i) => (
                  <label key={c} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="accent-[#FFD700]" defaultChecked={i===0} />
                    <span className="font-body text-[13px] text-[#AAAAAA] group-hover:text-[#F0F0F0] transition-colors">{c}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 align-start content-start">
            {MOCK_LISTINGS.map(list => (
              <div key={list.id} className="bg-[#0C0C0C] border border-[#141414] rounded overflow-hidden group hover:border-[#FFD700] transition-colors cursor-pointer flex flex-col h-full">
                <div className="aspect-[4/3] bg-[#050505] overflow-hidden relative">
                  <img src={list.img} alt={list.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute top-2 right-2">
                    <span className="text-[10px] font-body uppercase px-2 py-1 rounded bg-[#020202]/80 backdrop-blur border text-[#AAAAAA] border-[#2A2A2A]">
                      {list.cond}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <span className="font-body text-[9px] text-[#FFD700] uppercase tracking-[1px] mb-2">{list.type}</span>
                  <h3 className="font-body text-[16px] font-bold text-[#F0F0F0] leading-tight mb-4 group-hover:text-[#FFD700] transition-colors line-clamp-2">{list.title}</h3>
                  <div className="mt-auto flex justify-between items-end border-t border-[#1F1F1F] pt-3">
                    <span className="font-mono text-[20px] text-[#FFD700]">{list.price}</span>
                    <span className="font-body text-[10px] text-[#555] uppercase tracking-[1px]">📍 {list.loc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MarketplacePage;
