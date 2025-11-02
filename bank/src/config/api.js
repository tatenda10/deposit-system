// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

// For demo purposes - use the test IDs we created
// TODO: Replace with actual user data from authentication
export const DEMO_BANK_ID = 'cmhhc6y5t00001vxm3ek6lxgj'
export const DEMO_USER_ID = 'cmhhc6ya700021vxmri14apv5'

export const api = {
  API_BASE_URL, // Export for use in components
  // Submission endpoints
  uploadSubmission: async (formData) => {
    try {
      console.log('Uploading to:', `${API_BASE_URL}/api/bank/submissions/upload`)
      
      const response = await fetch(`${API_BASE_URL}/api/bank/submissions/upload`, {
        method: 'POST',
        body: formData
        // Don't set Content-Type header - browser will set it automatically with boundary for multipart/form-data
      })
      
      console.log('Response status:', response.status, response.statusText)
      
      const data = await response.json()
      
      if (!response.ok) {
        console.error('Upload error response:', data)
        throw new Error(data.error || data.message || 'Upload failed')
      }
      
      console.log('Upload success:', data)
      return data
    } catch (error) {
      console.error('Upload fetch error:', error)
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error(`Cannot connect to server at ${API_BASE_URL}. Make sure the backend is running.`)
      }
      throw error
    }
  },
  
  getSubmission: async (submissionId) => {
    const response = await fetch(`${API_BASE_URL}/api/bank/submissions/${submissionId}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch submission')
    }
    
    return response.json()
  },
  
  getSubmissionsByBank: async (bankId, params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    const response = await fetch(`${API_BASE_URL}/api/bank/submissions/bank/${bankId}?${queryString}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch submissions')
    }
    
    return response.json()
  },
  
  getSubmissionById: async (submissionId) => {
    const response = await fetch(`${API_BASE_URL}/api/bank/submissions/${submissionId}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch submission')
    }
    
    return response.json()
  }
}

