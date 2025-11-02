import { PrismaClient } from '@prisma/client'
import { validateFileStructure } from './validationService.js'

const prisma = new PrismaClient()

/**
 * Process uploaded files and create validation results
 * @param {Object} submission - Submission record
 * @param {Array} files - Uploaded file objects
 * @returns {Object} Validation results
 */
export const processSubmissionFiles = async (submission, files) => {
  const validationResults = []
  const fileRecords = []
  
  for (const file of files) {
    // Validate file structure
    const validation = validateFileStructure(file.path, submission.returnType)
    
    // Create file record
    const fileRecord = await prisma.submissionFile.create({
      data: {
        submissionId: submission.id,
        fileName: file.originalname,
        filePath: file.path,
        fileType: file.mimetype,
        fileSize: file.size
      }
    })
    
    fileRecords.push(fileRecord)
    validationResults.push({
      fileName: file.originalname,
      fileId: fileRecord.id,
      validation: validation
    })
  }
  
  // Calculate overall validation status
  const allValid = validationResults.every(r => r.validation.valid)
  const totalErrors = validationResults.reduce((sum, r) => sum + (r.validation.errors?.length || 0), 0)
  const totalWarnings = validationResults.reduce((sum, r) => sum + (r.validation.warnings?.length || 0), 0)
  
  // Create validation result
  const validationResult = await prisma.validationResult.create({
    data: {
      submissionId: submission.id,
      status: allValid ? 'passed' : totalErrors > 0 ? 'failed' : 'warning',
      errors: totalErrors,
      warnings: totalWarnings,
      details: JSON.stringify(validationResults)
    }
  })
  
  // Create validation details
  for (const result of validationResults) {
    if (result.validation.errors) {
      for (const error of result.validation.errors) {
        await prisma.validationDetail.create({
          data: {
            validationResultId: validationResult.id,
            field: 'File Structure',
            status: 'invalid',
            message: error
          }
        })
      }
    }
    
    if (result.validation.warnings) {
      for (const warning of result.validation.warnings) {
        await prisma.validationDetail.create({
          data: {
            validationResultId: validationResult.id,
            field: 'Data Quality',
            status: 'warning',
            message: warning
          }
        })
      }
    }
  }
  
  // Update submission status
  await prisma.submission.update({
    where: { id: submission.id },
    data: {
      status: allValid ? 'validated' : 'rejected',
      validatedAt: new Date()
    }
  })
  
  return {
    validationResult,
    validationResults,
    fileRecords,
    allValid,
    totalErrors,
    totalWarnings
  }
}


