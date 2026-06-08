const mongoose = require('mongoose')
const RideSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
