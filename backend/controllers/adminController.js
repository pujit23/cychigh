const User = require('../models/User')
const Cycle = require('../models/Cycle')
const Post = require('../models/Post')

exports.getStats = async (req, res) => {
  try {
    const [cycles, users, posts] = await Promise.all([
      Cycle.countDocuments(),
      User.countDocuments(),
      Post.countDocuments()
    ])
    res.json({ success: true, stats: { cycles, users, posts } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json({ success: true, users })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.banUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    user.isBanned = !user.isBanned
    await user.save()
    res.json({ success: true, message: user.isBanned ? 'Banned' : 'Unbanned' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
