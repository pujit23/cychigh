// ==============================================
// CycHigh — Admin Mongoose Model
// JWT-based admin authentication
// ==============================================

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminSchema = new mongoose.Schema({

    // ── Credentials ───────────────────────────────
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters'],
        select: false, // never return password in queries by default
    },

    // ── Profile ───────────────────────────────────
    name: {
        type: String,
        default: 'Admin',
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'admin',
    },

    // ── Status ────────────────────────────────────
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
        default: null,
    },

}, {
    timestamps: true,
});

// ─── Hash password before saving ──────────────────
adminSchema.pre('save', async function (next) {
    // Only hash if password is modified or new
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// ─── Compare entered password with hashed ─────────
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
