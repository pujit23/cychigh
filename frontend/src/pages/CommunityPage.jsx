import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';

const MOCK_POSTS = [
  { id: 1, author: 'RiderX', avatar: 'RX', type: 'BUILDS', time: '2h ago', content: 'Just finished upgrading my Marlin 7 with a RockShox Recon and Maxxis Ikons. Dropped 600g and the grip is insane now!', image: true, likes: 24, comments: 8 },
  { id: 2, author: 'SpeedDemon', avatar: 'SD', type: 'ADVICE', time: '5h ago', content: 'What is the ideal tire pressure for 700x28c tubeless on rough Indian tarmac? Currently running 70psi but feels a bit harsh.', image: false, likes: 12, comments: 15 },
  { id: 3, author: 'TrailBlazer', avatar: 'TB', type: 'ROUTES', time: '1d ago', content: 'Found an amazing new 40km gravel loop near Nandi Hills. 80% unpaved, zero traffic. GPX file in comments!', image: true, likes: 56, comments: 12 }
];

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState('ALL');

  return (
    <PageLayout>
      <div className="max-w-[800px] mx-auto w-full px-6 py-12 min-h-screen">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="font-display text-[56px] text-[#F0F0F0] leading-none">COMMUNITY</h1>
            <p className="font-body text-[13px] text-[#555] tracking-[2px] uppercase mt-2">Connecting Riders Across India</p>
          </div>
          <button className="bg-[#FFD700] text-[#000] px-6 py-3 font-body text-[12px] uppercase tracking-[2px] rounded hover:bg-[#FFE033] transition-colors">
            CREATE POST +
          </button>
        </div>

        <div className="flex gap-4 border-b border-[#141414] mb-8 overflow-x-auto custom-scrollbar">
          {['ALL', 'BUILDS', 'ADVICE', 'ROUTES'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 font-body text-[11px] uppercase tracking-[2px] border-b-2 transition-colors ${activeTab === tab ? 'border-[#FFD700] text-[#FFD700]' : 'border-transparent text-[#555] hover:text-[#AAAAAA]'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          {MOCK_POSTS.filter(p => activeTab === 'ALL' || p.type === activeTab).map(post => (
            <div key={post.id} className="bg-[#0C0C0C] border border-[#141414] rounded-lg p-6 hover:border-[#1F1F1F] transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#111] border border-[#FFD700] flex items-center justify-center text-[#FFD700] font-display text-[16px]">{post.avatar}</div>
                  <div>
                    <h4 className="font-body text-[14px] text-[#F0F0F0]">{post.author}</h4>
                    <span className="font-body text-[10px] text-[#555] uppercase tracking-[1px]">{post.time}</span>
                  </div>
                </div>
                <span className="text-[9px] border border-[#333] text-[#777] px-2 py-1 rounded uppercase tracking-[1px]">{post.type}</span>
              </div>
              
              <p className="font-body text-[14px] text-[#AAAAAA] leading-relaxed mb-4">{post.content}</p>
              
              {post.image && (
                 <div className="w-full h-[250px] bg-[#050505] rounded mb-4 border border-[#141414] flex items-center justify-center">
                   <span className="font-body text-[10px] text-[#444] tracking-[2px] uppercase">Attached Media</span>
                 </div>
              )}

              <div className="flex items-center gap-6 border-t border-[#141414] pt-4 mt-2">
                <button className="flex items-center gap-2 text-[#777] hover:text-[#FFD700] transition-colors">
                  <span className="text-[16px]">▲</span> <span className="font-mono text-[12px]">{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-[#777] hover:text-[#F0F0F0] transition-colors font-body text-[12px]">
                  💬 {post.comments} Comments
                </button>
                <button className="ml-auto flex items-center gap-2 text-[#555] hover:text-[#F0F0F0] transition-colors font-body text-[12px] uppercase tracking-[1px]">
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default CommunityPage;
