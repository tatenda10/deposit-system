// Validation middleware for request bodies
import { RETURN_TYPES, USER_ROLES } from '../config/constants.js'
import { validationErrorResponse } from '../utils/response.js'

export const validateUploadSubmission = (req, res, next) => {
  const { bankId, userId, period, returnType } = req.body
  
  const errors = []
  
  if (!bankId) errors.push('bankId is required')
  if (!userId) errors.push('userId is required')
  if (!period) errors.push('period is required')
  if (!returnType) errors.push('returnType is required')
  
  // Validate return type
  const validReturnTypes = Object.values(RETURN_TYPES)
  if (returnType && !validReturnTypes.includes(returnType)) {
    errors.push(`returnType must be one of: ${validReturnTypes.join(', ')}`)
  }
  
  // Validate period format
  if (period) {
    const periodRegex = /^(20\d{2}-(0[1-9]|1[0-2])|Q[1-4]-20\d{2})$/
    if (!periodRegex.test(period)) {
      errors.push('period must be in format YYYY-MM (e.g., 2024-01) or Q1-2024')
    }
  }
  
  if (errors.length > 0) {
    return validationErrorResponse(res, errors)
  }
  
  next()
}

export const validateCreateBank = (req, res, next) => {
  const { bankCode, bankName, email } = req.body
  
  const errors = []
  
  if (!bankCode) errors.push('bankCode is required')
  if (!bankName) errors.push('bankName is required')
  if (!email) errors.push('email is required')
  
  // Validate email format
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('email must be a valid email address')
  }
  
  if (errors.length > 0) {
    return validationErrorResponse(res, errors)
  }
  
  next()
}

export const validateCreateUser = (req, res, next) => {
  const { bankId, name, email, role, password } = req.body
  
  const errors = []
  
  if (!bankId) errors.push('bankId is required')
  if (!name) errors.push('name is required')
  if (!email) errors.push('email is required')
  if (!role) errors.push('role is required')
  if (!password) errors.push('password is required')
  
  // Validate email format
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push('email must be a valid email address')
  }
  
  // Validate role
  const validRoles = Object.values(USER_ROLES)
  if (role && !validRoles.includes(role)) {
    errors.push(`role must be one of: ${validRoles.join(', ')}`)
  }
  
  // Validate password strength
  if (password && password.length < 6) {
    errors.push('password must be at least 6 characters long')
  }
  
  if (errors.length > 0) {
    return validationErrorResponse(res, errors)
  }
  
  next()
}

