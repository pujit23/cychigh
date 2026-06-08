import React from 'react';

const LoadingSkeleton = ({ count = 4 }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(count)].map((_, i) => (
                <div key={i} className="glass-panel rounded-lg overflow-hidden animate-pulse">
                    <div className="h-48 bg-white/5 w-full"></div>
                    <div className="p-6">
                        <div className="h-4 bg-brand-gold/30 rounded w-1/3 mb-4"></div>
                        <div className="h-6 bg-white/10 rounded w-2/3 mb-6"></div>
                        <div className="flex justify-between">
                            <div className="h-8 bg-brand-red/20 rounded w-1/4"></div>
                            <div className="h-8 bg-white/10 rounded w-1/4"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;

export const CardSkeleton = () => (
  <div style={{ background:'#111', borderRadius:'4px',
  height:'120px', width:'100%',
  animation:'pulse 1.5s ease infinite' }} />
)

export const CycleDetailSkeleton = () => (
  <div style={{ padding:'48px' }}>
    <div style={{ background:'#111', height:'80px',
    width:'60%', marginBottom:'16px',
    borderRadius:'4px' }} />
    <div style={{ background:'#111', height:'20px',
    width:'40%', marginBottom:'8px',
    borderRadius:'4px' }} />
    <div style={{ background:'#111', height:'20px',
    width:'80%', borderRadius:'4px' }} />
  </div>
)

export const CycleListSkeleton = () => (
  <div>
    {[...Array(8)].map((_, i) => (
      <div key={i} style={{ background:'#111',
      height:'48px', marginBottom:'4px',
      borderRadius:'2px' }} />
    ))}
  </div>
)

export const TableSkeleton = () => (
  <div>
    {[...Array(6)].map((_, i) => (
      <div key={i} style={{ background:'#111',
      height:'44px', marginBottom:'2px',
      borderRadius:'2px' }} />
    ))}
  </div>
)
