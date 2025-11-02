import fs from 'fs'
import path from 'path'

/**
 * Ensure directory exists, create if not
 * @param {string} dirPath - Directory path
 */
export const ensureDirectoryExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

/**
 * Delete file if exists
 * @param {string} filePath - File path
 */
export const deleteFileIfExists = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath)
  }
}

/**
 * Get file extension
 * @param {string} fileName - File name
 * @returns {string} File extension (lowercase)
 */
export const getFileExtension = (fileName) => {
  return path.extname(fileName).toLowerCase()
}

/**
 * Format file size
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Check if file is Excel file
 * @param {string} fileName - File name
 * @returns {boolean} True if Excel file
 */
export const isExcelFile = (fileName) => {
  const ext = getFileExtension(fileName)
  return ['.xlsx', '.xls'].includes(ext)
}


