const Cycle = require('../models/Cycle')
const Post = require('../models/Post')

// TODO: getStats user count, getUsers, and banUser currently cannot query real users
// because users only exist in Supabase, not in the Mongo User collection.
// These need to be rewritten to use the Supabase Admin SDK (service-role key) to
// query/manage users. Until then, user-related admin features are non-functional.

exports.getStats = async (req, res) => {
  try {
    const [cycles, posts] = await Promise.all([
      Cycle.countDocuments(),
      Post.countDocuments()
    ])
    // User count is unavailable — Mongo User collection is no longer the source of truth.
    // Return 0 with a flag so the frontend knows this is a known gap.
    res.json({ success: true, stats: { cycles, users: 0, posts, _usersNote: 'User count unavailable — pending Supabase admin integration' } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.getUsers = async (req, res) => {
  // TODO: Rewrite to query Supabase auth.admin.listUsers() with service-role key
  res.status(501).json({ success: false, message: 'User listing not yet implemented — pending Supabase admin integration' })
}

exports.banUser = async (req, res) => {
  // TODO: Rewrite to use Supabase auth.admin.updateUserById() with service-role key
  res.status(501).json({ success: false, message: 'User banning not yet implemented — pending Supabase admin integration' })
}
