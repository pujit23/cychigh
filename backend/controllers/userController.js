// TODO: getUser and saveCycle currently cannot function because users only exist
// in Supabase, not in the Mongo User collection. These need to be rewritten to
// query the Supabase 'users' table directly. Until then, they return explicit errors
// instead of crashing on null references.

exports.getUser = async (req, res) => {
  // TODO: Rewrite to query Supabase 'users' table by ID
  res.status(501).json({ success: false, message: 'User profile lookup not yet implemented — pending Supabase integration' })
}

exports.saveCycle = async (req, res) => {
  // TODO: Rewrite to manage saved cycles in Supabase 'users' table
  res.status(501).json({ success: false, message: 'Save cycle not yet implemented — pending Supabase integration' })
}
