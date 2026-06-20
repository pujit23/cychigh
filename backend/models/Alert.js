const mongoose = require('mongoose')
const AlertSchema = new mongoose.Schema({
  user: { type: String },
  type: String,
  message: String,
  link: String,
  read: { type: Boolean, default: false }
}, { timestamps: true })
module.exports = mongoose.model('Alert', AlertSchema)
