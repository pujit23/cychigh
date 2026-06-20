const mongoose = require('mongoose')
const RideSchema = new mongoose.Schema({
  user: { type: String },
  date: { type: Date, default: Date.now },
  distance: Number,
  duration: Number,
  avgSpeed: Number,
  topSpeed: Number,
  elevation: Number,
  calories: Number,
  notes: String,
  cycleUsed: String
}, { timestamps: true })
module.exports = mongoose.model('Ride', RideSchema)
