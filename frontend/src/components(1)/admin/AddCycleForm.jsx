import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BRANDS, CATEGORIES, TERRAIN_TYPES, SKILL_LEVELS, FRAME_MATERIALS, SUSPENSION_TYPES } from '../../utils/constants';

// Reusable Sharp Input component
const SharpInput = ({ label, register, name, type = "text", required, validation, ...props }) => (
    <div className="mb-4">
        <label className="block font-body text-[10px] uppercase text-text-secondary tracking-[0.2em] mb-2">{label}</label>
        <input
            type={type}
            {...register(name, { required, ...validation })}
            className="w-full bg-bg-deepest border border-border-subtle text-text-primary px-4 py-3 font-body text-xs focus:border-gold transition-colors rounded-none outline-none"
            {...props}
        />
    </div>
);

const SharpSelect = ({ label, register, name, options, required, multi }) => (
    <div className="mb-4">
        <label className="block font-body text-[10px] uppercase text-text-secondary tracking-[0.2em] mb-2">{label}</label>
        <select
            {...register(name, { required })}
            multiple={multi}
            className={`w-full bg-bg-deepest border border-border-subtle text-text-primary px-4 py-3 font-body text-xs focus:border-gold transition-colors rounded-none outline-none ${multi ? 'h-24' : ''}`}
        >
            <option value="">Select...</option>
            {(options || []).map(o => (
                <option key={o} value={o}>{o}</option>
            ))}
        </select>
    </div>
);

export default function AddCycleForm({ onSubmit, onClose }) {
    const { register, handleSubmit, formState: { isSubmitting } } = useForm();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-bg-deepest/90 backdrop-blur-md" onClick={onClose} />

            <div className="relative w-full max-w-4xl bg-bg-dark border border-border-mid flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-border-subtle flex justify-between items-center sticky top-0 bg-bg-dark z-10">
                    <h2 className="font-heading text-3xl text-gold uppercase tracking-widest m-0">Add New Telemetry</h2>
                    <button onClick={onClose} className="text-text-muted hover:text-gold transition-colors focus:outline-none">✕</button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="overflow-y-auto p-6 space-y-8 custom-scroll">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        <SharpInput label="Cycle Name" name="name" register={register} required />
                        <SharpSelect label="Brand" name="brand" options={BRANDS.filter(b => b !== 'All')} register={register} required />
                        <SharpSelect label="Category" name="category" options={CATEGORIES.filter(c => c !== 'All')} register={register} required />
                        <SharpInput label="Year" name="year" type="number" register={register} />
                    </div>

                    <div className="border-t border-[#0F0F0F] pt-6">
                        <h3 className="font-body text-[11px] uppercase tracking-[0.3em] text-[#444] mb-4">Pricing</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <SharpInput label="Price (INR)" name="pricing.entryLevel.inr" type="number" register={register} />
                            <SharpInput label="Price (USD)" name="pricing.entryLevel.usd" type="number" register={register} />
                        </div>
                    </div>

                    <div className="border-t border-[#0F0F0F] pt-6">
                        <h3 className="font-body text-[11px] uppercase tracking-[0.3em] text-[#444] mb-4">Core Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                            <SharpSelect label="Frame Material" name="specs.frameMaterial" options={FRAME_MATERIALS} register={register} />
                            <SharpSelect label="Suspension" name="specs.suspensionType" options={SUSPENSION_TYPES} register={register} />
                            <SharpInput label="Weight (kg)" name="specs.weight.min" type="number" register={register} />
                            <SharpInput label="Gears" name="specs.gearCount" type="number" register={register} />
                            <SharpSelect label="Skill Level" name="overview.skillLevel" options={SKILL_LEVELS} register={register} />
                        </div>
                    </div>

                    <div className="sticky bottom-0 bg-bg-dark border-t border-border-subtle pt-4 pb-2 flex justify-end gap-4 mt-8">
                        <button type="button" onClick={onClose} className="px-6 py-2 font-body text-xs uppercase tracking-widest text-text-secondary hover:text-text-primary transition-colors focus:outline-none">
                            Cancel
                        </button>
                        <button type="submit" disabled={isSubmitting} className="px-8 py-2 bg-text-primary text-bg-deepest font-heading text-lg uppercase tracking-widest hover:bg-gold transition-colors focus:outline-none">
                            {isSubmitting ? 'Uploading...' : 'Save Cycle Array'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
