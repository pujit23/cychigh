import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addCycle } from '../../services/api';
import { BRANDS, CATEGORIES, TERRAIN_TYPES, SKILL_LEVELS, BRAKE_TYPES, FRAME_MATERIALS, SUSPENSION_TYPES } from '../../utils/constants';

const STEPS = [
    'Identity & Overview',
    'Frame, Suspension & Weight',
    'Wheels, Tires & Brakes',
    'Drivetrain & Cockpit',
    'Pricing, Maintenance & Notes'
];

export default function AddCycleForm() {
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const nav = useNavigate();

    const { register, handleSubmit, trigger, formState: { errors } } = useForm({
        defaultValues: {
            tags: '',
            'overview.terrainType': [],
            'maintenance.commonIssues': '',
            'maintenance.tasks': '',
            pros: '',
            cons: '',
            'whoIsItFor.bestScenarios': '',
        }
    });

    const nextStep = async () => {
        // Basic validation per step
        let fieldsToValidate = [];
        if (step === 0) fieldsToValidate = ['name', 'brand', 'category', 'slug', 'year'];
        // ... add more field mapping for strict step validation if needed

        const isStepValid = await trigger(fieldsToValidate);
        if (isStepValid) setStep(s => Math.min(s + 1, STEPS.length - 1));
    };

    const prevStep = () => setStep(s => Math.max(s - 1, 0));

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            // Data transformations (e.g. strings to arrays where needed)
            const payload = { ...data };
            if (typeof payload.tags === 'string') payload.tags = payload.tags.split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload['overview.terrainType'] === 'string') payload['overview.terrainType'] = payload['overview.terrainType'].split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload['maintenance.commonIssues'] === 'string') payload['maintenance.commonIssues'] = payload['maintenance.commonIssues'].split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload['maintenance.tasks'] === 'string') payload['maintenance.tasks'] = payload['maintenance.tasks'].split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload.pros === 'string') payload.pros = payload.pros.split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload.cons === 'string') payload.cons = payload.cons.split(',').map(s => s.trim()).filter(Boolean);
            if (typeof payload['whoIsItFor.bestScenarios'] === 'string') payload['whoIsItFor.bestScenarios'] = payload['whoIsItFor.bestScenarios'].split(',').map(s => s.trim()).filter(Boolean);

            // We need to nest the flat form data into objects
            const finalPayload = {
                name: payload.name,
                slug: payload.slug,
                brand: payload.brand,
                category: payload.category,
                year: parseInt(payload.year) || 2024,
                tags: payload.tags,
                overview: {
                    fullName: payload['overview.fullName'],
                    origin: payload['overview.origin'],
                    primaryUse: payload['overview.primaryUse'],
                    skillLevel: payload['overview.skillLevel'],
                    terrainType: payload['overview.terrainType'],
                    history: payload['overview.history'],
                },
                specs: {
                    frameMaterial: payload['specs.frameMaterial'],
                    suspensionType: payload['specs.suspensionType'],
                    weight: {
                        min: parseFloat(payload['specs.weight.min']),
                        max: parseFloat(payload['specs.weight.max']),
                        unit: 'kg'
                    },
                    maxLoadCapacity: parseInt(payload['specs.maxLoadCapacity']),
                    wheelSize: payload['specs.wheelSize'],
                    tireType: payload['specs.tireType'],
                    rimType: payload['specs.rimType'],
                    gearSystem: payload['specs.gearSystem'],
                    gearCount: parseInt(payload['specs.gearCount']),
                    drivetrainType: payload['specs.drivetrainType'],
                    shifterType: payload['specs.shifterType'],
                    crankset: payload['specs.crankset'],
                    bottomBracket: payload['specs.bottomBracket']
                },
                brakes: {
                    type: payload['brakes.type'],
                    front: payload['brakes.front'],
                    rear: payload['brakes.rear'],
                    rotorSize: payload['brakes.rotorSize']
                },
                drivetrain: {
                    pedalType: payload['drivetrain.pedalType'],
                    chainStandard: payload['drivetrain.chainStandard'],
                    freewheelOrCassette: payload['drivetrain.freewheelOrCassette'],
                    frontDerailleur: payload['drivetrain.frontDerailleur'],
                    rearDerailleur: payload['drivetrain.rearDerailleur']
                },
                ergonomics: {
                    ridingPosture: payload['ergonomics.ridingPosture'],
                    handlebarType: payload['ergonomics.handlebarType'],
                    saddleType: payload['ergonomics.saddleType']
                },
                pricing: {
                    entryLevel: {
                        inr: payload['pricing.inr'],
                        usd: payload['pricing.usd']
                    }
                },
                maintenance: {
                    serviceInterval: payload['maintenance.serviceInterval'],
                    commonIssues: payload['maintenance.commonIssues'],
                    tasks: payload['maintenance.tasks']
                },
                pros: payload.pros,
                cons: payload.cons,
                whoIsItFor: {
                    idealRider: payload['whoIsItFor.idealRider'],
                    bestScenarios: payload['whoIsItFor.bestScenarios']
                }
            };

            await addCycle(finalPayload);
            toast.success('Cycle added successfully!', { icon: '🐝' });
            nav('/admin');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add cycle');
        } finally {
            setLoading(false);
        }
    };

    const InputField = ({ label, name, type = 'text', required = false, width = "w-full", placeholder }) => (
        <div className={width}>
            <label className="block text-xs font-heading tracking-widest text-gold mb-2 uppercase flex items-center gap-1">
                {label} {required && <span className="text-danger">*</span>}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                {...register(name, { required: required ? `${label} is required` : false })}
                className="w-full bg-bee-black border border-bee-border rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors"
            />
            {errors[name] && <span className="text-danger text-xs mt-1 block">{errors[name].message}</span>}
        </div>
    );

    const SelectField = ({ label, name, options, required = false, width = "w-full" }) => (
        <div className={width}>
            <label className="block text-xs font-heading tracking-widest text-gold mb-2 uppercase flex items-center gap-1">
                {label} {required && <span className="text-danger">*</span>}
            </label>
            <select
                {...register(name, { required: required ? `${label} is required` : false })}
                className="w-full bg-bee-black border border-bee-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors appearance-none"
            >
                <option value="">Select {label}</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            {errors[name] && <span className="text-danger text-xs mt-1 block">{errors[name].message}</span>}
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto bg-bee-card border border-bee-border rounded-3xl overflow-hidden shadow-glow">
            <div className="p-6 md:p-8 border-b border-bee-border bg-bee-panel">
                <h2 className="font-heading text-3xl text-white tracking-widest mb-6">ADD NEW CYCLE</h2>

                {/* Progress Bar */}
                <div className="relative h-2 bg-bee-black rounded-full overflow-hidden mb-2 border border-bee-border">
                    <motion.div
                        className="absolute top-0 left-0 bottom-0 bg-gold blur-[2px]"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.div
                        className="absolute top-0 left-0 bottom-0 bg-gold"
                        initial={{ width: '0%' }}
                        animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                <div className="flex justify-between text-xs font-heading tracking-widest text-gold">
                    <span>STEP {step + 1} OF {STEPS.length}</span>
                    <span>{Math.round(((step + 1) / STEPS.length) * 100)}% COMPLETED</span>
                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="font-heading text-2xl text-gold mb-6 border-b border-bee-border pb-2 inline-block">
                            {STEPS[step]}
                        </h3>

                        {step === 0 && (
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <InputField label="Cycle Name" name="name" required />
                                    <InputField label="URL Slug" name="slug" required placeholder="e.g. trek-marlin-5" />
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
                                    <InputField label="Tags (comma separated)" name="tags" placeholder="mtb, budget, popular" />
                                </div>
                                <div>
                                    <label className="block text-xs font-heading tracking-widest text-gold mb-2 uppercase">Image Upload</label>
                                    <div className="w-full h-32 border-2 border-dashed border-gold/50 rounded-xl bg-bee-black flex flex-col items-center justify-center hover:bg-gold-subtle transition-colors cursor-pointer group">
                                        <span className="text-3xl mb-2 filter drop-shadow-[0_0_5px_rgba(255,215,0,0.5)] group-hover:scale-110 transition-transform">🐝</span>
                                        <span className="text-sm font-body text-gray-400 group-hover:text-gold transition-colors">Drop cycle image here</span>
                                    </div>
                                    <p className="text-[10px] text-text-dim mt-2">Note: Image upload handling is mocked for this frontend demo.</p>
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-6">
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
                                    <InputField label="Frame Geometry Note" name="specs.frameGeometry" placeholder="e.g. Aggressive Trail" />
                                    <InputField label="History / Description" name="overview.history" />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <InputField label="Wheel Size" name="specs.wheelSize" placeholder='e.g. 29"' required />
                                    <InputField label="Rim Type" name="specs.rimType" placeholder="e.g. Alloy Double Wall" />
                                    <InputField label="Tire Type" name="specs.tireType" />
                                </div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <SelectField label="Brake Type" name="brakes.type" options={BRAKE_TYPES} required />
                                    <InputField label="Rotor Size" name="brakes.rotorSize" placeholder="e.g. 160mm" />
                                </div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <InputField label="Front Brake Model" name="brakes.front" />
                                    <InputField label="Rear Brake Model" name="brakes.rear" />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <InputField label="Gear System Overview" name="specs.gearSystem" placeholder="e.g. Shimano Altus 3x8" />
                                    <InputField label="Total Gear Count" name="specs.gearCount" type="number" required />
                                    <InputField label="Drivetrain Type" name="specs.drivetrainType" placeholder="e.g. 3x8 speed" />
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
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    <InputField label="Entry Price (INR)" name="pricing.inr" />
                                    <InputField label="Entry Price (USD)" name="pricing.usd" />
                                </div>
                                <div className="flex flex-col md:flex-row gap-6">
                                    <InputField label="Service Interval" name="maintenance.serviceInterval" placeholder="e.g. Every 6 months" />
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
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>

                <div className="flex justify-between mt-10 pt-6 border-t border-bee-border">
                    <button
                        type="button"
                        onClick={prevStep}
                        disabled={step === 0 || loading}
                        className="px-6 py-3 font-heading text-lg tracking-wider text-gray-400 border border-bee-border rounded-xl hover:text-white hover:border-white transition-colors disabled:opacity-30"
                    >
                        ← BACK
                    </button>

                    {step < STEPS.length - 1 ? (
                        <button
                            type="button"
                            onClick={nextStep}
                            className="px-8 py-3 bg-gold text-bee-black font-heading text-lg tracking-wider rounded-xl shadow-glow hover:shadow-glow-lg transition-all hover:scale-[1.02]"
                        >
                            NEXT STEP →
                        </button>
                    ) : (
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-10 py-3 bg-success text-white font-heading text-xl tracking-wider rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.4)] hover:shadow-[0_0_25px_rgba(34,197,94,0.6)] transition-all flex items-center gap-2 hover:scale-[1.02] disabled:opacity-70 border border-success/50"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            ) : (
                                <>SAVE CYCLE <span className="text-2xl filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] leading-none">🐝</span></>
                            )}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}
