import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import CycleCard from '../components/cycle/CycleCard';
import { MOCK_CYCLES } from '../utils/constants';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('SAVED');
  
  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto w-full px-6 py-12 min-h-screen">
        
        {/* Profile Header */}
        <div className="bg-[#080808] border border-[#141414] rounded-lg p-8 mb-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700] opacity-[0.03] blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="w-32 h-32 rounded-full border-[3px] border-[#FFD700] bg-[#111] flex items-center justify-center text-[48px] font-display text-[#FFD700] flex-shrink-0 shadow-[0_0_30px_rgba(255,215,0,0.15)]">
            PB
          </div>
          
          <div className="flex-1 text-center md:text-left z-10">
            <h1 className="font-display text-[48px] text-[#F0F0F0] leading-none mb-2">Pujit Balanthiran</h1>
            <p className="font-body text-[14px] text-[#AAAAAA] mb-6 tracking-[1px]">Member since Oct 2024 • Pro Rider</p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <span className="bg-[#111] border border-[#1F1F1F] px-4 py-2 rounded font-body text-[11px] uppercase tracking-[2px] text-[#F0F0F0]">
                1,240 <span className="text-[#777]">KM RIDDEN</span>
              </span>
              <span className="bg-[#111] border border-[#1F1F1F] px-4 py-2 rounded font-body text-[11px] uppercase tracking-[2px] text-[#F0F0F0]">
                12 <span className="text-[#777]">BUILDS</span>
              </span>
              <span className="bg-[#111] border border-[#1F1F1F] px-4 py-2 rounded font-body text-[11px] uppercase tracking-[2px] text-[#F0F0F0]">
                56 <span className="text-[#777]">POSTS</span>
              </span>
            </div>
          </div>
          
          <button className="md:ml-auto bg-transparent border border-[#333] hover:border-[#FFD700] hover:text-[#FFD700] text-[#777] px-6 py-3 font-body text-[11px] uppercase tracking-[2px] rounded transition-colors z-10 w-full md:w-auto">
            EDIT PROFILE
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-[#141414] mb-8 overflow-x-auto custom-scrollbar">
          {['SAVED', 'BUILDS', 'RIDES', 'POSTS', 'SETTINGS'].map(tab => (
             <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-6 font-body text-[11px] uppercase tracking-[2px] border-b-2 transition-colors whitespace-nowrap ${activeTab === tab ? 'border-[#FFD700] text-[#FFD700]' : 'border-transparent text-[#555] hover:text-[#AAAAAA]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {activeTab === 'SAVED' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {MOCK_CYCLES.slice(0, 4).map(cycle => (
              <CycleCard key={cycle.id} cycle={cycle} />
            ))}
          </div>
        )}
        
        {activeTab !== 'SAVED' && (
          <div className="h-[400px] border border-dashed border-[#1A1A1A] rounded flex flex-col items-center justify-center text-center p-6">
            <span className="font-display text-[48px] text-[#222] mb-4">NO DATA</span>
            <p className="font-body text-[13px] text-[#555] uppercase tracking-[2px]">You don't have any {activeTab.toLowerCase()} yet.</p>
            {activeTab === 'BUILDS' && (
              <button className="mt-6 bg-[#FFD700] text-[#000] px-6 py-3 font-body text-[11px] uppercase tracking-[2px] rounded hover:bg-[#FFE033] transition-colors">START A BUILD</button>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProfilePage;
