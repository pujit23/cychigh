import React from 'react';
import BikeBuilder from '../components/builder/BikeBuilder';

const BuilderPage = () => {
    return (
        <div className="py-10 max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
                <h1 className="heading-lg mb-4 text-brand-gold drop-shadow-[0_0_15px_rgba(255,215,0,0.2)]">Custom Bike Studio</h1>
                <p className="text-xl text-brand-muted font-dsans max-w-2xl mx-auto">Configure your dream build from scratch. Monitor weight penalties and budget in real-time.</p>
            </div>
            
            <BikeBuilder />
        </div>
    );
};

export default BuilderPage;
