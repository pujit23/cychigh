const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})
UserSchema.methods.matchPassword = async function(pwd) {
  return await bcrypt.compare(pwd, this.password)
}
module.exports = mongoose.model('User', UserSchema)
