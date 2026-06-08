// ==============================================
// CycHigh — Part Mongoose Model
// Standalone parts glossary collection
// ==============================================

import mongoose from 'mongoose';

const partModelSchema = new mongoose.Schema({

    // ── Identity ──────────────────────────────────
    name: {
        type: String,
        required: [true, 'Part name is required'],
        trim: true,
        index: true,
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },

    // ── Details ───────────────────────────────────
    description: {
        type: String,
        required: [true, 'Part description is required'],
        default: '',
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Frame',
            'Wheels',
            'Tires',
            'Brakes',
            'Drivetrain',
            'Suspension',
            'Handlebars',
            'Saddle',
            'Pedals',
            'Chain',
            'Gears',
            'Electronics',
            'Accessories',
            'Engine',
            'Exhaust',
            'Lights',
            'Other',
        ],
        index: true,
    },

    // ── Compatibility ─────────────────────────────
    compatibleCycleTypes: [{
        type: String,
        enum: [
            'Mountain Bike',
            'Road Bike',
            'Hybrid Bike',
            'BMX',
            'Folding Bike',
            'Gravel Bike',
            'Cruiser Bike',
            'Electric Bike',
            'Motorcycle',
            'Scooter',
            'All',
        ],
    }],

    // ── Pricing ───────────────────────────────────
    approxCost: {
        inr: { type: String, default: '' },
        usd: { type: String, default: '' },
    },

    // ── Maintenance Info ──────────────────────────
    replaceable: { type: Boolean, default: true },
    avgLifespan: { type: String, default: '' },
    maintenanceTips: [{ type: String }],

    // ── Related Cycles ────────────────────────────
    usedInCycles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cycle',
    }],

    // ── Image ─────────────────────────────────────
    image: { type: String, default: '' },

}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// ─── Text index for search ────────────────────────
partModelSchema.index({ name: 'text', description: 'text', category: 'text' });

// ─── Auto-generate slug ──────────────────────────
partModelSchema.pre('save', function (next) {
    if (!this.slug) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

const Part = mongoose.model('Part', partModelSchema);

export default Part;
