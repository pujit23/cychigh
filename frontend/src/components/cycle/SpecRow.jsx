import React from 'react';

const SpecRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-[#0D0D0D] hover:bg-[#080808] transition-colors px-2 last:border-0 last:pb-0">
    <span className="font-body text-[12px] text-[#777777]">{label}</span>
    <span className="font-mono text-[13px] text-gold">{value}</span>
  </div>
);

export default SpecRow;
