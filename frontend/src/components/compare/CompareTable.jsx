import React from 'react';

const CompareTable = ({ cycle1, cycle2 }) => {
  if (!cycle1 || !cycle2) return null;

  const renderRow = (label, val1, val2, comparison = 'none') => {
    // Basic comparison coloring logic
    let c1Color = '#AAAAAA';
    let c2Color = '#AAAAAA';
    
    if (comparison !== 'none' && val1 !== val2) {
      if (comparison === 'lower-better') {
        const v1 = parseFloat('0' + String(val1).replace(/[^\d.]/g, ''));
        const v2 = parseFloat('0' + String(val2).replace(/[^\d.]/g, ''));
        if (v1 < v2) { c1Color = '#FFD700'; c2Color = '#DC2626'; }
        else if (v2 < v1) { c2Color = '#FFD700'; c1Color = '#DC2626'; }
      } else if (comparison === 'higher-better') {
        const v1 = parseFloat('0' + String(val1).replace(/[^\d.]/g, ''));
        const v2 = parseFloat('0' + String(val2).replace(/[^\d.]/g, ''));
        if (v1 > v2) { c1Color = '#FFD700'; c2Color = '#DC2626'; }
        else if (v2 > v1) { c2Color = '#FFD700'; c1Color = '#DC2626'; }
      }
    }

    if (val1 === val2) {
      c1Color = '#555555';
      c2Color = '#555555';
    }

    return (
      <div className="grid grid-cols-3 border-b border-[#0D0D0D] py-3 px-4 hover:bg-[#0A0A0A] transition-colors group items-center">
        <div className="font-body text-[11px] text-[#555555] uppercase tracking-[1px]">{label}</div>
        <div className="font-mono text-[12px] md:text-[14px] px-2 text-center truncate" style={{ color: c1Color }} title={val1}>{val1}</div>
        <div className="font-mono text-[12px] md:text-[14px] px-2 text-center border-l border-[#141414] truncate" style={{ color: c2Color }} title={val2}>{val2}</div>
      </div>
    );
  };

  const GroupHeader = ({ title }) => (
    <div className="bg-[#111111] border-y border-[#1F1F1F] py-2 px-4 mt-6 first:mt-0 font-body text-[10px] text-[#F0F0F0] uppercase tracking-[4px]">
      {title}
    </div>
  );

  return (
    <div className="mt-16 border border-[#1F1F1F] bg-[#050505] rounded-lg overflow-hidden relative">
      <button className="absolute top-[-36px] right-0 font-body text-[10px] text-[#555] hover:text-[#FFD700] uppercase tracking-[2px]">
        EXPORT PDF 🖨
      </button>

      {/* Sticky Header */}
      <div className="grid grid-cols-3 bg-[#0C0C0C] border-b-2 border-[#1f1f1f] sticky top-[56px] z-20 py-4 px-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        <div className="font-display text-[24px] text-[#333] flex items-center">VS</div>
        <div className="font-display text-[20px] md:text-[28px] text-[#F0F0F0] text-center leading-none px-2 truncate leading-tight">{cycle1.name}</div>
        <div className="font-display text-[20px] md:text-[28px] text-[#F0F0F0] text-center leading-none px-2 border-l border-[#1F1F1F] truncate leading-tight">{cycle2.name}</div>
      </div>

      <div className="pb-8">
        <GroupHeader title="IDENTITY" />
        {renderRow('Name', cycle1.name, cycle2.name)}
        {renderRow('Brand', cycle1.brand, cycle2.brand)}
        {renderRow('Year', '2024', '2024')}
        {renderRow('Type', cycle1.type, cycle2.type)}
        {renderRow('Weight', cycle1.weight, cycle2.weight, 'lower-better')}

        <GroupHeader title="FRAME" />
        {renderRow('Material', cycle1.frame, cycle2.frame)}
        {renderRow('Geometry', 'Aggressive', 'Relaxed')}
        {renderRow('Sizes', 'S, M, L, XL', 'XS, S, M, L')}

        <GroupHeader title="WHEELS" />
        {renderRow('Size', cycle1.wheelSize, cycle2.wheelSize)}
        {renderRow('Tire Size', cycle1.wheelSize, cycle2.wheelSize)}
        {renderRow('Tubeless', 'Ready', 'Compatible')}

        <GroupHeader title="DRIVETRAIN" />
        {renderRow('Groupset', cycle1.groupset, cycle2.groupset)}
        {renderRow('Speeds', cycle1.speeds, cycle2.speeds, 'higher-better')}
        {renderRow('Derailleur', cycle1.groupset, cycle2.groupset)}

        <GroupHeader title="BRAKES" />
        {renderRow('Type', cycle1.brakes, cycle2.brakes)}
        {renderRow('Rotor Size', '160mm', '160mm')}

        <GroupHeader title="COCKPIT" />
        {renderRow('Handlebar', cycle1.category === 'MTB' ? '720mm' : '420mm', cycle2.category === 'MTB' ? '720mm' : '420mm')}
        {renderRow('Stem', '80mm', '90mm')}
        {renderRow('Seatpost', '27.2mm Alloy', '27.2mm Carbon')}

        <GroupHeader title="PRICE" />
        {renderRow('MRP INR', cycle1.price_inr, cycle2.price_inr, 'lower-better')}
        {renderRow('Street Price', `~${cycle1.price_inr}`, `~${cycle2.price_inr}`, 'lower-better')}
      </div>
    </div>
  );
};

export default CompareTable;
