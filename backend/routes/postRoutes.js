const router = require('express').Router()
const { getPosts, createPost, upvotePost, getComments, addComment } = require('../controllers/postController')
const { protect } = require('../middleware/authMiddleware')
router.get('/', getPosts)
router.post('/', protect, createPost)
router.post('/:id/upvote', protect, upvotePost)
router.get('/:id/comments', getComments)
router.post('/:id/comments', protect, addComment)
module.exports = router
