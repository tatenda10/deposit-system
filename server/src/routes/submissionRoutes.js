import express from 'express'
import multer from 'multer'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import {
  uploadSubmission,
  getSubmissionById,
  getAllSubmissions,
  getSubmissionsByBank,
  approveSubmission,
  rejectSubmission,
  deleteSubmission
} from '../controllers/submissionController.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const router = express.Router()

const UPLOAD_DIR = process.env.UPLOAD_DIR || join(__dirname, '../../uploads')

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.xlsx', '.xls']
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.')).toLowerCase()
    if (allowedTypes.includes(ext)) {
      cb(null, true)
    } else {
      req.fileValidationError = 'Invalid file type. Only Excel files (.xlsx, .xls) are allowed.'
      cb(null, false) // Don't throw error, just skip the file
    }
  }
})

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large', message: 'Maximum file size is 10MB' })
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files', message: 'Maximum 10 files allowed per submission' })
    }
    return res.status(400).json({ error: 'File upload error', message: err.message })
  }
  if (err) {
    return res.status(400).json({ error: 'File upload error', message: err.message })
  }
  next()
}

// Routes - Order matters: specific routes before dynamic ones
router.post('/upload', (req, res, next) => {
  upload.array('files', 10)(req, res, (err) => {
    if (err) {
      return handleMulterError(err, req, res, next)
    }
    next()
  })
}, uploadSubmission)
router.get('/all', getAllSubmissions)
router.get('/bank/:bankId', getSubmissionsByBank)
router.put('/:id/approve', approveSubmission)
router.put('/:id/reject', rejectSubmission)
router.get('/:id', getSubmissionById)
router.delete('/:id', deleteSubmission)

export default router

