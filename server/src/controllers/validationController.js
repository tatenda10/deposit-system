import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Get validation result by submission ID
export const getValidationResult = async (req, res) => {
  try {
    const validationResult = await prisma.validationResult.findUnique({
      where: { submissionId: req.params.submissionId },
      include: {
        details_list: true,
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
    
    if (!validationResult) {
      return res.status(404).json({ error: 'Validation result not found' })
    }
    
    res.json(validationResult)
  } catch (error) {
    console.error('Get validation result error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}

// Get all validation results
export const getAllValidationResults = async (req, res) => {
  try {
    const { status, minErrors, minWarnings } = req.query
    
    const where = {}
    if (status) where.status = status
    if (minErrors) where.errors = { gte: parseInt(minErrors) }
    if (minWarnings) where.warnings = { gte: parseInt(minWarnings) }
    
    const validationResults = await prisma.validationResult.findMany({
      where,
      include: {
        submission: {
          include: {
            bank: {
              select: {
                bankName: true,
                bankCode: true
              }
            },
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            details_list: true
          }
        }
      },
      orderBy: {
        validatedAt: 'desc'
      }
    })
    
    res.json(validationResults)
  } catch (error) {
    console.error('Get validation results error:', error)
    res.status(500).json({ error: 'Internal server error', message: error.message })
  }
}


