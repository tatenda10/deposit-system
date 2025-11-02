import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

// Import routes
import submissionRoutes from './routes/submissionRoutes.js'
import bankRoutes from './routes/bankRoutes.js'
import userRoutes from './routes/userRoutes.js'
import validationRoutes from './routes/validationRoutes.js'
import fileRoutes from './routes/fileRoutes.js'

// Import middleware
import { errorHandler } from './middleware/errorHandler.js'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Depositors System API is running',
    timestamp: new Date().toISOString()
  })
})

// API Routes
app.use('/api/bank/submissions', submissionRoutes)
app.use('/api/banks', bankRoutes)
app.use('/api/users', userRoutes)
app.use('/api/validations', validationRoutes)
app.use('/api/files', fileRoutes)

// Error handling middleware (must be last)
app.use(errorHandler)

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.method} ${req.path} not found`
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
  console.log(`📁 API endpoints:`)
  console.log(`   - POST /api/bank/submissions/upload`)
  console.log(`   - GET  /api/bank/submissions/all`)
  console.log(`   - GET  /api/bank/submissions/:id`)
  console.log(`   - GET  /api/bank/submissions/bank/:bankId`)
  console.log(`   - GET  /api/banks`)
  console.log(`   - GET  /api/users/bank/:bankId`)
  console.log(`   - GET  /api/validations/submission/:submissionId`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})
