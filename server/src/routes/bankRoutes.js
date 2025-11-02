import express from 'express'
import {
  getAllBanks,
  getBankById,
  createBank,
  updateBank,
  deleteBank
} from '../controllers/bankController.js'
import { validateCreateBank } from '../middleware/validator.js'

const router = express.Router()

// Routes
router.get('/', getAllBanks)
router.get('/:id', getBankById)
router.post('/', validateCreateBank, createBank)
router.put('/:id', updateBank)
router.delete('/:id', deleteBank)

export default router

