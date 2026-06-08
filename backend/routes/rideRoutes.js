const router = require('express').Router()
const { getRides, addRide, deleteRide } = require('../controllers/rideController')
const { protect } = require('../middleware/authMiddleware')
router.get('/', protect, getRides)
router.post('/', protect, addRide)
router.delete('/:id', protect, deleteRide)
module.exports = router
