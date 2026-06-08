import React from 'react';
import BikeFitCalculator from '../components/tools/BikeFitCalculator';
import GearRatioCalculator from '../components/tools/GearRatioCalculator';
import TireFinder from '../components/tools/TireFinder';
import WeightSimulator from '../components/tools/WeightSimulator';
import UpgradeRecommender from '../components/tools/UpgradeRecommender';

const ToolsPage = () => {
    return (
        <div className="py-12 max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h1 className="heading-lg mb-4">Pro Tools Arsenal</h1>
                <p className="text-xl text-brand-muted font-dsans max-w-2xl mx-auto">Calculators, physics simulators, and predictive modeling for the modern cyclist.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <BikeFitCalculator />
                <GearRatioCalculator />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <TireFinder />
                <WeightSimulator />
                <UpgradeRecommender />
            </div>
        </div>
    );
};

export default ToolsPage;
