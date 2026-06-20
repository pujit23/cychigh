const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://burseayqaxjbkqmuoijp.supabase.co'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
  console.warn('⚠️  SUPABASE_SERVICE_ROLE_KEY not set — admin user management endpoints will fail')
}

// Service-role client bypasses RLS — use only for admin operations
const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey || '', {
  auth: { autoRefreshToken: false, persistSession: false }
})

module.exports = { supabaseAdmin }
