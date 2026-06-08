import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';

const MOCK_ROUTES = [
  { id: 1, title: 'Manali to Leh Highway', type: 'LONG', location: 'Himachal/Ladakh', dist: '470 km', elev: '11,000 m', diff: 'EPIC', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=Manali-Leh' },
  { id: 2, title: 'Nandi Hills Climb', type: 'ROAD', location: 'Karnataka', dist: '40 km', elev: '400 m', diff: 'MEDIUM', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=Nandi+Hills' },
  { id: 3, title: 'Turahalli Forest Trails', type: 'MTB', location: 'Bengaluru', dist: '15 km', elev: '250 m', diff: 'MEDIUM', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=Turahalli' },
  { id: 4, title: 'Marine Drive Loop', type: 'BEGINNER', location: 'Mumbai', dist: '20 km', elev: '20 m', diff: 'EASY', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=Marine+Drive' },
  { id: 5, title: 'ECR Chennai to Mahabalipuram', type: 'ROAD', location: 'Tamil Nadu', dist: '100 km', elev: '50 m', diff: 'MEDIUM', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=ECR+Ride' },
  { id: 6, title: 'Spiti Valley Circuit', type: 'LONG', location: 'Himachal', dist: '500 km', elev: '8,000 m', diff: 'EPIC', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=Spiti+Circuit' },
  { id: 7, title: 'Sanjay Gandhi National Park', type: 'MTB', location: 'Mumbai', dist: '18 km', elev: '150 m', diff: 'MEDIUM', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=SGNP' },
  { id: 8, title: 'Lavasa Climb', type: 'ROAD', location: 'Maharashtra', dist: '60 km', elev: '800 m', diff: 'HARD', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=Lavasa' },
  { id: 9, title: 'Aravali Trail Network', type: 'MTB', location: 'NCR', dist: '25 km', elev: '300 m', diff: 'HARD', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=Aravali' },
  { id: 10, title: 'Cubbon Park Sunday Ride', type: 'BEGINNER', location: 'Bengaluru', dist: '10 km', elev: '10 m', diff: 'EASY', img: 'https://via.placeholder.com/600x400/050505/FFD700?text=Cubbon+Park' }
];

const RoutesPage = () => {
  const [filter, setFilter] = useState('ALL');
  
  const filtered = MOCK_ROUTES.filter(r => filter === 'ALL' || r.type === filter);

  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto w-full px-6 py-12 min-h-screen">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="text-center md:text-left">
            <h1 className="font-display text-[56px] md:text-[80px] text-[#F0F0F0] leading-none">ROUTES</h1>
            <p className="font-body text-[13px] text-[#555] tracking-[2px] uppercase mt-2">Curated rides across India</p>
          </div>
          
          <div className="flex overflow-x-auto w-full md:w-auto custom-scrollbar bg-[#080808] border border-[#141414] rounded p-1">
            {['ALL', 'BEGINNER', 'ROAD', 'MTB', 'LONG'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 font-body text-[11px] uppercase tracking-[1px] rounded transition-colors ${filter === f ? 'bg-[#1A1A1A] text-[#FFD700]' : 'text-[#777] hover:bg-[#111] hover:text-[#AAAAAA]'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(r => (
            <div key={r.id} className="bg-[#0C0C0C] border border-[#141414] rounded overflow-hidden group hover:border-[#FFD700] transition-colors cursor-pointer flex flex-col h-full">
              <div className="aspect-[4/3] bg-[#050505] overflow-hidden relative">
                <img src={r.img} alt={r.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className={`text-[9px] font-body uppercase px-2 py-1 rounded bg-[#020202]/80 backdrop-blur border ${r.diff === 'EASY' ? 'text-[#16B364] border-[#16B364]' : r.diff === 'MEDIUM' ? 'text-[#FFD700] border-[#FFD700]' : 'text-[#DC2626] border-[#DC2626]'}`}>
                    {r.diff}
                  </span>
                  <span className="text-[9px] font-body uppercase px-2 py-1 rounded bg-[#1A1A1A]/80 backdrop-blur text-[#AAAAAA] border border-[#2A2A2A]">
                    {r.type}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <p className="font-body text-[10px] text-[#777] uppercase tracking-[1px] mb-2">📍 {r.location}</p>
                <h3 className="font-display text-[28px] text-[#F0F0F0] leading-none mb-6 group-hover:text-[#FFD700] transition-colors">{r.title}</h3>
                
                <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-[#1F1F1F]">
                  <div>
                    <span className="font-body text-[9px] text-[#555] uppercase tracking-[2px] block mb-1">Distance</span>
                    <span className="font-mono text-[16px] text-[#F0F0F0]">{r.dist}</span>
                  </div>
                  <div>
                    <span className="font-body text-[9px] text-[#555] uppercase tracking-[2px] block mb-1">Elevation</span>
                    <span className="font-mono text-[16px] text-[#AAAAAA]">{r.elev}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default RoutesPage;
