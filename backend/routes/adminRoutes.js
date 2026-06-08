const router = require('express').Router()
const { getStats, getUsers, banUser } = require('../controllers/adminController')
const { protect, admin } = require('../middleware/authMiddleware')
router.get('/stats', protect, admin, getStats)
router.get('/users', protect, admin, getUsers)
router.put('/users/:id/ban', protect, admin, banUser)
module.exports = router
