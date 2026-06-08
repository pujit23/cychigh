const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: { type: String, default: 'general' },
  tags: [String],
  cycleTag: String,
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  upvoteCount: { type: Number, default: 0 }
}, { timestamps: true })
module.exports = mongoose.model('Post', PostSchema)
