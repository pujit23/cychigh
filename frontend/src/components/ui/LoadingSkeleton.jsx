import React from 'react';

export const CardSkeleton = () => (
  <div className="animate-pulse bg-bg-dark border border-border-subtle rounded flex flex-col h-80 w-full" style={{ padding: '16px', borderRadius: '6px' }}>
    <div className="h-40 bg-bg-elevated w-full mb-4 rounded" style={{ borderRadius: '6px' }} />
    <div className="h-6 bg-bg-elevated w-3/4 mb-2 rounded" style={{ borderRadius: '6px' }} />
    <div className="h-4 bg-bg-elevated w-1/2 rounded" style={{ borderRadius: '6px' }} />
  </div>
);

export const CycleDetailSkeleton = () => (
  <div className="animate-pulse flex flex-col h-screen p-8 bg-bg-deepest">
     <div className="h-64 bg-bg-elevated w-full mb-8 rounded" style={{ borderRadius: '6px' }} />
     <div className="h-10 bg-bg-elevated w-1/3 mb-4 rounded" style={{ borderRadius: '6px' }} />
     <div className="h-6 bg-bg-elevated w-1/4 rounded mb-2" style={{ borderRadius: '6px' }} />
  </div>
);

export const CycleListSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map(i => <CardSkeleton key={i} />)}
  </div>
);

export const TableSkeleton = () => (
  <div className="animate-pulse flex flex-col gap-4">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="h-12 bg-bg-elevated w-full rounded" style={{ borderRadius: '6px' }} />
    ))}
  </div>
);

const LoadingSkeleton = {
  CardSkeleton,
  CycleDetailSkeleton,
  CycleListSkeleton,
  TableSkeleton
};

export default LoadingSkeleton;
