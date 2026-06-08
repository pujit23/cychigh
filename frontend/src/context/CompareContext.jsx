import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState([]);

  const addToCompare = (cycle) => {
    if (compareList.length >= 2) {
      toast.error('You can only compare up to 2 cycles at a time.', {
        style: {
          background: '#DC2626',
          color: '#fff',
          borderRadius: '4px',
          fontFamily: 'DM Mono'
        }
      });
      return;
    }
    if (compareList.find(c => c.id === cycle.id)) {
      toast('Cycle already in compare list', {
        style: {
          background: '#1F1F1F',
          color: '#FFD700',
          borderRadius: '4px',
          fontFamily: 'DM Mono'
        }
      });
      return;
    }
    
    setCompareList(prev => [...prev, cycle]);
    toast.success(`${cycle.name} added to compare`, {
      style: {
        background: '#16B364',
        color: '#fff',
        borderRadius: '4px',
        fontFamily: 'DM Mono'
      }
    });
  };

  const removeFromCompare = (cycleId) => {
    setCompareList(prev => prev.filter(c => c.id !== cycleId));
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
