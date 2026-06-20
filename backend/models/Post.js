const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String },
  category: { type: String, default: 'general' },
  tags: [String],
  cycleTag: String,
  upvotes: [{ type: String }],
  upvoteCount: { type: Number, default: 0 }
}, { timestamps: true })
module.exports = mongoose.model('Post', PostSchema)
