import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCycles } from '../services/api';
import { MOCK_CYCLES } from '../utils/constants';

const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [filters, setFilters] = useState({
    brand: 'all',
    category: 'all',
    search: ''
  });
  const [total, setTotal] = useState(0);

  const fetchCycles = async (params = {}) => {
    setLoading(true);
    try {
      const res = await getCycles(params);
      if (res.data.cycles.length > 0) {
        setCycles(res.data.cycles);
        setTotal(res.data.total);
      } else {
        setCycles(MOCK_CYCLES);
        setTotal(MOCK_CYCLES.length);
      }
    } catch (err) {
      console.error('API failed, using mock data:', err);
      setCycles(MOCK_CYCLES);
      setTotal(MOCK_CYCLES.length);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCycles({ limit: 120 });
  }, []);

  return (
    <CycleContext.Provider value={{
      cycles,
      setCycles,
      loading,
      error,
      selectedCycle,
      setSelectedCycle,
      filters,
      setFilters,
      total,
      fetchCycles
    }}>
      {children}
    </CycleContext.Provider>
  );
};

export const useCycles = () => {
  const ctx = useContext(CycleContext);
  if (!ctx) throw new Error(
    'useCycles must be used within CycleProvider'
  );
  return ctx;
};

export default CycleContext;
