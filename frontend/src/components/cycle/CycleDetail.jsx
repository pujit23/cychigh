import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageLayout from '../layout/PageLayout';
import { MOCK_CYCLES } from '../../utils/constants';
import AccordionSection from './AccordionSection';
import SpecRow from './SpecRow';
import PartsBadge from './PartsBadge';
import { formatPrice, formatWeight } from '../../utils/formatters';

const CycleDetail = () => {
  const { id } = useParams();
  const [cycle, setCycle] = useState(null);

  useEffect(() => {
    // mock fetch
    const found = MOCK_CYCLES.find(c => c.id === id);
    setCycle(found);
  }, [id]);

  if (!cycle) return <PageLayout><div className="p-8 font-display text-4xl text-text-muted">Loading...</div></PageLayout>;

  return (
    <PageLayout>
      <div className="p-8 max-w-6xl mx-auto w-full">
         <div className="flex flex-col lg:flex-row gap-12">
           <div className="flex-1">
             <div className="bg-[#0A0A0A] border border-[#141414] rounded h-[500px] flex items-center justify-center mb-6">
               <span className="font-display text-[#333] tracking-widest text-4xl">{cycle.name}</span>
             </div>
             <div className="flex gap-2 mb-6 flex-wrap">
                <PartsBadge label={cycle.frame_material} />
                <PartsBadge label={cycle.brakes} />
                <PartsBadge label={cycle.groupset} />
             </div>
           </div>
           
           <div className="w-full lg:w-[400px]">
             <h1 className="font-display text-5xl text-white tracking-widest mb-2">{cycle.name}</h1>
             <div className="flex gap-4 items-center mb-8">
               <span className="text-gold font-mono text-2xl">{formatPrice(cycle.price_inr)}</span>
               <span className="text-text-muted font-body text-sm uppercase tracking-wider">{cycle.brand}</span>
             </div>

             <AccordionSection title="Core Specs" defaultOpen={true}>
               <SpecRow label="Frame Material" value={cycle.frame_material} />
               <SpecRow label="Weight" value={formatWeight(cycle.weight)} />
               <SpecRow label="Drivetrain" value={`${cycle.speeds}-Speed ${cycle.groupset}`} />
               <SpecRow label="Brakes" value={cycle.brakes} />
               <SpecRow label="Wheel Size" value={cycle.wheel_size} />
             </AccordionSection>
             
             <AccordionSection title="Target Rider">
                <SpecRow label="Skill Level" value={cycle.skill_level} />
                <SpecRow label="Terrain" value={cycle.terrain} />
             </AccordionSection>

             <button className="w-full bg-gold text-[#000] font-body font-bold py-3 mt-4 hover:bg-gold-bright transition-colors uppercase tracking-widest text-sm rounded">
               Add to Compare
             </button>
           </div>
         </div>
      </div>
    </PageLayout>
  );
};

export default CycleDetail;
