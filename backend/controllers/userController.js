const { supabaseAdmin } = require('../config/supabaseAdmin')

exports.getUser = async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error && error.code === 'PGRST116') {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    if (error) throw error

    res.json({ success: true, user: data })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.saveCycle = async (req, res) => {
  try {
    const userId = req.params.id
    const { cycleId } = req.params

    // Fetch current saved_cycles
    const { data: user, error: fetchErr } = await supabaseAdmin
      .from('users')
      .select('saved_cycles')
      .eq('id', userId)
      .single()

    if (fetchErr && fetchErr.code === 'PGRST116') {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    if (fetchErr) throw fetchErr

    let savedCycles = user.saved_cycles || []

    // Toggle: add if not present, remove if already saved
    const idx = savedCycles.indexOf(cycleId)
    if (idx > -1) {
      savedCycles.splice(idx, 1)
    } else {
      savedCycles.push(cycleId)
    }

    // Update the row
    const { data: updated, error: updateErr } = await supabaseAdmin
      .from('users')
      .update({ saved_cycles: savedCycles })
      .eq('id', userId)
      .select('saved_cycles')
      .single()

    if (updateErr) throw updateErr

    res.json({ success: true, savedCycles: updated.saved_cycles })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
