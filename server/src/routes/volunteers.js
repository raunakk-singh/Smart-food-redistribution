const express = require('express')
const Donation = require('../models/Donation')
const Delivery = require('../models/Delivery')
const User = require('../models/User')
const auth = require('../middleware/auth')

const router = express.Router()

// GET /api/volunteer/tasks - Available nearby tasks (status='available', near volunteer)
router.get('/volunteer/tasks', auth(['volunteer']), async (req, res, next) => {
  try {
    const volunteer = req.user
    const maxDistance = parseInt(req.query.distance || 10000) // 10km default
    const now = new Date()

    const tasks = await Donation.aggregate([
      {
        $geoNear: {
          near: volunteer.location,
          distanceField: 'distance',
          maxDistance,
          spherical: true,
          query: {
            status: 'available',
            'expiryTime': { $gt: now }
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'ngo.location',
          foreignField: 'location',
          as: 'ngoUser',
          pipeline: [{ $project: { name: 1, phone: 1 } }]
        }
      },
      { $unwind: { path: '$ngoUser', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          foodName: 1, quantity: 1, serves: 1, restaurant: 1,
          'ngo.name': 1, 'ngo.phone': 1, 'ngo.address': 1,
          distance: { $round: [{ $divide: ['$distance', 1000] }, 1] }, // km
          _id: 1
        }
      },
      { $sort: { distance: 1 } }
    ])

    res.json({ ok: true, tasks })
  } catch (err) {
    next(err)
  }
})

// POST /api/volunteer/tasks/:id/accept
router.post('/volunteer/tasks/:id/accept', auth(['volunteer']), async (req, res, next) => {
  try {
    const { id } = req.params
    const volunteerId = req.user._id
    const session = await Delivery.startSession()
    await session.withTransaction(async () => {
      // Check if volunteer has active task
      const active = await Delivery.findOne({
        volunteerId,
        status: { $in: ['assigned', 'picked'] }
      }).session(session)
      if (active) throw new Error('You already have an active task')

      // Check donation available
      const donation = await Donation.findById(id).session(session)
      if (!donation || donation.status !== 'available') {
        throw new Error('Task no longer available')
      }

      // Create delivery + assign
      const delivery = await Delivery.create([{
        donationId: id,
        volunteerId,
        ngoId: donation.ngo?._id || null
      }], { session })

      await Donation.findByIdAndUpdate(id, { status: 'assigned' }, { session })

      res.json({ ok: true, delivery: delivery[0] })
    })
    session.endSession()
  } catch (err) {
    next(err)
  }
})

// POST /api/volunteer/deliveries/:id/pickup
router.post('/volunteer/deliveries/:id/pickup', auth(['volunteer']), async (req, res, next) => {
  try {
    const { id } = req.params
    const delivery = await Delivery.findById(id).populate('donationId')
    if (!delivery || delivery.volunteerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ ok: false, error: 'Not authorized' })
    }
    if (delivery.status !== 'assigned') {
      return res.status(400).json({ ok: false, error: 'Invalid status' })
    }
    delivery.status = 'picked'
    await delivery.save()
    res.json({ ok: true, delivery })
  } catch (err) {
    next(err)
  }
})

// POST /api/volunteer/deliveries/:id/deliver
router.post('/volunteer/deliveries/:id/deliver', auth(['volunteer']), async (req, res, next) => {
  try {
    const { id } = req.params
    const delivery = await Delivery.findById(id).populate('donationId')
    if (!delivery || delivery.volunteerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ ok: false, error: 'Not authorized' })
    }
    if (delivery.status !== 'picked') {
      return res.status(400).json({ ok: false, error: 'Must pickup first' })
    }
    delivery.status = 'delivered'
    await delivery.save()
    await Donation.findByIdAndUpdate(delivery.donationId._id, { status: 'delivered' })
    res.json({ ok: true, delivery })
  } catch (err) {
    next(err)
  }
})

// GET /api/volunteer/deliveries/active
router.get('/volunteer/deliveries/active', auth(['volunteer']), async (req, res, next) => {
  try {
    const active = await Delivery.findOne({
      volunteerId: req.user._id,
      status: { $in: ['assigned', 'picked'] }
    }).populate('donationId').populate('ngoId', 'name phone')
    res.json({ ok: true, active: active || null })
  } catch (err) {
    next(err)
  }
})

// GET /api/volunteer/history
router.get('/volunteer/history', auth(['volunteer']), async (req, res, next) => {
  try {
    const history = await Delivery.find({
      volunteerId: req.user._id,
      status: 'delivered'
    }).populate('donationId').sort({ updatedAt: -1 }).limit(20)
    res.json({ ok: true, history })
  } catch (err) {
    next(err)
  }
})

// GET /api/volunteer/stats
router.get('/volunteer/stats', auth(['volunteer']), async (req, res, next) => {
  try {
    const total = await Delivery.countDocuments({
      volunteerId: req.user._id,
      status: 'delivered'
    })
    const activeCount = await Delivery.countDocuments({
      volunteerId: req.user._id,
      status: { $in: ['assigned', 'picked'] }
    })
    res.json({ ok: true, total, active: activeCount })
  } catch (err) {
    next(err)
  }
})

module.exports = router

