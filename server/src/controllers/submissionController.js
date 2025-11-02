import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'
import { processSubmissionFiles } from '../services/submissionService.js'

const prisma = new PrismaClient()

// Upload submission
export const uploadSubmission = async (req, res) => {
  try {
    // Handle multer errors first
    if (req.fileValidationError) {
      return res.status(400).json({ error: req.fileValidationError })
    }
    
    const { bankId, userId, period, returnType } = req.body
    
    if (!bankId || !userId || !period || !returnType) {
      return res.status(400).json({
        error: 'Missing required fields: bankId, userId, period, returnType',
        details: {
          bankId: !!bankId,
          userId: !!userId,
          period: !!period,
          returnType: !!returnType
        }
      })
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }
    
    // Validate return type
    const validReturnTypes = ['monthly', 'quarterly', 'scv', 'balance_sheet', 'income_statement']
    if (!validReturnTypes.includes(returnType)) {
      return res.status(400).json({ 
        error: 'Invalid return type',
        validTypes: validReturnTypes,
        received: returnType
      })
    }
    
    // Validate period format
    const periodRegex = /^(20\d{2}-(0[1-9]|1[0-2])|Q[1-4]-20\d{2})$/
    if (!periodRegex.test(period)) {
      return res.status(400).json({ 
        error: 'Invalid period format',
        message: 'period must be in format YYYY-MM (e.g., 2024-01) or Q1-2024',
        received: period
      })
    }
    
    // Create submission
    const submission = await prisma.submission.create({
      data: {
        bankId,
        userId,
        period,
        returnType,
        status: 'pending'
      }
    })
    
    // Process files using service layer
    const { validationResult, validationResults, fileRecords, allValid, totalErrors, totalWarnings } = await processSubmissionFiles(submission, req.files)
    
    res.json({
      success: true,
      submissionId: submission.id,
      status: allValid ? 'validated' : 'rejected',
      validation: {
        status: validationResult.status,
        errors: totalErrors,
        warnings: totalWarnings,
        details: validationResults
      },
      files: fileRecords.map(f => ({
        id: f.id,
        fileName: f.fileName,
        fileSize: f.fileSize
      }))
    })
    
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Get submission by ID
export const getSubmissionById = async (req, res) => {
  try {
    const submission = await prisma.submission.findUnique({
      where: { id: req.params.id },
      include: {
        files: true,
        validationResult: {
          include: {
            details_list: true
          }
        },
        bank: {
          select: {
            bankName: true,
            bankCode: true
          }
        },
        user: {
          select: {
            name: true,
            email: true,
            role: true
          }
        }
      }
    })
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }
    
    res.json(submission)
  } catch (error) {
    console.error('Get submission error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Get all submissions from all banks
export const getAllSubmissions = async (req, res) => {
  try {
    const { returnType, status, period, bankId } = req.query
    
    const where = {}
    
    if (bankId) where.bankId = bankId
    if (returnType) where.returnType = returnType
    if (status) where.status = status
    if (period) where.period = period
    
    const submissions = await prisma.submission.findMany({
      where,
      include: {
        files: {
          select: {
            id: true,
            fileName: true,
            fileSize: true,
            uploadedAt: true
          }
        },
        validationResult: {
          select: {
            id: true,
            status: true,
            errors: true,
            warnings: true,
            validatedAt: true
          }
        },
        bank: {
          select: {
            id: true,
            bankName: true,
            bankCode: true
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    })
    
    res.json({
      success: true,
      count: submissions.length,
      submissions
    })
  } catch (error) {
    console.error('Get all submissions error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Get submissions by bank
export const getSubmissionsByBank = async (req, res) => {
  try {
    const { returnType, status, period } = req.query
    
    const where = {
      bankId: req.params.bankId
    }
    
    if (returnType) where.returnType = returnType
    if (status) where.status = status
    if (period) where.period = period
    
    const submissions = await prisma.submission.findMany({
      where,
      include: {
        files: true,
        validationResult: true,
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        submittedAt: 'desc'
      }
    })
    
    res.json(submissions)
  } catch (error) {
    console.error('Get submissions error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Approve submission
export const approveSubmission = async (req, res) => {
  try {
    const { id } = req.params
    const { reviewerId, comments } = req.body
    
    const submission = await prisma.submission.update({
      where: { id },
      data: {
        status: 'approved',
        approvedAt: new Date(),
        reviewerId: reviewerId || null,
        comments: comments || null
      },
      include: {
        files: true,
        bank: {
          select: {
            bankName: true,
            bankCode: true
          }
        }
      }
    })
    
    res.json({
      success: true,
      submission
    })
  } catch (error) {
    console.error('Approve submission error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Reject submission
export const rejectSubmission = async (req, res) => {
  try {
    const { id } = req.params
    const { reviewerId, comments } = req.body
    
    if (!comments) {
      return res.status(400).json({ error: 'Comments are required for rejection' })
    }
    
    const submission = await prisma.submission.update({
      where: { id },
      data: {
        status: 'rejected',
        rejectedAt: new Date(),
        reviewerId: reviewerId || null,
        comments: comments
      },
      include: {
        files: true,
        bank: {
          select: {
            bankName: true,
            bankCode: true
          }
        }
      }
    })
    
    res.json({
      success: true,
      submission
    })
  } catch (error) {
    console.error('Reject submission error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Delete submission
export const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params
    
    // Get files to delete
    const submission = await prisma.submission.findUnique({
      where: { id },
      include: { files: true }
    })
    
    if (!submission) {
      return res.status(404).json({ error: 'Submission not found' })
    }
    
    // Delete physical files
    for (const file of submission.files) {
      if (fs.existsSync(file.filePath)) {
        fs.unlinkSync(file.filePath)
      }
    }
    
    // Delete from database (cascade will handle related records)
    await prisma.submission.delete({
      where: { id }
    })
    
    res.json({
      success: true,
      message: 'Submission deleted successfully'
    })
  } catch (error) {
    console.error('Delete submission error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Download file
export const downloadFile = async (req, res) => {
  try {
    const { fileId } = req.params
    
    // Get file record from database
    const file = await prisma.submissionFile.findUnique({
      where: { id: fileId },
      include: {
        submission: {
          include: {
            bank: {
              select: {
                bankName: true,
                bankCode: true
              }
            }
          }
        }
      }
    })
    
    if (!file) {
      return res.status(404).json({ error: 'File not found' })
    }
    
    // Check if file exists on disk
    if (!fs.existsSync(file.filePath)) {
      return res.status(404).json({ error: 'File not found on server' })
    }
    
    // Determine MIME type from file extension
    const getMimeType = (fileName) => {
      const ext = path.extname(fileName).toLowerCase()
      const mimeTypes = {
        '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        '.xls': 'application/vnd.ms-excel',
        '.pdf': 'application/pdf'
      }
      return mimeTypes[ext] || 'application/octet-stream'
    }
    
    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`)
    res.setHeader('Content-Type', getMimeType(file.fileName))
    
    // Stream the file
    const fileStream = fs.createReadStream(file.filePath)
    fileStream.pipe(res)
    
    fileStream.on('error', (error) => {
      console.error('File stream error:', error)
      if (!res.headersSent) {
        res.status(500).json({ error: 'Error reading file' })
      }
    })
  } catch (error) {
    console.error('Download file error:', error)
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error', message: error.message })
    }
  }
}

