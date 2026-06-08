import React from 'react';
import CycleCard from '../cycle/CycleCard';

const CycleSpotlight = ({ cycles }) => {
  if (!cycles || cycles.length === 0) return null;
  return (
    <div className="mb-16">
      <div className="mb-8 border-b border-border-subtle pb-4">
        <h2 className="font-display text-4xl text-text-primary">SPOTLIGHT</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cycles.map(c => <CycleCard key={c.id} cycle={c} />)}
      </div>
    </div>
  );
};
export default CycleSpotlight;
