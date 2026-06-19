const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()

// Connect to MongoDB
connectDB()

// Security
app.use(helmet())
app.use(compression())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})
app.use('/api', limiter)

// CORS
app.use(cors({
  origin: ['http://localhost:3000',
           'http://localhost:5173',
           'http://localhost:3001',
           'http://localhost:3002',
           'http://localhost:3003'],
  credentials: true
}))

// Body parser
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Routes
app.use('/api/cycles', require('./routes/cycleRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/posts', require('./routes/postRoutes'))
app.use('/api/rides', require('./routes/rideRoutes'))
app.use('/api/builds', require('./routes/buildRoutes'))
app.use('/api/alerts', require('./routes/alertRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'))

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'CycHigh API Running',
    timestamp: new Date()
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error'
  })
})

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`)
})
