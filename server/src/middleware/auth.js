const jwt = require('jsonwebtoken')
const User = require('../models/User')

const auth = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '')
      if (!token) return res.status(401).json({ ok: false, error: 'No token, access denied' })

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id).select('-password')
      if (!user) return res.status(401).json({ ok: false, error: 'Invalid token' })

      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ ok: false, error: 'Access denied' })
      }

      req.user = user
      next()
    } catch (err) {
      res.status(401).json({ ok: false, error: 'Invalid token' })
    }
  }
}

module.exports = auth
