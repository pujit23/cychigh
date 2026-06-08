import React, { useEffect, useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import CycleCard from '../components/cycle/CycleCard';
import HeroSection from '../components/layout/HeroSection';
import { MOCK_CYCLES, BRANDS } from '../utils/constants';
import { Link } from 'react-router-dom';

const Home = () => {
  const [recentCycles, setRecentCycles] = useState([]);
  const spotlightCycle = MOCK_CYCLES[11]; // Randomly picking index 11 as spotlight
  const featuredCycles = MOCK_CYCLES.slice(0, 12);

  return (
    <PageLayout>
      {/* SECTION 1 — HERO */}
      <HeroSection />

      <div className="max-w-6xl mx-auto w-full px-8 py-16 space-y-24">
        
        {/* SECTION 2 — CYCLE SPOTLIGHT */}
        <section>
          <h2 className="font-body text-[9px] text-[#333333] uppercase tracking-[3px] mb-6">TODAY'S SPOTLIGHT</h2>
          <div className="bg-[#0C0C0C] border border-[#0D0D0D] rounded-md p-6 flex flex-col md:flex-row gap-8 items-center group hover:border-[#1F1F1F] transition-all duration-300">
            <div className="w-full md:w-1/2 aspect-[4/3] bg-[#080808] rounded flex items-center justify-center border border-[#141414] overflow-hidden">
               <img src={spotlightCycle.image} alt={spotlightCycle.fullName} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/111111/FFD700?text=" + spotlightCycle.name }} />
            </div>
            <div className="flex-1 flex flex-col">
              <span className="text-[10px] font-body uppercase border border-[#FFD700] text-[#FFD700] px-2 py-1 rounded w-fit mb-4">{spotlightCycle.brand}</span>
              <h3 className="font-display text-[48px] text-[#F0F0F0] leading-none mb-2">{spotlightCycle.name}</h3>
              <p className="font-body text-[14px] text-[#555555] mb-6">{spotlightCycle.category} • {spotlightCycle.type}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <p className="font-body text-[10px] text-[#444444] uppercase mb-1">Frame</p>
                  <p className="font-mono text-[13px] text-[#AAAAAA]">{spotlightCycle.frame}</p>
                </div>
                <div>
                  <p className="font-body text-[10px] text-[#444444] uppercase mb-1">Groupset</p>
                  <p className="font-mono text-[13px] text-[#AAAAAA]">{spotlightCycle.groupset}</p>
                </div>
                <div>
                  <p className="font-body text-[10px] text-[#444444] uppercase mb-1">Weight</p>
                  <p className="font-mono text-[13px] text-[#AAAAAA]">{spotlightCycle.weight}</p>
                </div>
              </div>
              
              <div className="mt-auto flex items-center justify-between border-t border-[#141414] pt-6">
                <span className="font-mono text-[24px] text-[#FFD700]">{spotlightCycle.price_inr}</span>
                <Link to={`/cycle/${spotlightCycle.id}`} className="font-body text-[12px] text-[#FFD700] tracking-[2px] uppercase hover:text-[#FFE033] flex items-center gap-2">
                  EXPLORE <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — RECENTLY VIEWED */}
        {recentCycles.length > 0 && (
          <section>
            <h2 className="font-body text-[9px] text-[#333333] uppercase tracking-[3px] mb-6">RECENTLY VIEWED</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
              {recentCycles.map(cycle => (
                <div key={cycle.id} className="min-w-[280px]">
                  <CycleCard cycle={cycle} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4 — BROWSE BY BRAND */}
        <section>
          <h2 className="font-body text-[9px] text-[#333333] uppercase tracking-[3px] mb-6">BROWSE BY BRAND</h2>
          <div className="flex flex-wrap gap-3">
            {BRANDS.map(brand => (
              <div key={brand} className="bg-[#0C0C0C] border border-[#141414] hover:border-[#FFD700] hover:bg-[#111111] px-6 py-4 rounded-md cursor-pointer transition-all duration-200 flex items-center justify-center min-w-[120px]">
                <span className="font-display text-[20px] text-[#777777] uppercase tracking-wider">{brand}</span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5 — FEATURED CYCLES GRID */}
        <section id="featured">
          <h2 className="font-body text-[9px] text-[#333333] uppercase tracking-[3px] mb-6">FEATURED CYCLES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCycles.map(cycle => (
              <CycleCard key={cycle.id} cycle={cycle} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <button className="font-body text-[12px] text-[#FFD700] tracking-[2px] uppercase hover:text-[#FFE033] flex items-center justify-center mx-auto gap-2">
              VIEW ALL 120 CYCLES <span>→</span>
            </button>
          </div>
        </section>

      </div>
    </PageLayout>
  );
};

export default Home;
