import express from 'express'
import {
  getUsersByBank,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js'
import { validateCreateUser } from '../middleware/validator.js'

const router = express.Router()

// Routes - Order matters: specific routes before dynamic ones
router.get('/bank/:bankId', getUsersByBank)
router.post('/', validateCreateUser, createUser)
router.get('/:id', getUserById)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router

