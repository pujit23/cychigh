const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: String,
  savedCycles: [{ type: String }],
  badges: [String],
  isAdmin: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false }
}, { timestamps: true })
module.exports = mongoose.model('User', UserSchema)
