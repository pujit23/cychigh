import React from 'react';
import { Link } from 'react-router-dom';

const QuizResults = ({ results, onRetake }) => {
  return (
    <div className="w-full min-h-[calc(100vh-56px)] bg-[#020202] py-16 px-6">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-[56px] md:text-[72px] text-[#F0F0F0] leading-none mb-4">YOUR PERFECT MATCHES</h2>
          <p className="font-body text-[14px] text-[#555555] tracking-[1px]">Based on your 5 answers, here are your recommended cycles.</p>
        </div>

        <div className="space-y-6">
          {results.map((cycle, index) => (
            <div key={cycle.id} className={`relative bg-[#0C0C0C] border ${index === 0 ? 'border-l-[3px] border-l-[#FFD700] border-[#1F1F1F]' : 'border-[#1F1F1F]'} rounded p-6 overflow-hidden flex flex-col md:flex-row gap-8 items-center md:items-start group hover:bg-[#111111] hover:border-[#2A2A2A] transition-all`}>
              
              {/* Giant Background Number */}
              <div className="font-display text-[120px] text-[#111111] absolute top-1/2 left-4 transform -translate-y-1/2 select-none pointer-events-none z-0">
                 {'0' + (index + 1)}
              </div>

              <div className="relative z-10 w-full md:w-1/3 aspect-[4/3] bg-[#050505] rounded border border-[#141414] overflow-hidden flex-shrink-0">
                <img src={cycle.image} alt={cycle.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/050505/FFD700?text=" + cycle.name }} />
              </div>

              <div className="relative z-10 flex-1 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[9px] font-body uppercase border border-[#FFD700] text-[#FFD700] px-2 py-0.5 rounded">{cycle.brand}</span>
                    <span className="text-[9px] font-body uppercase bg-[#1A1A1A] text-[#AAAAAA] px-2 py-0.5 rounded border border-[#2A2A2A]">{cycle.category}</span>
                  </div>
                  <h3 className="font-display text-[28px] text-[#F0F0F0] leading-none">{cycle.name}</h3>
                  <div className="flex gap-4 items-end mt-4">
                    <div className="flex flex-col">
                      <span className="font-body text-[9px] text-[#555] uppercase tracking-[2px] mb-1">Match</span>
                      <span className="font-mono text-[24px] text-[#FFD700] leading-none">{cycle.matchScore}%</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-body text-[9px] text-[#555] uppercase tracking-[2px] mb-1">Price</span>
                      <span className="font-mono text-[20px] text-[#AAAAAA] leading-none">{cycle.price_inr}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-[#1F1F1F] pt-4 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                  <p className="font-body text-[12px] text-[#666666] max-w-[300px] leading-relaxed">
                    Perfect match for your {cycle.category.toLowerCase()} needs. Excellent fit for your declared budget and experience level.
                  </p>
                  <Link to={`/cycle/${cycle.id}`} className="font-body text-[11px] text-[#FFD700] uppercase tracking-[2px] hover:text-[#FFE033] flex items-center gap-2 whitespace-nowrap">
                    VIEW SPECS <span>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16 pb-16 border-b border-[#0D0D0D]">
          <button 
            onClick={onRetake}
            className="border border-[#1F1F1F] text-[#AAAAAA] hover:text-[#F0F0F0] hover:border-[#555] px-8 py-3 font-display text-[16px] tracking-[3px] transition-colors duration-200 uppercase w-full md:w-auto"
          >
            RETAKE QUIZ
          </button>
          <Link 
            to="/" 
            className="bg-[#222222] text-[#F0F0F0] hover:bg-[#333333] px-8 py-3 font-display text-[16px] tracking-[3px] transition-colors duration-200 uppercase w-full md:w-auto text-center"
          >
            BROWSE ALL CYCLES
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
