import React from 'react';

const PartsBadge = ({ label }) => (
  <span className="inline-block bg-[#111] border border-[#222] text-text-secondary font-mono text-[10px] px-2 py-1 rounded uppercase tracking-wider">
    {label}
  </span>
);

export default PartsBadge;
