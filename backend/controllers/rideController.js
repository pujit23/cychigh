const Ride = require('../models/Ride')

exports.getRides = async (req, res) => {
  try {
    const rides = await Ride.find({ user: req.user._id }).sort({ date: -1 })
    res.json({ success: true, rides })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.addRide = async (req, res) => {
  try {
    const ride = await Ride.create({ ...req.body, user: req.user._id })
    res.status(201).json({ success: true, ride })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.deleteRide = async (req, res) => {
  try {
    await Ride.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
