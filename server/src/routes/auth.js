const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const router = express.Router()

// POST /api/auth/register
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, phone, lat, lng, role = 'volunteer' } = req.body
    const location = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    }
    const user = await User.create({ name, email, password, phone, location, role })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.status(201).json({ ok: true, token, user: { id: user._id, name, email, role } })
  } catch (err) {
    next(err)
  }
})

// POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ ok: false, error: 'Invalid credentials' })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ ok: true, token, user: { id: user._id, name: user.name, email, role: user.role } })
  } catch (err) {
    next(err)
  }
})

// Protected test
router.get('/profile', auth(), (req, res) => {
  res.json({ ok: true, user: req.user })
})

module.exports = router
