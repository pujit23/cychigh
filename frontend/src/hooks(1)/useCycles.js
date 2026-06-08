import { useContext } from 'react';
import { CycleContext } from '../context/CycleContext';

export const useCycles = () => {
    const context = useContext(CycleContext);
    if (!context) {
        throw new Error('useCycles must be used within a CycleProvider');
    }
    return context;
};
