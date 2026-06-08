import { createContext, useState } from 'react';
import toast from 'react-hot-toast';

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
    const [compareList, setCompareList] = useState([]);

    const addToCompare = (cycle) => {
        if (compareList.length >= 3) {
            toast.error("You can only compare up to 3 cycles at a time.");
            return;
        }
        if (compareList.find(c => c.id === cycle.id)) {
            toast.error("Cycle is already in compare list.");
            return;
        }
        setCompareList([...compareList, cycle]);
        toast.success("Added to Compare");
    };

    const removeFromCompare = (id) => {
        setCompareList(compareList.filter(c => c.id !== id));
        toast.success("Removed from Compare");
    };

    const clearCompare = () => {
        setCompareList([]);
        toast.success("Compare list cleared");
    };

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = require('react').useContext(CompareContext);
    if (!context) {
        throw new Error('useCompare must be used within CompareProvider');
    }
    return context;
};

export default CompareContext;
