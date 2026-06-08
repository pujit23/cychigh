import React from 'react';
import { formatPrice, formatWeight } from '../../utils/formatters';

const BuilderPart = ({ part, isSelected, onSelect }) => {
  return (
    <button 
      onClick={onSelect}
      className={`text-left p-4 rounded border transition-colors flex flex-col gap-2 h-full focus:outline-none ${isSelected ? 'border-gold bg-[#111]' : 'border-border-subtle bg-bg-dark hover:border-border-mid'}`}
    >
      <div className="font-display text-xl text-white tracking-wide leading-tight">{part.name}</div>
      <div className="flex justify-between w-full mt-auto pt-4 border-t border-[#141414]">
        <span className="font-mono text-gold text-sm">{formatPrice(part.price)}</span>
        <span className="font-mono text-text-muted text-sm">{formatWeight(part.weight)}</span>
      </div>
    </button>
  );
};
export default BuilderPart;
