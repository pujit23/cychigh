import React from 'react';
import PageLayout from '../components/layout/PageLayout';

const KnowledgePage = () => {
  const articles = [
    { cat: 'BEGINNER', title: 'How to Shift Gears Properly without Dropping the Chain' },
    { cat: 'MAINTENANCE', title: 'The 5-Minute Pre-Ride Safety Check' },
    { cat: 'FITNESS', title: 'Zone 2 Base Training: The Secret to Endurance' },
    { cat: 'BUYING', title: 'Carbon vs Aluminum: Does Frame Material Really Matter?' },
    { cat: 'GEAR', title: 'Clipless Pedals Explained: SPD vs Look Keo vs SPD-SL' },
    { cat: 'NUTRITION', title: 'What to Eat Before, During, and After a Century Ride' },
    { cat: 'MOUNTAIN', title: 'Understanding Suspension Setup: Sag, Rebound, and Compression' },
    { cat: 'SAFETY', title: 'Riding in Traffic: Rules, Hand Signals, and Positioning' },
    { cat: 'TECH', title: 'Electronic vs Mechanical Shifting: Is AXS or Di2 Worth It?' },
    { cat: 'HISTORY', title: 'The Evolution of the Tour de France Bicycles' }
  ];

  return (
    <PageLayout>
      <div className="max-w-[1200px] mx-auto w-full px-6 py-12 min-h-screen">
        <div className="text-center mb-16">
          <h1 className="font-display text-[56px] md:text-[80px] text-[#F0F0F0] leading-none mb-4">KNOWLEDGE BASE</h1>
          <p className="font-body text-[14px] text-[#555] tracking-[2px] uppercase">Master the art and science of cycling</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 border-b border-[#141414] pb-8 mb-12">
          {['ALL', 'BEGINNER', 'MAINTENANCE', 'FITNESS', 'BUYING', 'GEAR', 'MOUNTAIN'].map(tab => (
            <button key={tab} className="font-body text-[10px] text-[#777] hover:text-[#FFD700] hover:border-[#FFD700] uppercase tracking-[2px] px-4 py-2 border border-[#1A1A1A] rounded transition-colors">
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art, i) => (
            <div key={i} className="group bg-[#0C0C0C] border border-[#141414] hover:border-[#FFD700] rounded-lg overflow-hidden transition-colors cursor-pointer flex flex-col h-full">
              <div className="aspect-[16/9] bg-[#050505] flex items-center justify-center border-b border-[#141414] overflow-hidden">
                <div className="w-full h-full bg-[#111] group-hover:bg-[#1A1A1A] transition-colors flex items-center justify-center">
                  <span className="font-display text-[48px] text-[#222] opacity-50">{art.cat}</span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className="inline-block font-body text-[9px] text-[#FFD700] uppercase tracking-[2px] mb-3">{art.cat}</span>
                <h3 className="font-display text-[24px] text-[#F0F0F0] leading-tight mb-4 group-hover:text-[#FFD700] transition-colors">{art.title}</h3>
                <p className="font-body text-[13px] text-[#555] mt-auto">Read Article →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default KnowledgePage;
