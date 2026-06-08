const User = require('../models/User')

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.saveCycle = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { cycleId } = req.params
    const idx = user.savedCycles.indexOf(cycleId)
    if (idx > -1) user.savedCycles.splice(idx, 1)
    else user.savedCycles.push(cycleId)
    await user.save()
    res.json({ success: true, savedCycles: user.savedCycles })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
