const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { connectToDatabase } = require('./db')
const healthRoutes = require('./routes/health')
const foodRoutes = require('./routes/foods')

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  })
)
app.use(express.json())

app.use('/api', healthRoutes)
app.use('/api', foodRoutes)

app.use((err, _req, res, _next) => {
  const message = err?.message || 'Server error'
  const status = err?.name === 'ValidationError' ? 400 : 500
  res.status(status).json({ ok: false, error: message })
})

const port = Number(process.env.PORT || 5000)

async function start() {
  await connectToDatabase(process.env.MONGODB_URI)

  app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})

