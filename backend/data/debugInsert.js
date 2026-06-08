const mongoose = require('mongoose')
require('dotenv').config()
const Cycle = require('../models/Cycle')

mongoose.connect(process.env.MONGO_URI, { tlsAllowInvalidCertificates: true })
  .then(async () => {
    try {
      console.log('Connected. Starting debug...')
      const trekCycles = require('./trekCycles')
      const firstCycle = trekCycles[0]
      console.log('Inserting cycle:', firstCycle.id)
      
      const res = await Cycle.create(firstCycle)
      console.log('Insertion successful, object returned:', res.id)
      
      const count = await Cycle.countDocuments()
      console.log('Count right after insert:', count)
      
      const doc = await Cycle.findOne()
      console.log('Found doc from DB:', doc ? doc.id : 'NONE')
      
    } catch (err) {
      console.error('Insertion failed:', err.message)
      if (err.errors) console.error(err.errors)
    }
    await mongoose.connection.close()
    process.exit(0)
  })
