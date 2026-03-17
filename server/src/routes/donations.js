const express = require('express')
const Donation = require('../models/Donation')

const router = express.Router()

// POST /api/donations - donor creates
router.post('/', async (req, res, next) => {
  try {
    const donation = await Donation.create(req.body)
    res.status(201).json({ ok: true, donation })
  } catch (err) {
    next(err)
  }
})

// GET /api/donations/nearby?lat=:lat&amp;lng=:lng&amp;maxDistance=:maxDistance (default 10000m)
router.get('/nearby', async (req, res, next) => {
  try {
    const { lat, lng, maxDistance = 10000 } = req.query
    if (!lat || !lng) return res.status(400).json({ ok: false, error: 'lat and lng required' })

    const point = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    }

    const donations = await Donation.aggregate([
      {
        $geoNear: {
          near: point,
          distanceField: 'dist.calculated',
          maxDistance: parseFloat(maxDistance),
          distanceMultiplier: 0.001,
          spherical: true,
          key: 'restaurant.location'
        }
      },
      { $match: { status: 'available', expiryTime: { $gt: new Date() } } },
      { $limit: 20 },
      { $project: { dist: 0 } }
    ])

    res.json({ ok: true, donations, count: donations.length })
  } catch (err) {
    next(err)
  }
})

module.exports = router
