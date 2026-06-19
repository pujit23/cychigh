const { createRemoteJWKSet, jwtVerify } = require('jose')

const JWKS = createRemoteJWKSet(new URL(process.env.SUPABASE_JWKS_URL))

exports.protect = async (req, res, next) => {
  let token
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }
  if (!token) return res.status(401).json({ success: false, message: 'Not authorized' })

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      algorithms: ['ES256'],
    })
    req.user = payload
    next()
  } catch (err) {
    res.status(401).json({ success: false, message: 'Token invalid' })
  }
}

exports.admin = (req, res, next) => {
  if (req.user && req.user.email === process.env.ADMIN_EMAIL) return next()
  res.status(403).json({ success: false, message: 'Admin only' })
}
