import pkg from 'xlsx'
const { readFile, utils } = pkg
import { REQUIRED_COLUMNS } from '../config/constants.js'

/**
 * Validate Excel file structure based on return type
 * @param {string} filePath - Path to the Excel file
 * @param {string} returnType - Type of return (monthly, quarterly, scv, balance_sheet, income_statement)
 * @returns {Object} Validation result with valid, errors, warnings, rowCount, headers
 */
export const validateFileStructure = (filePath, returnType) => {
  try {
    const workbook = readFile(filePath)
    
    if (!workbook.SheetNames || workbook.SheetNames.length === 0) {
      return { valid: false, error: 'File contains no sheets' }
    }
    
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]
    const data = utils.sheet_to_json(worksheet, { header: 1 })
    
    if (data.length === 0) {
      return { valid: false, error: 'File is empty' }
    }
    
    const headers = data[0].map(h => String(h).trim()).filter(h => h)
    const errors = []
    const warnings = []
    
    const required = REQUIRED_COLUMNS[returnType] || []
    
    // Check for required columns
    required.forEach(col => {
      if (!headers.includes(col)) {
        errors.push(`Missing required column: ${col}`)
      }
    })
    
    // Validate data rows
    if (data.length > 1) {
      data.slice(1).forEach((row, index) => {
        if (!row || row.length === 0 || row.every(cell => !cell || cell === '')) {
          warnings.push(`Empty row at line ${index + 2}`)
        }
      })
    }
    
    // Type-specific validations
    if (returnType === 'monthly') {
      // Validate numeric columns
      data.slice(1).forEach((row, index) => {
        if (row && row.length > 0) {
          const balanceIndex = headers.indexOf('Balance')
          const balance = row[balanceIndex]
          if (balance !== undefined && (isNaN(balance) || balance < 0)) {
            errors.push(`Invalid balance value at row ${index + 2}`)
          }
        }
      })
    }
    
    return {
      valid: errors.length === 0,
      errors: errors,
      warnings: warnings,
      rowCount: data.length - 1,
      headers: headers
    }
  } catch (error) {
    return { 
      valid: false, 
      error: error.message || 'Failed to read file',
      details: error.stack 
    }
  }
}

/**
 * Parse Excel file and return data
 * @param {string} filePath - Path to the Excel file
 * @returns {Object} Parsed data with sheets and rows
 */
export const parseExcelFile = (filePath) => {
  try {
    const workbook = readFile(filePath)
    const sheets = {}
    
    workbook.SheetNames.forEach(sheetName => {
      const worksheet = workbook.Sheets[sheetName]
      const data = utils.sheet_to_json(worksheet, { header: 1 })
      sheets[sheetName] = {
        headers: data[0] || [],
        rows: data.slice(1) || []
      }
    })
    
    return {
      success: true,
      sheets: sheets,
      sheetNames: workbook.SheetNames
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    }
  }
}

