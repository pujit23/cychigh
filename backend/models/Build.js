const mongoose = require('mongoose')
const BuildSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, default: 'My Build' },
  parts: [{ category: String, brand: String, model: String, weight: Number, cost: Number }],
  totalWeight: Number,
  totalCost: Number,
  isPublic: { type: Boolean, default: false }
}, { timestamps: true })
module.exports = mongoose.model('Build', BuildSchema)
