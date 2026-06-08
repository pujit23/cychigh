import React from 'react';
import Sidebar from './Sidebar';

const PageLayout = ({ children }) => (
  <div className="flex bg-bg-deepest min-h-[calc(100vh-56px)]">
    <Sidebar />
    <div className="flex-1 flex flex-col w-full overflow-hidden">
      {children}
    </div>
  </div>
);

export default PageLayout;
