const mongoose = require('mongoose')
require('dotenv').config()
const Cycle = require('../models/Cycle')

mongoose.connect(process.env.MONGO_URI, { tlsAllowInvalidCertificates: true })
  .then(async () => {
    console.log('Connected')
    const count = await Cycle.countDocuments()
    console.log('Cycle count:', count)
    if (count > 0) {
      const sample = await Cycle.findOne()
      console.log('Sample cycle:', sample.name, '-', sample.brand)
    }
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log('Collections:', collections.map(c => c.name).join(', '))
    await mongoose.connection.close()
    process.exit(0)
  })
  .catch(err => {
    console.error('Error:', err.message)
    process.exit(1)
  })
