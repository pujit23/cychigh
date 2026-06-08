import React from 'react';

const VersionHistory = ({ versions }) => {
  if (!versions || versions.length === 0) return null;
  
  return (
    <div className="space-y-4">
      {versions.map((v, i) => (
        <div key={i} className="flex gap-4 items-start pb-4 border-b border-[#0D0D0D] last:border-0 last:pb-0">
          <div className="text-gold font-mono text-xs pt-1">{v.year}</div>
          <div className="flex-1 text-sm font-body text-text-secondary">
             <span className="text-white block mb-1">{v.title}</span>
             <p className="text-xs text-[#555]">{v.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VersionHistory;
