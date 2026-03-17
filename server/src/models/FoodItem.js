const mongoose = require('mongoose')

const foodItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    calories: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
)

module.exports = mongoose.model('FoodItem', foodItemSchema)

