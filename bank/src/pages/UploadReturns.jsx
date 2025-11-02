import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api, DEMO_BANK_ID, DEMO_USER_ID } from '../config/api'
import {
  Upload,
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  Download,
  RefreshCw,
  Eye,
  Clock,
  Building2,
  DollarSign,
  BarChart3
} from 'lucide-react'

const UploadReturns = () => {
  const { user } = useAuth()
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploadStatus, setUploadStatus] = useState('idle') // idle, uploading, success, error
  const [validationResults, setValidationResults] = useState(null)

  const returnTypes = [
    { id: 'monthly', name: 'Monthly Returns', description: 'Monthly deposit and financial data' },
    { id: 'quarterly', name: 'Quarterly Returns', description: 'Quarterly consolidated returns' },
    { id: 'balance_sheet', name: 'Balance Sheet', description: 'Balance sheet financial data' },
    { id: 'income_statement', name: 'Income Statement', description: 'Income statement financial data' },
    { id: 'scv', name: 'SCV Data', description: 'Single Customer View data' }
  ]

  const availablePeriods = [
    { value: '2024-01', label: 'January 2024' },
    { value: '2024-02', label: 'February 2024' },
    { value: '2024-03', label: 'March 2024' },
    { value: '2024-Q1', label: 'Q1 2024' },
    { value: '2024-Q2', label: 'Q2 2024' }
  ]

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setUploadedFiles(files)
    // Reset status when new files are selected
    if (uploadStatus !== 'idle') {
      setUploadStatus('idle')
      setValidationResults(null)
    }
  }
  
  const handleReset = () => {
    setSelectedPeriod('')
    setSelectedType('')
    setUploadedFiles([])
    setUploadStatus('idle')
    setValidationResults(null)
  }

  const handleUpload = async () => {
    if (!selectedPeriod || !selectedType || uploadedFiles.length === 0) {
      alert('Please select period, type, and upload files')
      return
    }

    setUploadStatus('uploading')
    setValidationResults(null) // Clear previous results
    
    try {
      // Create FormData for multipart/form-data request
      const formData = new FormData()
      formData.append('bankId', DEMO_BANK_ID)
      formData.append('userId', DEMO_USER_ID)
      formData.append('period', selectedPeriod)
      formData.append('returnType', selectedType)
      
      // Append all files
      uploadedFiles.forEach((file) => {
        console.log('Appending file:', file.name, file.size, file.type)
        formData.append('files', file)
      })
      
      console.log('FormData contents:', {
        bankId: DEMO_BANK_ID,
        userId: DEMO_USER_ID,
        period: selectedPeriod,
        returnType: selectedType,
        fileCount: uploadedFiles.length
      })
      
      // Call the API
      const response = await api.uploadSubmission(formData)
      
      // Process the response
      if (response.success) {
        setUploadStatus('success')
        
        // Transform validation details to match UI format
        const validationDetails = []
        
        if (response.validation?.details) {
          response.validation.details.forEach((fileDetail) => {
            if (fileDetail.validation?.errors) {
              fileDetail.validation.errors.forEach((error) => {
                validationDetails.push({
                  field: fileDetail.fileName,
                  status: 'Invalid',
                  message: error
                })
              })
            }
            if (fileDetail.validation?.warnings) {
              fileDetail.validation.warnings.forEach((warning) => {
                validationDetails.push({
                  field: fileDetail.fileName,
                  status: 'Warning',
                  message: warning
                })
              })
            }
          })
        }
        
        // If validation passed
        if (response.validation?.status === 'passed') {
          validationDetails.push(
            { field: 'File Format', status: 'Valid', message: 'Excel format confirmed' },
            { field: 'Data Structure', status: 'Valid', message: 'All required columns present' },
            { field: 'Data Validation', status: 'Valid', message: 'No missing or invalid data' }
          )
        }
        
        setValidationResults({
          status: response.validation?.status === 'passed' ? 'success' : 'error',
          message: response.validation?.status === 'passed' 
            ? 'Files uploaded successfully and validation passed'
            : `Validation ${response.validation?.status === 'warning' ? 'completed with warnings' : 'failed'}. ${response.validation?.errors || 0} error(s), ${response.validation?.warnings || 0} warning(s).`,
          submissionId: response.submissionId,
          details: validationDetails.length > 0 ? validationDetails : [
            { field: 'Upload', status: 'Valid', message: 'Files uploaded successfully' }
          ]
        })
        
        // Clear uploaded files on success
        setUploadedFiles([])
      } else {
        throw new Error('Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadStatus('error')
      
      // Extract error details if available
      let errorMessage = error.message || 'An error occurred during upload. Please try again.'
      
      // Check for specific error types
      if (errorMessage.includes('Cannot connect to server')) {
        errorMessage = 'Cannot connect to the server. Please make sure the backend server is running on port 5000.'
      } else if (errorMessage.includes('NetworkError') || errorMessage.includes('Failed to fetch')) {
        errorMessage = 'Network error. Please check your connection and make sure the backend server is running.'
      }
      
      setValidationResults({
        status: 'error',
        message: errorMessage,
        details: [
          { field: 'Upload Error', status: 'Invalid', message: errorMessage }
        ]
      })
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Valid': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Invalid': return <XCircle className="h-4 w-4 text-red-600" />
      case 'Warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Valid': return 'text-green-600 bg-green-100 border-green-200'
      case 'Invalid': return 'text-red-600 bg-red-100 border-red-200'
      case 'Warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Upload Returns</h1>
            <p className="text-sm text-gray-600">Submit regulatory returns and financial data</p>
            <p className="text-xs text-gray-500">{user?.bankName} - {user?.role}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleReset}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
            <a 
              href="/assets/Sample_Balance_Sheet.xlsx" 
              download
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1"
            >
              <Download className="h-3 w-3" />
              Templates
            </a>
          </div>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-white border border-gray-300 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Upload New Returns</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Period Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reporting Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Period</option>
              {availablePeriods.map((period) => (
                <option key={period.value} value={period.value}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>

          {/* Return Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Return Type
            </label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Type</option>
              {returnTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* File Upload */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Files
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-sm text-gray-600 mb-4">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p>Excel files (.xlsx, .xls) up to 10MB</p>
            </div>
            <input
              type="file"
              multiple
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-block"
            >
              Choose Files
            </label>
          </div>
          
          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-900">{file.name}</span>
                      <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button
                      onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Upload Button */}
        <div className="mt-6">
          <button
            onClick={handleUpload}
            disabled={!selectedPeriod || !selectedType || uploadedFiles.length === 0 || uploadStatus === 'uploading'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
          >
            {uploadStatus === 'uploading' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : uploadStatus === 'error' ? (
              <>
                <XCircle className="h-4 w-4 mr-2" />
                Upload Failed - Try Again
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload Returns
              </>
            )}
          </button>
        </div>
      </div>

      {/* Validation Results */}
      {validationResults && (
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex items-center gap-2 mb-4">
            {validationResults.status === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <XCircle className="h-5 w-5 text-red-600" />
            )}
            <h2 className="text-lg font-semibold text-gray-800">Validation Results</h2>
          </div>
          
          <div className={`p-4 rounded-lg mb-4 ${
            validationResults.status === 'success' 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <p className={`font-medium ${
              validationResults.status === 'success' ? 'text-green-800' : 'text-red-800'
            }`}>
              {validationResults.message}
            </p>
          </div>

          <div className="space-y-3">
            {validationResults.details.map((detail, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(detail.status)}
                  <span className="font-medium text-gray-900">{detail.field}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(detail.status)} border rounded`}>
                    {detail.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {validationResults.status === 'success' && (
            <div className="mt-6 flex gap-2">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Submit for Review
              </button>
              <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Download Report
              </button>
            </div>
          )}
        </div>
      )}

      {/* Recent Uploads */}
      <div className="bg-white border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800">Recent Uploads</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              {
                id: 1,
                period: 'December 2023',
                type: 'Monthly Returns',
                status: 'Under Review',
                uploadedDate: '2024-01-15',
                files: 2
              },
              {
                id: 2,
                period: 'November 2023',
                type: 'Monthly Returns',
                status: 'Approved',
                uploadedDate: '2024-01-10',
                files: 2
              },
              {
                id: 3,
                period: 'Q3 2023',
                type: 'Quarterly Returns',
                status: 'Rejected',
                uploadedDate: '2024-01-05',
                files: 1
              }
            ].map((upload) => (
              <div key={upload.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{upload.period} - {upload.type}</p>
                    <p className="text-sm text-gray-600">{upload.files} files uploaded on {upload.uploadedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                    upload.status === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
                    upload.status === 'Under Review' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    'bg-red-100 text-red-800 border-red-200'
                  } border rounded`}>
                    {upload.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadReturns
