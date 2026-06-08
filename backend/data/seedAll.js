const mongoose = require('mongoose')
require('dotenv').config()
const Cycle = require('../models/Cycle')

const trekCycles = require('./cyclesToSeed/trek')
const giantCycles = require('./giantCycles')
const specializedCycles = require('./specializedCycles')
const indianCycles = require('./indianCycles')
const globalCycles = require('./globalCycles')
const othersCycles = require('./othersCycles')

const allCycles = [
  ...trekCycles,
  ...giantCycles,
  ...specializedCycles,
  ...indianCycles,
  ...globalCycles,
  ...othersCycles
]

const seedDB = async () => {
  try {
    const options = { serverSelectionTimeoutMS: 5000 }
    await mongoose.connect(process.env.MONGO_URI, options)
    console.log('✅ MongoDB Connected for seeding')

    await Cycle.deleteMany({})
    console.log('🗑️  Cleared existing cycles')

    let count = 0;
    for (const cycle of allCycles) {
      await Cycle.create(cycle);
      count++;
    }

    console.log(`🌱 Seeded ${count} cycles successfully!`)
    console.log(`   Trek: ${trekCycles.length}`)
    console.log(`   Giant: ${giantCycles.length}`)
    console.log(`   Specialized: ${specializedCycles.length}`)
    console.log(`   Indian: ${indianCycles.length}`)
    console.log(`   Global: ${globalCycles.length}`)
    console.log(`   Others: ${othersCycles.length}`)
    console.log(`   Total: ${allCycles.length}`)

    await mongoose.connection.close()
    console.log('✅ Database connection closed')
    process.exit(0)
  } catch (err) {
    console.error('❌ Seed Error:', err.message)
    if (err.writeErrors) {
      console.error('Write Errors:', err.writeErrors.slice(0, 2))
    }
    process.exit(1)
  }
}

seedDB()
