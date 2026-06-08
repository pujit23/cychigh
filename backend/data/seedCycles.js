// CycHigh — Master Seed Script
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Cycle from '../models/Cycle.js';
import Admin from '../models/Admin.js';

// Import all seed data
import seedTrek1 from './seedTrek1.js';
import seedTrek2 from './seedTrek2.js';
import seedGiant1 from './seedGiant1.js';
import seedGiant2 from './seedGiant2.js';
import seedSpecialized1 from './seedSpecialized1.js';
import seedSpecialized2 from './seedSpecialized2.js';
import seedIndian1 from './seedIndian1.js';
import seedIndian2 from './seedIndian2.js';
import seedGlobal1 from './seedGlobal1.js';
import seedGlobal2 from './seedGlobal2.js';
import seedOthers1 from './seedOthers1.js';
import seedOthers2 from './seedOthers2.js';

dotenv.config();

const allCycles = [
    ...seedTrek1, ...seedTrek2,
    ...seedGiant1, ...seedGiant2,
    ...seedSpecialized1, ...seedSpecialized2,
    ...seedIndian1, ...seedIndian2,
    ...seedGlobal1, ...seedGlobal2,
    ...seedOthers1, ...seedOthers2,
];

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log('🌱 Starting CycHigh seed...');

        // Clear existing data
        await Cycle.deleteMany({});
        console.log('🗑️  Cleared existing cycles');

        // Create admin user
        const adminExists = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@cychigh.com' });
        if (!adminExists) {
            await Admin.create({
                name: 'CycHigh Admin',
                email: process.env.ADMIN_EMAIL || 'admin@cychigh.com',
                password: process.env.ADMIN_PASSWORD || 'CycHigh@2024!',
                role: 'superadmin',
            });
            console.log('👤 Admin user created');
        } else {
            console.log('👤 Admin user already exists');
        }

        // Insert all cycles
        const inserted = await Cycle.insertMany(allCycles, { ordered: false });
        console.log(`✅ Seeded ${inserted.length} cycles successfully!`);

        // Log brand counts
        const brandCounts = await Cycle.aggregate([
            { $group: { _id: '$brand', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        console.log('\n📊 Cycles by brand:');
        brandCounts.forEach((b) => console.log(`   ${b._id}: ${b.count}`));

        // Log category counts
        const catCounts = await Cycle.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);
        console.log('\n📊 Cycles by category:');
        catCounts.forEach((c) => console.log(`   ${c._id}: ${c.count}`));

        console.log('\n🎉 Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
};

seedDatabase();
