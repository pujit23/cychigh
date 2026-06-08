const router = require('express').Router()
const { getUser, saveCycle } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')
router.get('/:id', protect, getUser)
router.post('/:id/save/:cycleId', protect, saveCycle)
module.exports = router
