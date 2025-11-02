import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Calendar,
  Clock,
  Download,
  Eye,
  RefreshCw,
  Filter,
  Search,
  Building2,
  TrendingUp,
  TrendingDown,
  X
} from 'lucide-react'

const ValidationResults = () => {
  const { user } = useAuth()
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedResult, setSelectedResult] = useState(null)

  // Mock validation results data
  const validationResults = [
    {
      id: 'VAL-2024-001',
      submissionId: 'SUB-2024-001',
      period: 'December 2023',
      type: 'Monthly Returns',
      status: 'Passed',
      submittedDate: '2024-01-15',
      validatedDate: '2024-01-15',
      totalErrors: 0,
      totalWarnings: 2,
      details: [
        { field: 'File Format', status: 'Valid', message: 'Excel format confirmed' },
        { field: 'Data Structure', status: 'Valid', message: 'All required columns present' },
        { field: 'Data Validation', status: 'Valid', message: 'No missing or invalid data' },
        { field: 'Totals Check', status: 'Warning', message: 'Minor discrepancy in calculated totals' },
        { field: 'Date Validation', status: 'Warning', message: 'Some dates outside expected range' }
      ]
    },
    {
      id: 'VAL-2024-002',
      submissionId: 'SUB-2024-002',
      period: 'November 2023',
      type: 'Monthly Returns',
      status: 'Failed',
      submittedDate: '2024-01-10',
      validatedDate: '2024-01-10',
      totalErrors: 3,
      totalWarnings: 1,
      details: [
        { field: 'File Format', status: 'Valid', message: 'Excel format confirmed' },
        { field: 'Data Structure', status: 'Invalid', message: 'Missing required columns: Account_Type' },
        { field: 'Data Validation', status: 'Invalid', message: 'Negative balances found in 5 records' },
        { field: 'Totals Check', status: 'Invalid', message: 'Total deposits mismatch by $50,000' },
        { field: 'Date Validation', status: 'Warning', message: 'Some dates outside expected range' }
      ]
    },
    {
      id: 'VAL-2024-003',
      submissionId: 'SUB-2024-003',
      period: 'Q3 2023',
      type: 'Quarterly Returns',
      status: 'Passed',
      submittedDate: '2024-01-05',
      validatedDate: '2024-01-05',
      totalErrors: 0,
      totalWarnings: 0,
      details: [
        { field: 'File Format', status: 'Valid', message: 'Excel format confirmed' },
        { field: 'Data Structure', status: 'Valid', message: 'All required columns present' },
        { field: 'Data Validation', status: 'Valid', message: 'No missing or invalid data' },
        { field: 'Totals Check', status: 'Valid', message: 'Calculated totals match' },
        { field: 'Date Validation', status: 'Valid', message: 'All dates within expected range' }
      ]
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Passed': return 'text-green-600 bg-green-100 border-green-200'
      case 'Failed': return 'text-red-600 bg-red-100 border-red-200'
      case 'Pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getFieldStatusColor = (status) => {
    switch (status) {
      case 'Valid': return 'text-green-600'
      case 'Invalid': return 'text-red-600'
      case 'Warning': return 'text-yellow-600'
      default: return 'text-gray-600'
    }
  }

  const getFieldStatusIcon = (status) => {
    switch (status) {
      case 'Valid': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Invalid': return <XCircle className="h-4 w-4 text-red-600" />
      case 'Warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const filteredResults = validationResults.filter(result => {
    const matchesStatus = filterStatus === 'All' || result.status === filterStatus
    const matchesSearch = result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.period.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const handleViewResult = (result) => {
    setSelectedResult(result)
    setShowViewModal(true)
  }

  const handleDownloadReport = (result) => {
    // Simulate report download
    const blob = new Blob(['Validation report content would be here'], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `validation_report_${result.id}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const totalSubmissions = validationResults.length
  const passedSubmissions = validationResults.filter(r => r.status === 'Passed').length
  const failedSubmissions = validationResults.filter(r => r.status === 'Failed').length
  const totalErrors = validationResults.reduce((sum, r) => sum + r.totalErrors, 0)
  const totalWarnings = validationResults.reduce((sum, r) => sum + r.totalWarnings, 0)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Validation Results</h1>
            <p className="text-xs text-gray-600">View detailed validation reports for your submissions</p>
            <p className="text-xs text-gray-500">{user?.bankName} - {user?.role}</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              Refresh
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1">
              <Download className="h-3 w-3" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 border border-blue-300">
              <FileText className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Submissions</h3>
              <p className="text-lg font-bold text-blue-700">{totalSubmissions}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 border border-green-300">
              <CheckCircle className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Passed</h3>
              <p className="text-lg font-bold text-green-700">{passedSubmissions}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 border border-red-300">
              <XCircle className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Failed</h3>
              <p className="text-lg font-bold text-red-700">{failedSubmissions}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 border border-red-300">
              <AlertTriangle className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Errors</h3>
              <p className="text-lg font-bold text-red-700">{totalErrors}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 border border-yellow-300">
              <AlertTriangle className="h-5 w-5 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Warnings</h3>
              <p className="text-lg font-bold text-yellow-700">{totalWarnings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-300 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Passed">Passed</option>
              <option value="Failed">Failed</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="relative">
              <Search className="h-3 w-3 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search validations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Validation Results List */}
      <div className="space-y-3">
        {filteredResults.map((result) => (
          <div key={result.id} className="bg-white border border-gray-300">
            <div className="p-4 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">{result.period} - {result.type}</h3>
                    <p className="text-xs text-gray-600">Validation ID: {result.id}</p>
                    <p className="text-xs text-gray-500">Submitted: {result.submittedDate} | Validated: {result.validatedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(result.status)} border rounded`}>
                        {result.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                      <span className="flex items-center gap-1">
                        <XCircle className="h-3 w-3 text-red-600" />
                        {result.totalErrors} errors
                      </span>
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 text-yellow-600" />
                        {result.totalWarnings} warnings
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => handleViewResult(result)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      View
                    </button>
                    <button 
                      onClick={() => handleDownloadReport(result)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                    >
                      <Download className="h-3 w-3" />
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Validation Details */}
            <div className="p-4">
              <h4 className="text-sm font-semibold text-gray-800 mb-3">Validation Details</h4>
              <div className="space-y-2">
                {result.details.map((detail, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getFieldStatusIcon(detail.status)}
                      <span className="text-xs font-medium text-gray-900">{detail.field}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-medium ${getFieldStatusColor(detail.status)}`}>
                        {detail.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {result.status === 'Failed' && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <h5 className="text-sm font-medium text-red-800 mb-2">Action Required</h5>
                  <p className="text-xs text-red-700">
                    Please correct the errors identified above and resubmit your returns. 
                    Contact support if you need assistance with the validation errors.
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 text-xs font-medium rounded-lg">
                      Download Error Report
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 text-xs font-medium rounded-lg">
                      Resubmit Returns
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Validation Guidelines */}
      <div className="bg-blue-50 border border-blue-200 p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-3">Validation Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-medium text-blue-800 mb-2">Common Validation Errors</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p>• Missing required columns in data structure</p>
              <p>• Negative balances in deposit accounts</p>
              <p>• Mismatched totals between summary and detail</p>
              <p>• Invalid date formats or out-of-range dates</p>
              <p>• Duplicate account numbers or customer IDs</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium text-blue-800 mb-2">Best Practices</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p>• Use the provided Excel templates</p>
              <p>• Validate data before submission</p>
              <p>• Ensure all required fields are populated</p>
              <p>• Double-check calculated totals</p>
              <p>• Submit within the specified deadline</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Validation Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-gray-600">Validation ID</p>
                  <p className="text-gray-900">{selectedResult.id}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Submission ID</p>
                  <p className="text-gray-900">{selectedResult.submissionId}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Period</p>
                  <p className="text-gray-900">{selectedResult.period}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Type</p>
                  <p className="text-gray-900">{selectedResult.type}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(selectedResult.status)} border rounded`}>
                    {selectedResult.status}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Submitted Date</p>
                  <p className="text-gray-900">{selectedResult.submittedDate}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Validated Date</p>
                  <p className="text-gray-900">{selectedResult.validatedDate}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Total Errors</p>
                  <p className="text-gray-900">{selectedResult.totalErrors}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Total Warnings</p>
                  <p className="text-gray-900">{selectedResult.totalWarnings}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Validation Details</h4>
                <div className="space-y-2">
                  {selectedResult.details.map((detail, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        {getFieldStatusIcon(detail.status)}
                        <span className="text-xs font-medium text-gray-900">{detail.field}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-medium ${getFieldStatusColor(detail.status)}`}>
                          {detail.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </button>
              <button 
                onClick={() => handleDownloadReport(selectedResult)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ValidationResults
