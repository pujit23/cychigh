const jwt = require('jsonwebtoken')
const generateToken = (id, isAdmin = false) => {
  return jwt.sign(
    { id, isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '30d' }
  )
}
module.exports = generateToken
