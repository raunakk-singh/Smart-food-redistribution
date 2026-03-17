const mongoose = require('mongoose')

const deliverySchema = new mongoose.Schema({
  donationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Donation', required: true },
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ngoId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  status: { type: String, enum: ['assigned', 'picked', 'delivered'], default: 'assigned' },
}, { timestamps: true })

deliverySchema.index({ volunteerId: 1, status: 1 })
deliverySchema.index({ volunteerId: 1, status: 1, createdAt: -1 })
deliverySchema.index({ status: 1, updatedAt: -1 })

module.exports = mongoose.model('Delivery', deliverySchema)

