const Alert = require('../models/Alert')
const router = require('express').Router()
const { protect } = require('../middleware/authMiddleware')
router.get('/', protect, async (req, res) => {
  const alerts = await Alert.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json({ success: true, alerts })
})
router.delete('/:id', protect, async (req, res) => {
  await Alert.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})
module.exports = router
