/**
 * Standard success response
 * @param {Object} res - Express response object
 * @param {Object} data - Response data
 * @param {number} statusCode - HTTP status code
 */
export const successResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    ...data
  })
}

/**
 * Standard error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code
 * @param {Array} details - Error details
 */
export const errorResponse = (res, message, statusCode = 400, details = null) => {
  const response = {
    success: false,
    error: message
  }
  
  if (details) {
    response.details = details
  }
  
  res.status(statusCode).json(response)
}

/**
 * Validation error response
 * @param {Object} res - Express response object
 * @param {Array} errors - Validation errors
 */
export const validationErrorResponse = (res, errors) => {
  errorResponse(res, 'Validation failed', 400, errors)
}


