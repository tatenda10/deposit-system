import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { api, DEMO_BANK_ID, API_BASE_URL } from '../config/api'
import { FileText, Download, Eye, Calendar, CheckCircle, AlertTriangle, Clock, X, Filter, Search } from 'lucide-react'

const SubmissionHistory = () => {
  const { user } = useAuth()
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [submissions, setSubmissions] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch submissions from API
  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await api.getSubmissionsByBank(DEMO_BANK_ID)
        
        // Transform API data to match UI format
        const transformedSubmissions = data.map((submission) => {
          // Map return type to display name
          const returnTypeMap = {
            monthly: 'Monthly Returns',
            quarterly: 'Quarterly Returns',
            scv: 'SCV Data',
            balance_sheet: 'Balance Sheet',
            income_statement: 'Income Statement'
          }
          
          // Map status
          const statusMap = {
            pending: 'Pending Review',
            validated: 'Under Review',
            approved: 'Approved',
            rejected: 'Rejected'
          }
          
          // Format date
          const formatDate = (dateString) => {
            if (!dateString) return null
            const date = new Date(dateString)
            return date.toISOString().split('T')[0]
          }
          
          return {
            id: submission.id,
            type: returnTypeMap[submission.returnType] || submission.returnType,
            period: submission.period,
            submittedDate: formatDate(submission.submittedAt),
            dueDate: null, // Not in API response
            status: statusMap[submission.status] || submission.status,
            reviewer: submission.reviewerId ? 'DPC Reviewer' : null,
            reviewedDate: submission.approvedAt ? formatDate(submission.approvedAt) : 
                         submission.rejectedAt ? formatDate(submission.rejectedAt) : null,
            files: submission.files?.map(f => f.fileName) || [],
            comments: submission.comments || 'No comments',
            submissionData: submission // Store full submission data
          }
        })
        
        setSubmissions(transformedSubmissions)
      } catch (err) {
        console.error('Error fetching submissions:', err)
        setError(err.message || 'Failed to load submissions')
      } finally {
        setIsLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const handleViewSubmission = async (submission) => {
    try {
      // Fetch full submission details if not already loaded
      if (submission.submissionData) {
        setSelectedSubmission(submission)
        setShowViewModal(true)
      } else {
        const fullSubmission = await api.getSubmissionById(submission.id)
        const updatedSubmission = {
          ...submission,
          submissionData: fullSubmission,
          files: fullSubmission.files?.map(f => f.fileName) || []
        }
        setSelectedSubmission(updatedSubmission)
        setShowViewModal(true)
      }
    } catch (err) {
      console.error('Error fetching submission details:', err)
      alert('Failed to load submission details')
    }
  }

  const handleDownloadSubmission = async (submission) => {
    try {
      // Fetch full submission details
      const fullSubmission = submission.submissionData || await api.getSubmissionById(submission.id)
      
      if (fullSubmission.files && fullSubmission.files.length > 0) {
        // Download each file (in a real app, you'd have download endpoints)
        fullSubmission.files.forEach((file) => {
          // For now, create a blob link (in production, use actual file download endpoint)
          const link = document.createElement('a')
          link.href = `${API_BASE_URL}/api/files/${file.id}/download` // This endpoint would need to be created
          link.download = file.fileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
      } else {
        alert('No files available for download')
      }
    } catch (err) {
      console.error('Error downloading files:', err)
      alert('Failed to download files')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'text-green-600 bg-green-100 border-green-200'
      case 'Pending Review': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'Rejected': return 'text-red-600 bg-red-100 border-red-200'
      case 'Under Review': return 'text-blue-600 bg-blue-100 border-blue-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return CheckCircle
      case 'Pending Review': return Clock
      case 'Rejected': return AlertTriangle
      case 'Under Review': return Clock
      default: return FileText
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    // Map filter status to actual status values
    const statusFilterMap = {
      'All': null,
      'Approved': 'Approved',
      'Pending Review': 'Pending Review',
      'Under Review': 'Under Review',
      'Rejected': 'Rejected'
    }
    
    const matchesStatus = filterStatus === 'All' || submission.status === statusFilterMap[filterStatus]
    const matchesSearch = submission.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.period.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalSubmissions = submissions.length
  const approvedCount = submissions.filter(s => s.status === 'Approved').length
  const pendingCount = submissions.filter(s => s.status === 'Pending Review' || s.status === 'Under Review').length
  const rejectedCount = submissions.filter(s => s.status === 'Rejected').length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4">
        <h1 className="text-lg font-bold text-gray-800">Submission History</h1>
        <p className="text-xs text-gray-600">View all your submitted returns and their status</p>
        <p className="text-xs text-gray-500">{user?.bankName} - {user?.role}</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
              <h3 className="text-xs font-medium text-gray-600">Approved</h3>
              <p className="text-lg font-bold text-green-700">{approvedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 border border-yellow-300">
              <Clock className="h-5 w-5 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Pending</h3>
              <p className="text-lg font-bold text-yellow-700">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 border border-red-300">
              <AlertTriangle className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Rejected</h3>
              <p className="text-lg font-bold text-red-700">{rejectedCount}</p>
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
              <option value="Approved">Approved</option>
              <option value="Under Review">Under Review</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Rejected">Rejected</option>
            </select>
            <div className="relative">
              <Search className="h-3 w-3 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search submissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      {/* Submissions Table */}
      <div className="bg-white border border-gray-300">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">Submission History</h3>
        </div>
        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-sm text-gray-600 mt-4">Loading submissions...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-sm text-gray-600">No submissions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Submission</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Type</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Period</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Submitted</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Due Date</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Status</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Reviewer</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => {
                const StatusIcon = getStatusIcon(submission.status)
                return (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <StatusIcon className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs font-medium text-gray-900">{submission.id}</p>
                          <p className="text-xs text-gray-500">{submission.files.length} file(s)</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border rounded">
                        {submission.type}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs text-gray-900">{submission.period}</p>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-900">{submission.submittedDate}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs text-gray-900">{submission.dueDate}</p>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(submission.status)} border rounded`}>
                        {submission.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs text-gray-900">{submission.reviewer || 'N/A'}</p>
                      {submission.reviewedDate && (
                        <p className="text-xs text-gray-500">Reviewed: {submission.reviewedDate}</p>
                      )}
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleViewSubmission(submission)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                          title="View Details"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </button>
                        <button 
                          onClick={() => handleDownloadSubmission(submission)}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                          title="Download Files"
                        >
                          <Download className="h-3 w-3" />
                          Files
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* View Modal */}
      {showViewModal && selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Submission Details</h3>
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
                  <p className="font-medium text-gray-600">Submission ID</p>
                  <p className="text-gray-900">{selectedSubmission.id}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Type</p>
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border rounded">
                    {selectedSubmission.type}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Period</p>
                  <p className="text-gray-900">{selectedSubmission.period}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(selectedSubmission.status)} border rounded`}>
                    {selectedSubmission.status}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Submitted Date</p>
                  <p className="text-gray-900">{selectedSubmission.submittedDate}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Due Date</p>
                  <p className="text-gray-900">{selectedSubmission.dueDate}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Reviewer</p>
                  <p className="text-gray-900">{selectedSubmission.reviewer || 'Not assigned'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Reviewed Date</p>
                  <p className="text-gray-900">{selectedSubmission.reviewedDate || 'Not reviewed'}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-medium text-gray-600">Files</p>
                  <div className="space-y-1">
                    {selectedSubmission.files.map((file, index) => (
                      <p key={index} className="text-xs text-gray-900 flex items-center gap-2">
                        <FileText className="h-3 w-3" />
                        {file}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <p className="font-medium text-gray-600">Comments</p>
                  <p className="text-gray-900 text-sm">{selectedSubmission.comments || 'No comments'}</p>
                </div>
                {selectedSubmission.submissionData?.validationResult && (
                  <div className="col-span-2">
                    <p className="font-medium text-gray-600">Validation Status</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-900">
                        Status: <span className="font-medium capitalize">{selectedSubmission.submissionData.validationResult.status}</span>
                      </p>
                      <p className="text-xs text-gray-600">
                        Errors: {selectedSubmission.submissionData.validationResult.errors || 0} | 
                        Warnings: {selectedSubmission.submissionData.validationResult.warnings || 0}
                      </p>
                    </div>
                  </div>
                )}
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
                onClick={() => handleDownloadSubmission(selectedSubmission)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Files
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubmissionHistory
