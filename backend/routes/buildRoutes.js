const Build = require('../models/Build')
const router = require('express').Router()
const { protect } = require('../middleware/authMiddleware')
router.get('/', protect, async (req, res) => {
  const builds = await Build.find({ user: req.user._id })
  res.json({ success: true, builds })
})
router.post('/', protect, async (req, res) => {
  const build = await Build.create({ ...req.body, user: req.user._id })
  res.status(201).json({ success: true, build })
})
router.delete('/:id', protect, async (req, res) => {
  await Build.findByIdAndDelete(req.params.id)
  res.json({ success: true })
})
module.exports = router
