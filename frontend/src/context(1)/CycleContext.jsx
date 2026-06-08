import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const CycleContext = createContext();

export const CycleProvider = ({ children }) => {
    const [cycles, setCycles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchCycles = async () => {
            try {
                const { data } = await axios.get('/api/cycles');
                setCycles(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching cycles');
                setLoading(false);
            }
        };

        fetchCycles();
        
        const storedFavs = localStorage.getItem('cycFavs');
        if(storedFavs) {
            setFavorites(JSON.parse(storedFavs));
        }
    }, []);

    const toggleFavorite = (cycleId) => {
        const updated = favorites.includes(cycleId)
            ? favorites.filter(id => id !== cycleId)
            : [...favorites, cycleId];
        
        setFavorites(updated);
        localStorage.setItem('cycFavs', JSON.stringify(updated));
        toast.success(favorites.includes(cycleId) ? 'Removed from garage' : 'Added to garage');
    };

    return (
        <CycleContext.Provider value={{
            cycles,
            setCycles,
            selectedCycle: null,
            setSelectedCycle: () => {},
            loading,
            setLoading,
            error,
            setError,
            filters: { brand: 'all', category: 'all', search: '' },
            setFilters: () => {},
            favorites,
            toggleFavorite
        }}>
            {children}
        </CycleContext.Provider>
    );
};

export const useCycles = () => {
    const context = require('react').useContext(CycleContext);
    if (!context) {
        throw new Error('useCycles must be used within CycleProvider');
    }
    return context;
};

export default CycleContext;
