import { createContext, useState } from 'react';

export const BuilderContext = createContext();

export const BuilderProvider = ({ children }) => {
    const [build, setBuild] = useState({
        frame: null,
        fork: null,
        wheels: null,
        drivetrain: null,
        brakes: null,
        cockpit: null
    });

    const [totalCost, setTotalCost] = useState(0);
    const [totalWeight, setTotalWeight] = useState(0);
    const [warnings, setWarnings] = useState([]);

    const updatePart = (category, part) => {
        setBuild(prev => ({ ...prev, [category]: part }));
        recalculateTotals({ ...build, [category]: part });
    };

    const removePart = (category) => {
        setBuild(prev => ({ ...prev, [category]: null }));
        recalculateTotals({ ...build, [category]: null });
    };

    const recalculateTotals = (currentBuild) => {
        let cost = 0;
        let weight = 0;
        let newWarnings = [];

        Object.values(currentBuild).forEach(part => {
            if (part) {
                cost += Number(part.price) || 0;
                weight += Number(part.weight) || 0;
            }
        });

        // Basic compatibility checks
        if (currentBuild.frame && currentBuild.wheels) {
            if (currentBuild.frame.wheelSize !== currentBuild.wheels.size) {
                newWarnings.push(`Frame requires ${currentBuild.frame.wheelSize} wheels, but you selected ${currentBuild.wheels.size}.`);
            }
        }

        if (currentBuild.drivetrain && currentBuild.frame) {
            if (currentBuild.frame.type === 'Track' && currentBuild.drivetrain.gears > 1) {
                newWarnings.push(`Track frames are single-speed only.`);
            }
        }

        setTotalCost(cost);
        setTotalWeight(weight);
        setWarnings(newWarnings);
    };

    const resetBuild = () => {
        setBuild({ frame: null, fork: null, wheels: null, drivetrain: null, brakes: null, cockpit: null });
        setTotalCost(0);
        setTotalWeight(0);
        setWarnings([]);
    };

    return (
        <BuilderContext.Provider value={{
            build, totalCost, totalWeight, warnings, updatePart, removePart, resetBuild
        }}>
            {children}
        </BuilderContext.Provider>
    );
};

export const useBuilder = () => {
    const context = require('react').useContext(BuilderContext);
    if (!context) {
        throw new Error('useBuilder must be used within BuilderProvider');
    }
    return context;
};

export default BuilderContext;
