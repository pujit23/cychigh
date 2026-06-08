import React from 'react';
import RideTracker from '../components/tracker/RideTracker';
import RideHistory from '../components/tracker/RideHistory';
import { useAuth } from '../context/AuthContext';

const TrackerPage = () => {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="py-24 text-center max-w-xl mx-auto px-4">
                <h1 className="heading-lg text-brand-red mb-6">Unauthorized Access</h1>
                <p className="font-dsans text-brand-muted mb-8 text-lg">You must be logged into a CycHigh account to access the Ride Tracker suite and save activity telemetry.</p>
                <a href="/login" className="btn-gold text-lg px-8 py-4 inline-block">Authenticate Now</a>
            </div>
        );
    }

    return (
        <div className="py-12 max-w-7xl mx-auto px-4">
            <div className="mb-12">
                <h1 className="heading-lg mb-2">Ride Telemetry</h1>
                <p className="text-xl text-brand-muted font-dsans">Log your activities, track your distance, and monitor your physical load.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="w-full lg:w-1/3">
                    <RideTracker />
                </div>
                <div className="w-full lg:w-2/3">
                    <RideHistory />
                </div>
            </div>
        </div>
    );
};

export default TrackerPage;
