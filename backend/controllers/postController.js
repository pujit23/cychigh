const Post = require('../models/Post')
const Comment = require('../models/Comment')

exports.getPosts = async (req, res) => {
  try {
    const { category, sort = 'latest' } = req.query
    const query = {}
    if (category && category !== 'all') query.category = category
    const sortObj = sort === 'top' ? { upvoteCount: -1 } : { createdAt: -1 }
    const posts = await Post.find(query).sort(sortObj).populate('author', 'username').limit(50)
    res.json({ success: true, posts })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create({ ...req.body, author: req.user._id })
    res.status(201).json({ success: true, post })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.upvotePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const idx = post.upvotes.indexOf(req.user._id)
    if (idx > -1) {
      post.upvotes.splice(idx, 1)
      post.upvoteCount--
    } else {
      post.upvotes.push(req.user._id)
      post.upvoteCount++
    }
    await post.save()
    res.json({ success: true, upvoteCount: post.upvoteCount })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.id }).populate('author', 'username')
    res.json({ success: true, comments })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.addComment = async (req, res) => {
  try {
    const comment = await Comment.create({ post: req.params.id, author: req.user._id, content: req.body.content })
    res.status(201).json({ success: true, comment })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
