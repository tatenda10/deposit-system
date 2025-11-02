import express from 'express'
import { downloadFile } from '../controllers/submissionController.js'

const router = express.Router()

// File download route
router.get('/:fileId/download', downloadFile)

export default router

