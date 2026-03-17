const express = require('express')
const FoodItem = require('../models/FoodItem')

const router = express.Router()

// GET /api/foods
router.get('/foods', async (_req, res, next) => {
  try {
    const items = await FoodItem.find().sort({ createdAt: -1 }).lean()
    res.json({ ok: true, items })
  } catch (err) {
    next(err)
  }
})

// POST /api/foods
router.post('/foods', async (req, res, next) => {
  try {
    const { name, calories } = req.body || {}
    const created = await FoodItem.create({ name, calories })
    res.status(201).json({ ok: true, item: created })
  } catch (err) {
    next(err)
  }
})

// DELETE /api/foods/:id
router.delete('/foods/:id', async (req, res, next) => {
  try {
    const deleted = await FoodItem.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ ok: false, error: 'Not found' })
    res.json({ ok: true })
  } catch (err) {
    next(err)
  }
})

module.exports = router

