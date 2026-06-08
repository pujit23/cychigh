const User = require('../models/User')
const generateToken = require('../utils/generateToken')

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ success: false, message: 'Email already exists' })
    const user = await User.create({ username, email, password })
    const token = generateToken(user._id)
    res.status(201).json({ success: true, token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' })
    }
    if (user.isBanned) return res.status(403).json({ success: false, message: 'Account banned' })
    const token = generateToken(user._id, user.isAdmin)
    res.json({ success: true, token, user: { id: user._id, username: user.username, email: user.email, isAdmin: user.isAdmin } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.getMe = async (req, res) => {
  res.json({ success: true, user: req.user })
}
