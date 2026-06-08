import React from 'react';
import { formatPrice, formatWeight } from '../../utils/formatters';

const BuilderSummary = ({ build, categories, warnings }) => {
  const parts = Object.values(build);
  const totalWeight = parts.reduce((sum, p) => sum + (p ? p.weight : 0), 0);
  const totalPrice = parts.reduce((sum, p) => sum + (p ? p.price : 0), 0);
  const isComplete = categories.every(c => build[c]);

  return (
    <div className="bg-bg-dark border border-border-subtle rounded p-6 sticky top-24">
      <h3 className="font-display text-2xl text-gold mb-6 border-b border-border-soft pb-2">BUILD SUMMARY</h3>
      
      <div className="space-y-4 mb-8">
        {categories.map(cat => (
          <div key={cat} className="flex justify-between text-xs">
            <span className="font-body text-text-muted uppercase tracking-wider">{cat}</span>
            <span className="font-mono text-white truncate max-w-[120px] text-right">{build[cat] ? build[cat].name : '---'}</span>
          </div>
        ))}
      </div>

      <div className="border-t border-border-soft pt-4 mb-4">
        <div className="flex justify-between items-end mb-2">
          <span className="font-body text-text-secondary uppercase tracking-widest text-xs">TOTAL WEIGHT</span>
          <span className="font-mono text-gold text-lg">{formatWeight(totalWeight)}</span>
        </div>
        <div className="flex justify-between items-end">
          <span className="font-body text-text-secondary uppercase tracking-widest text-xs">ESTIMATED COST</span>
          <span className="font-mono text-gold text-2xl">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      <div className="mt-8">
        <button 
          disabled={!isComplete || warnings.length > 0}
          className="w-full font-body font-bold uppercase tracking-widest text-sm py-3 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gold text-[#000] hover:bg-gold-bright focus:outline-none"
        >
          {isComplete ? 'SAVE BUILD' : 'SELECT ALL PARTS'}
        </button>
      </div>
    </div>
  );
};
export default BuilderSummary;
