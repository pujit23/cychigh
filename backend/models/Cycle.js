const mongoose = require('mongoose')
const CycleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  fullName: { type: String },
  category: { type: String },
  type: { type: String },
  year: { type: Number, default: 2024 },
  image: { type: String },
  tags: [String],
  overview: {
    history: String,
    primaryUse: String,
    skillLevel: String,
    terrain: [String],
    idealFor: String,
    notFor: String
  },
  frame: {
    material: String,
    type: { type: String },
    geometry: String,
    sizes: [String],
    weight: Number,
    internalCableRouting: Boolean,
    dropperPostReady: Boolean
  },
  fork: {
    type: { type: String },
    material: String,
    travel: String,
    brand: String,
    model: String
  },
  wheels: {
    size: String,
    front: {
      rimBrand: String,
      rimType: String,
      tireSize: String,
      tireBrand: String,
      tubelessReady: Boolean,
      valveType: String
    },
    rear: {
      rimBrand: String,
      rimType: String,
      tireSize: String,
      tireBrand: String,
      tubelessReady: Boolean,
      valveType: String
    }
  },
  drivetrain: {
    groupset: String,
    speeds: Number,
    shifterBrand: String,
    frontDerailleur: String,
    rearDerailleur: String,
    cranksetBrand: String,
    chainringSize: String,
    cassetteRange: String,
    pedalIncluded: Boolean
  },
  brakes: {
    type: { type: String },
    front: String,
    rear: String,
    rotorSizeFront: String,
    rotorSizeRear: String
  },
  cockpit: {
    handlebarWidth: String,
    stemLength: String,
    saddleBrand: String,
    dropperPost: Boolean
  },
  pricing: {
    mrp_inr: String,
    mrp_usd: String,
    street_inr: String,
    segment: String,
    availableAt: [String]
  },
  pros: [String],
  cons: [String],
  versions: [{
    year: Number,
    changes: [String],
    price_inr: String
  }],
  upgrades: [{
    part: String,
    suggestion: String,
    reason: String,
    cost_inr: String,
    priority: String
  }],
  skillLevel: String,
  terrain: [String],
  isCustom: { type: Boolean, default: false }
}, { timestamps: true })
module.exports = mongoose.model('Cycle', CycleSchema)
