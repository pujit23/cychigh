import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { updateCycle, getCycleById } from '../../services/api';
import { BRANDS, CATEGORIES, TERRAIN_TYPES, SKILL_LEVELS, BRAKE_TYPES, FRAME_MATERIALS, SUSPENSION_TYPES } from '../../utils/constants';

const STEPS = [
    'Identity & Overview',
    'Frame, Suspension & Weight',
    'Wheels, Tires & Brakes',
    'Drivetrain & Cockpit',
    'Pricing, Maintenance & Notes'
];

export default function EditCycleForm() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const { id } = useParams();
    const nav = useNavigate();

    const { register, handleSubmit, trigger, reset, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchCycle = async () => {
            try {
                const { data } = await getCycleById(id);
                const cycle = data.data; // Mongoose document format

                // Flatten the data back into the form structure
                reset({
                    name: cycle.name,
                    slug: cycle.slug,
                    brand: cycle.brand,
                    category: cycle.category,
                    year: cycle.year,
                    tags: cycle.tags?.join(', ') || '',
                    'overview.fullName': cycle.overview?.fullName || '',
                    'overview.origin': cycle.overview?.origin || '',
                    'overview.primaryUse': cycle.overview?.primaryUse || '',
                    'overview.skillLevel': cycle.overview?.skillLevel || '',
                    'overview.terrainType': cycle.overview?.terrainType?.join(', ') || '',
                    'overview.history': cycle.overview?.history || '',
                    'specs.frameMaterial': cycle.specs?.frameMaterial || '',
                    'specs.frameGeometry': cycle.specs?.frameGeometry || '',
                    'specs.suspensionType': cycle.specs?.suspensionType || '',
                    'specs.weight.min': cycle.specs?.weight?.min || '',
                    'specs.weight.max': cycle.specs?.weight?.max || '',
                    'specs.maxLoadCapacity': cycle.specs?.maxLoadCapacity || '',
                    'specs.wheelSize': cycle.specs?.wheelSize || '',
                    'specs.tireType': cycle.specs?.tireType || '',
                    'specs.rimType': cycle.specs?.rimType || '',
                    'specs.gearSystem': cycle.specs?.gearSystem || '',
                    'specs.gearCount': cycle.specs?.gearCount || '',
                    'specs.drivetrainType': cycle.specs?.drivetrainType || '',
                    'specs.shifterType': cycle.specs?.shifterType || '',
                    'specs.crankset': cycle.specs?.crankset || '',
                    'specs.bottomBracket': cycle.specs?.bottomBracket || '',
                    'brakes.type': cycle.brakes?.type || '',
                    'brakes.front': cycle.brakes?.front || '',
                    'brakes.rear': cycle.brakes?.rear || '',
                    'brakes.rotorSize': cycle.brakes?.rotorSize || '',
                    'drivetrain.pedalType': cycle.drivetrain?.pedalType || '',
                    'drivetrain.chainStandard': cycle.drivetrain?.chainStandard || '',
                    'drivetrain.freewheelOrCassette': cycle.drivetrain?.freewheelOrCassette || '',
                    'drivetrain.frontDerailleur': cycle.drivetrain?.frontDerailleur || '',
                    'drivetrain.rearDerailleur': cycle.drivetrain?.rearDerailleur || '',
                    'ergonomics.ridingPosture': cycle.ergonomics?.ridingPosture || '',
                    'ergonomics.handlebarType': cycle.ergonomics?.handlebarType || '',
                    'ergonomics.saddleType': cycle.ergonomics?.saddleType || '',
                    'pricing.inr': cycle.pricing?.entryLevel?.inr || '',
                    'pricing.usd': cycle.pricing?.entryLevel?.usd || '',
                    'maintenance.serviceInterval': cycle.maintenance?.serviceInterval || '',
                    'maintenance.commonIssues': cycle.maintenance?.commonIssues?.join(', ') || '',
                    'maintenance.tasks': cycle.maintenance?.tasks?.join(', ') || '',
                    pros: cycle.pros?.join(', ') || '',
                    cons: cycle.cons?.join(', ') || '',
                    'whoIsItFor.idealRider': cycle.whoIsItFor?.idealRider || '',
                    'whoIsItFor.bestScenarios': cycle.whoIsItFor?.bestScenarios?.join(', ') || ''
                });
            } catch (err) {
                toast.error('Failed to load cycle data');
                nav('/admin');
            } finally {
                setFetching(false);
            }
        };
        if (id) fetchCycle();
    }, [id, reset, nav]);

    // Rest of logic identical to AddCycleForm with updateCycle instead of addCycle
    const nextStep = async () => {
        const isStepValid = await trigger(); // Simplified triggering for edit
        if (isStepValid) setStep(s => Math.min(s + 1, STEPS.length - 1));
    };
    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const payload = { ...data };
            if (typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload['overview.terrainType'] === 'string') payload['overview.terrainType'] = payload['overview.terrainType'].split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload['maintenance.commonIssues'] === 'string') payload['maintenance.commonIssues'] = payload['maintenance.commonIssues'].split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload['maintenance.tasks'] === 'string') payload['maintenance.tasks'] = payload['maintenance.tasks'].split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload.pros === 'string') payload.pros = payload.pros.split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload.cons === 'string') payload.cons = payload.cons.split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload['whoIsItFor.bestScenarios'] === 'string') payload['whoIsItFor.bestScenarios'] = payload['whoIsItFor.bestScenarios'].split(',').map(s => s.trim()).filter(Boolean);

            const finalPayload = {
                name: payload.name, slug: payload.slug, brand: payload.brand, category: payload.category, year: parseInt(payload.year) || 2024,
                tags: payload.tags,
                overview: { fullName: payload['overview.fullName'], origin: payload['overview.origin'], primaryUse: payload['overview.primaryUse'], skillLevel: payload['overview.skillLevel'], terrainType: payload['overview.terrainType'], history: payload['overview.history'] },
                specs: { frameMaterial: payload['specs.frameMaterial'], suspensionType: payload['specs.suspensionType'], weight: { min: parseFloat(payload['specs.weight.min']), max: parseFloat(payload['specs.weight.max']), unit: 'kg' }, maxLoadCapacity: parseInt(payload['specs.maxLoadCapacity']), wheelSize: payload['specs.wheelSize'], tireType: payload['specs.tireType'], rimType: payload['specs.rimType'], gearSystem: payload['specs.gearSystem'], gearCount: parseInt(payload['specs.gearCount']), drivetrainType: payload['specs.drivetrainType'], shifterType: payload['specs.shifterType'], crankset: payload['specs.crankset'], bottomBracket: payload['specs.bottomBracket'] },
                brakes: { type: payload['brakes.type'], front: payload['brakes.front'], rear: payload['brakes.rear'], rotorSize: payload['brakes.rotorSize'] },
                drivetrain: { pedalType: payload['drivetrain.pedalType'], chainStandard: payload['drivetrain.chainStandard'], freewheelOrCassette: payload['drivetrain.freewheelOrCassette'], frontDerailleur: payload['drivetrain.frontDerailleur'], rearDerailleur: payload['drivetrain.rearDerailleur'] },
                ergonomics: { ridingPosture: payload['ergonomics.ridingPosture'], handlebarType: payload['ergonomics.handlebarType'], saddleType: payload['ergonomics.saddleType'] },
                pricing: { entryLevel: { inr: payload['pricing.inr'], usd: payload['pricing.usd'] } },
                maintenance: { serviceInterval: payload['maintenance.serviceInterval'], commonIssues: payload['maintenance.commonIssues'], tasks: payload['maintenance.tasks'] },
                pros: payload.pros, cons: payload.cons, whoIsItFor: { idealRider: payload['whoIsItFor.idealRider'], bestScenarios: payload['whoIsItFor.bestScenarios'] }
            };

            await updateCycle(id, finalPayload);
            toast.success('Cycle updated successfully!', { icon: '🐝' });
            nav('/admin');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update cycle');
        } finally {
            setLoading(false);
        }
    };

    const InputField = ({ label, name, type = 'text', required = false, width = "w-full", placeholder }) => (
        <div className={width}>
            <label className="block text-xs font-heading tracking-widest text-gold mb-2 uppercase flex items-center gap-1">{label} {required && <span className="text-danger">*</span>}</label>
            <input type={type} placeholder={placeholder} {...register(name, { required: required ? `${label} is required` : false })} className="w-full bg-bee-black border border-bee-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors" />
            {errors[name] && <span className="text-danger text-xs mt-1 block">{errors[name].message}</span>}
        </div>
    );

    const SelectField = ({ label, name, options, required = false, width = "w-full" }) => (
        <div className={width}>
            <label className="block text-xs font-heading tracking-widest text-gold mb-2 uppercase flex items-center gap-1">{label} {required && <span className="text-danger">*</span>}</label>
            <select {...register(name, { required: required ? `${label} is required` : false })} className="w-full bg-bee-black border border-bee-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors appearance-none">
                <option value="">Select {label}</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {errors[name] && <span className="text-danger text-xs mt-1 block">{errors[name].message}</span>}
        </div>
    );

    if (fetching) return <div className="p-12 text-center text-gold text-2xl animate-pulse font-heading tracking-widest">LOADING CYCLE DATA... 🐝</div>;

    return (
        <div className="max-w-4xl mx-auto bg-bee-card border border-bee-border rounded-3xl overflow-hidden shadow-glow">
            <div className="p-6 md:p-8 border-b border-bee-border bg-bee-panel">
                <h2 className="font-heading text-3xl text-white tracking-widest mb-6">EDIT CYCLE</h2>

                {/* Progress Bar */}
                <div className="relative h-2 bg-bee-black rounded-full overflow-hidden mb-2 border border-bee-border">
                    <motion.div className="absolute top-0 left-0 bottom-0 bg-gold blur-[2px]" initial={{ width: '0%' }} animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.3 }} />
                    <motion.div className="absolute top-0 left-0 bottom-0 bg-gold" initial={{ width: '0%' }} animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }} transition={{ duration: 0.3 }} />
                </div>
                <div className="flex justify-between text-xs font-heading tracking-widest text-gold">
                    <span>STEP {step + 1} OF {STEPS.length}</span>
                    <span>{Math.round(((step + 1) / STEPS.length) * 100)}% COMPLETED</span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} transition={{ duration: 0.3 }}>
                        <h3 className="font-heading text-2xl text-gold mb-6 border-b border-bee-border pb-2 inline-block">{STEPS[step]}</h3>

                        <div className="space-y-6">
                            {step === 0 && (
                                <>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Cycle Name" name="name" required />
                                        <InputField label="URL Slug" name="slug" required />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <SelectField label="Brand" name="brand" options={BRANDS.filter(b => b !== 'All')} required />
                                        <SelectField label="Category" name="category" options={CATEGORIES.filter(c => c !== 'All')} required />
                                        <InputField label="Year" name="year" type="number" required />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Full Name" name="overview.fullName" />
                                        <InputField label="Origin (Country)" name="overview.origin" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <SelectField label="Skill Level" name="overview.skillLevel" options={SKILL_LEVELS} />
                                        <InputField label="Tags (comma separated)" name="tags" />
                                    </div>
                                </>
                            )}

                            {step === 1 && (
                                <>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <SelectField label="Frame Material" name="specs.frameMaterial" options={FRAME_MATERIALS} required />
                                        <SelectField label="Suspension Type" name="specs.suspensionType" options={SUSPENSION_TYPES} required />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Min Weight (kg)" name="specs.weight.min" type="number" />
                                        <InputField label="Max Weight (kg)" name="specs.weight.max" type="number" />
                                        <InputField label="Max Load (kg)" name="specs.maxLoadCapacity" type="number" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Frame Geometry Note" name="specs.frameGeometry" />
                                        <InputField label="History / Description" name="overview.history" />
                                    </div>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Wheel Size" name="specs.wheelSize" required />
                                        <InputField label="Rim Type" name="specs.rimType" />
                                        <InputField label="Tire Type" name="specs.tireType" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <SelectField label="Brake Type" name="brakes.type" options={BRAKE_TYPES} required />
                                        <InputField label="Rotor Size" name="brakes.rotorSize" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Front Brake Model" name="brakes.front" />
                                        <InputField label="Rear Brake Model" name="brakes.rear" />
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Gear System Overview" name="specs.gearSystem" />
                                        <InputField label="Total Gear Count" name="specs.gearCount" type="number" required />
                                        <InputField label="Drivetrain Type" name="specs.drivetrainType" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Shifters" name="specs.shifterType" />
                                        <InputField label="Crankset" name="specs.crankset" />
                                        <InputField label="Bottom Bracket" name="specs.bottomBracket" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Front Derailleur" name="drivetrain.frontDerailleur" />
                                        <InputField label="Rear Derailleur" name="drivetrain.rearDerailleur" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Freewheel/Cassette" name="drivetrain.freewheelOrCassette" />
                                        <InputField label="Chain" name="drivetrain.chainStandard" />
                                        <InputField label="Pedals" name="drivetrain.pedalType" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Riding Posture" name="ergonomics.ridingPosture" />
                                        <InputField label="Handlebar" name="ergonomics.handlebarType" />
                                        <InputField label="Saddle" name="ergonomics.saddleType" />
                                    </div>
                                </>
                            )}

                            {step === 4 && (
                                <>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Entry Price (INR)" name="pricing.inr" />
                                        <InputField label="Entry Price (USD)" name="pricing.usd" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Service Interval" name="maintenance.serviceInterval" />
                                        <InputField label="Common Issues (comma separated)" name="maintenance.commonIssues" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Pros (comma separated)" name="pros" />
                                        <InputField label="Cons (comma separated)" name="cons" />
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <InputField label="Ideal Rider" name="whoIsItFor.idealRider" />
                                        <InputField label="Best Scenarios (comma separated)" name="whoIsItFor.bestScenarios" />
                                    </div>
                                </>
                            )}
                        </div>

                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-10 pt-6 border-t border-bee-border">
                    <button type="button" onClick={prevStep} disabled={step === 0 || loading} className="px-6 py-3 font-heading text-lg tracking-wider text-gray-400 border border-bee-border rounded-xl hover:text-white hover:border-white transition-colors disabled:opacity-30">← BACK</button>

                    {step < STEPS.length - 1 ? (
                        <button type="button" onClick={nextStep} className="px-8 py-3 bg-gold text-bee-black font-heading text-lg tracking-wider rounded-xl shadow-glow hover:shadow-glow-lg transition-all hover:scale-[1.02]">NEXT STEP →</button>
                    ) : (
                        <button type="submit" disabled={loading} className="px-10 py-3 bg-success text-white font-heading text-xl tracking-wider rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all flex items-center gap-2 hover:scale-[1.02] border border-success/50 disabled:opacity-50">
                            {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span> : <>UPDATE CYCLE <span className="text-2xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] leading-none">🐝</span></>}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
