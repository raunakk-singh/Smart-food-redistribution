const mongoose = require('mongoose')

async function connectToDatabase(mongoUri) {
  if (!mongoUri) {
    throw new Error('Missing MONGODB_URI')
  }

  mongoose.set('strictQuery', true)
  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })
  } catch (err) {
    const hint =
      `Could not connect to MongoDB.\n` +
      `- If using local MongoDB: make sure it is installed + running (port 27017)\n` +
      `- If using MongoDB Atlas: set MONGODB_URI in server/.env to your Atlas URI`
    err.message = `${err.message}\n\n${hint}`
    throw err
  }
}

module.exports = { connectToDatabase }

