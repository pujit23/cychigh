import React from 'react';
import SearchBar from '../components/ui/SearchBar';
import CycleCard from '../components/cycle/CycleCard';
import { useCycles } from '../context/CycleContext';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';

const SearchPage = () => {
    const { cycles, loading } = useCycles();

    return (
        <div className="py-8">
            <div className="mb-12 text-center max-w-2xl mx-auto">
                <h1 className="heading-lg">Bicycle Encyclopedia</h1>
                <p className="text-brand-muted font-dsans mb-8">Browse the world's most complete database of {cycles?.length || 120} cycles.</p>
                <SearchBar />
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => <LoadingSkeleton key={i} />)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cycles.map(cycle => (
                        <CycleCard key={cycle.id || cycle._id} cycle={cycle} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
