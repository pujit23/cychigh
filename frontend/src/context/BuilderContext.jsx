import React, { createContext, useContext, useState } from 'react';

const BuilderContext = createContext();

export const BuilderProvider = ({ children }) => {
  const [buildParts, setBuildParts] = useState({});

  const addPart = (category, part) => {
    setBuildParts(prev => ({ ...prev, [category]: part }));
  };

  const removePart = (category) => {
    setBuildParts(prev => {
      const newParts = { ...prev };
      delete newParts[category];
      return newParts;
    });
  };

  const clearBuild = () => {
    setBuildParts({});
  };

  return (
    <BuilderContext.Provider value={{ buildParts, addPart, removePart, clearBuild }}>
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
};
