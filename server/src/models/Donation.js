const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
  foodName: { type: String, required: true, trim: true },
  foodType: { type: String },
  isVeg: { type: String, enum: ['veg', 'nonveg'], default: 'veg' },
  quantity: { type: Number, required: true, min: 1 },
  serves: { type: Number, min: 1 },
  restaurant: {
    name: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true } // [lng, lat]
    }
  },
  ngo: {
    name: { type: String, required: true },
    phone: { type: String },
    address: { type: String, required: true },
    location: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: { type: [Number], required: true }
    }
  },
  expiryTime: { type: Date, required: true },
  pickupWindow: { type: String },
  instructions: { type: String },
  status: { type: String, enum: ['available', 'assigned', 'picked', 'delivered'], default: 'available' },
  picture: { type: String },
}, { timestamps: true })

// Indexes
donationSchema.index({ 'restaurant.location': '2dsphere' })
donationSchema.index({ 'ngo.location': '2dsphere' })
donationSchema.index({ status: 1, expiryTime: 1, 'restaurant.location': '2dsphere' })

module.exports = mongoose.model('Donation', donationSchema)
