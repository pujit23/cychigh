import React from 'react';
import AccordionSection from './AccordionSection';
import SpecRow from './SpecRow';
import PartsBadge from './PartsBadge';
import VersionHistory from './VersionHistory';
import { formatCurrency } from '../../utils/formatters';
import { ShieldCheck, Info, Wrench } from 'lucide-react';

const CycleDetail = ({ cycle }) => {
    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-2/3">
                <div className="glass-panel p-6 rounded-xl mb-8">
                    <h2 className="heading-md mb-4 text-brand-gold flex items-center gap-2">
                        <Info size={24} /> The Verdict
                    </h2>
                    <p className="text-white text-lg leading-relaxed">{cycle.overview.idealFor}</p>
                    <div className="grid grid-cols-2 mt-6 gap-6">
                        <div>
                            <span className="font-bebas text-brand-muted tracking-widest text-sm mb-2 block">Primary Use</span>
                            <span className="font-dsans text-white">{cycle.overview.primaryUse}</span>
                        </div>
                        <div>
                            <span className="font-bebas text-brand-muted tracking-widest text-sm mb-2 block">Skill Level</span>
                            <span className="font-dsans text-brand-red">{cycle.overview.skillLevel}</span>
                        </div>
                    </div>
                </div>

                <AccordionSection title="Geek Out: Frame & Suspension" defaultOpen={true}>
                    <SpecRow label="Material" value={cycle.frame.material} />
                    <SpecRow label="Type / Geometry" value={`${cycle.frame.type} - ${cycle.frame.geometry}`} />
                    <SpecRow label="Weight" value={`${cycle.frame.weight} kg`} />
                    <SpecRow label="Max load" value={`${cycle.frame.maxLoad} kg`} />
                    <div className="my-4 border-t border-white/10 pt-4">
                        <SpecRow label="Fork Material" value={cycle.fork.material} />
                        <SpecRow label="Fork Travel" value={cycle.fork.travel} />
                        <SpecRow label="Fork Brand" value={cycle.fork.brand} />
                        <SpecRow label="Fork Model" value={cycle.fork.model} />
                    </div>
                </AccordionSection>

                <AccordionSection title="Transmission & Dynamics">
                    <SpecRow label="Groupset" value={cycle.drivetrain.groupset} />
                    <SpecRow label="Speeds" value={`${cycle.drivetrain.speeds} Speed`} />
                    <SpecRow label="Rear Derailleur" value={cycle.drivetrain.rearDerailleur} />
                    <SpecRow label="Cassette" value={`${cycle.drivetrain.cassetteBrand} ${cycle.drivetrain.cassetteModel} (${cycle.drivetrain.cassetteRange})`} />
                    <SpecRow label="Crankset" value={`${cycle.drivetrain.cranksetBrand} ${cycle.drivetrain.cranksetModel} (${cycle.drivetrain.chainringSize})`} />
                    <SpecRow label="Brakes" value={`${cycle.brakes.type} - ${cycle.brakes.leverBrand}`} />
                </AccordionSection>

                <AccordionSection title="Wheels & Tires">
                    <SpecRow label="Wheel Size" value={cycle.wheels.size} />
                    <SpecRow label="Rims" value={`${cycle.wheels.front.rimBrand} ${cycle.wheels.front.rimType}`} />
                    <SpecRow label="Tires" value={`${cycle.wheels.front.tireBrand} ${cycle.wheels.front.tireModel} (${cycle.wheels.front.tireSize})`} />
                    <SpecRow label="Tubeless Ready" value={cycle.wheels.front.tubelessReady ? 'Yes' : 'No'} />
                </AccordionSection>
                
                <AccordionSection title="Cockpit & Ergonomics">
                    <SpecRow label="Handlebar" value={`${cycle.cockpit.handlebarBrand} ${cycle.cockpit.handlebarType} ${cycle.cockpit.handlebarWidth}`} />
                    <SpecRow label="Stem" value={`${cycle.cockpit.stemBrand} ${cycle.cockpit.stemLength}`} />
                    <SpecRow label="Seatpost" value={`${cycle.cockpit.seatpostBrand} ${cycle.cockpit.seatpostDiameter} - Dropper: ${cycle.cockpit.dropperPost ? cycle.cockpit.dropperTravel : 'No'}`} />
                    <SpecRow label="Saddle" value={`${cycle.cockpit.saddleBrand} ${cycle.cockpit.saddleModel}`} />
                </AccordionSection>
            </div>

            <div className="w-full lg:w-1/3 flex flex-col gap-6">
                <div className="glass-panel p-6 rounded-xl border border-brand-gold/30">
                    <h3 className="font-bebas text-2xl tracking-widest text-brand-gold mb-4 text-center">Price Analysis</h3>
                    <div className="flex justify-between items-end border-b border-white/10 pb-4 mb-4">
                        <span className="text-brand-muted font-dmono text-sm uppercase">Street Price</span>
                        <span className="font-bebas text-4xl text-white">{formatCurrency(cycle.pricing.street_inr)}</span>
                    </div>
                    <div className="flex justify-between items-end">
                        <span className="text-brand-muted font-dmono text-sm uppercase">MSRP</span>
                        <span className="font-bebas text-2xl text-brand-red line-through">{formatCurrency(cycle.pricing.mrp_inr)}</span>
                    </div>
                </div>

                <div className="glass-panel p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <ShieldCheck className="text-brand-gold" size={24} />
                        <h3 className="heading-md m-0">Pros</h3>
                    </div>
                    <ul className="flex flex-col gap-2">
                        {cycle.pros.map((pro, i) => (
                            <li key={i} className="flex gap-2 items-start text-sm text-brand-muted font-dsans">
                                <span className="text-brand-gold mt-1">+</span> {pro}
                            </li>
                        ))}
                    </ul>

                    <div className="flex items-center gap-3 mb-4 mt-6 pt-6 border-t border-white/10">
                        <Wrench className="text-brand-red" size={24} />
                        <h3 className="heading-md m-0">Cons</h3>
                    </div>
                    <ul className="flex flex-col gap-2">
                        {cycle.cons.map((con, i) => (
                            <li key={i} className="flex gap-2 items-start text-sm text-brand-muted font-dsans">
                                <span className="text-brand-red mt-1">-</span> {con}
                            </li>
                        ))}
                    </ul>
                </div>

                {cycle.versions && cycle.versions.length > 0 && (
                    <VersionHistory versions={cycle.versions} />
                )}
            </div>
        </div>
    );
};

export default CycleDetail;
