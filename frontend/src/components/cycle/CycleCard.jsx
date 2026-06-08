import React from 'react';
import { Link } from 'react-router-dom';

const CycleCard = ({ cycle }) => {
  return (
    <div className="flex flex-col bg-[#0C0C0C] border border-[#0D0D0D] rounded-md overflow-hidden hover:border-[#1F1F1F] hover:bg-[#111111] transition-all duration-300 group">
      
      {/* Image Container */}
      <div className="w-full aspect-video bg-[#050505] relative border-b border-[#0D0D0D] overflow-hidden">
        <img 
          src={cycle.image} 
          alt={cycle.fullName} 
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          onError={(e) => { e.target.src = "https://via.placeholder.com/600x400/050505/FFD700?text=" + cycle.name }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="text-[9px] font-body uppercase border border-[#FFD700] text-[#FFD700] bg-[#020202]/80 backdrop-blur px-2 py-1 rounded">
            {cycle.brand}
          </span>
          <span className="text-[9px] font-body uppercase bg-[#1A1A1A] text-[#AAAAAA] px-2 py-1 rounded border border-[#2A2A2A]">
            {cycle.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-[24px] text-[#F0F0F0] leading-tight mb-1 group-hover:text-[#FFD700] transition-colors">{cycle.name}</h3>
        <p className="font-body text-[11px] text-[#555555] mb-4">{cycle.type}</p>
        
        {/* Specs Mini */}
        <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 mt-auto">
          <div className="flex justify-between items-center border-b border-[#141414] pb-1">
            <span className="font-body text-[10px] text-[#444444]">Groupset</span>
            <span className="font-mono text-[10px] text-[#AAAAAA] truncate max-w-[80px]" title={cycle.groupset}>{cycle.groupset}</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#141414] pb-1">
            <span className="font-body text-[10px] text-[#444444]">Frame</span>
            <span className="font-mono text-[10px] text-[#AAAAAA]">{cycle.frame}</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#141414] pb-1">
            <span className="font-body text-[10px] text-[#444444]">Brakes</span>
            <span className="font-mono text-[10px] text-[#AAAAAA] truncate max-w-[80px]" title={cycle.brakes}>{cycle.brakes.split(' ')[0]}</span>
          </div>
          <div className="flex justify-between items-center border-b border-[#141414] pb-1">
            <span className="font-body text-[10px] text-[#444444]">Gears</span>
            <span className="font-mono text-[10px] text-[#AAAAAA]">{cycle.speeds}s</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-auto">
          <span className="font-mono text-[16px] text-[#FFD700]">{cycle.price_inr}</span>
          <Link to={`/cycle/${cycle.id}`} className="font-body text-[10px] text-[#AAAAAA] group-hover:text-[#FFD700] uppercase tracking-[1px] transition-colors">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CycleCard;
