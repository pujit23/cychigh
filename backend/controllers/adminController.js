const Cycle = require('../models/Cycle')
const Post = require('../models/Post')
const { supabaseAdmin } = require('../config/supabaseAdmin')

exports.getStats = async (req, res) => {
  try {
    const [cycles, posts, usersResult] = await Promise.all([
      Cycle.countDocuments(),
      Post.countDocuments(),
      supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1 })
    ])

    // listUsers returns total in the response — use it for the count
    const userCount = usersResult.data?.users
      ? (await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 })).data.users.length
      : 0

    res.json({ success: true, stats: { cycles, users: userCount, posts } })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.getUsers = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 })
    if (error) throw error

    const users = data.users.map(u => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
      display_name: u.user_metadata?.full_name || u.email?.split('@')[0] || 'Unknown',
      banned: !!u.banned_until && new Date(u.banned_until) > new Date()
    }))

    res.json({ success: true, users })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.banUser = async (req, res) => {
  try {
    // First check current ban status by fetching the user
    const { data: existing, error: fetchErr } = await supabaseAdmin.auth.admin.getUserById(req.params.id)
    if (fetchErr) throw fetchErr
    if (!existing?.user) return res.status(404).json({ success: false, message: 'User not found' })

    const isBanned = !!existing.user.banned_until && new Date(existing.user.banned_until) > new Date()

    if (isBanned) {
      // Unban: set ban_duration to 0 (removes the ban)
      const { error } = await supabaseAdmin.auth.admin.updateUserById(req.params.id, {
        ban_duration: '0'
      })
      if (error) throw error
      res.json({ success: true, message: 'User unbanned', banned: false })
    } else {
      // Ban: set a very long ban duration (effectively permanent)
      const { error } = await supabaseAdmin.auth.admin.updateUserById(req.params.id, {
        ban_duration: '876000h' // ~100 years
      })
      if (error) throw error
      res.json({ success: true, message: 'User banned', banned: true })
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
