import express from 'express'
import {
  getValidationResult,
  getAllValidationResults
} from '../controllers/validationController.js'

const router = express.Router()

// Routes
router.get('/', getAllValidationResults)
router.get('/submission/:submissionId', getValidationResult)

export default router


