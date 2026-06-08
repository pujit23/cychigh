import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCycles } from '../context/CycleContext';
import CycleDetail from '../components/cycle/CycleDetail';
import { CycleDetailSkeleton } from '../components/ui/LoadingSkeleton';

export default function CyclePage() {
    const { slug } = useParams();
    const nav = useNavigate();
    const { allCycles, loading } = useCycles();
    const [cycle, setCycle] = useState(null);

    useEffect(() => {
        if (loading) return;

        const found = allCycles.find(c => c.slug === slug);
        if (!found) {
            nav('/404', { replace: true });
        } else {
            setCycle(found);
            window.scrollTo(0, 0);
        }
    }, [slug, allCycles, loading, nav]);

    if (loading || !cycle) {
        return <CycleDetailSkeleton />;
    }

    return <CycleDetail cycle={cycle} />;
}
