import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FileText, Download, Eye, CheckCircle, XCircle, Clock, Filter, Search, Calendar, X, AlertCircle } from 'lucide-react'

const sampleReturns = [
  {
    id: 1,
    bankName: "CBZ Bank Limited",
    bankCode: "CBZ",
    returnType: "Monthly Returns",
    submissionDate: "2024-01-15",
    dueDate: "2024-01-20",
    status: "Pending Review",
    validationStatus: "Passed",
    remarks: "All data validated successfully",
    fileSize: "2.4 MB",
    submittedBy: "John Smith",
    priority: "High"
  },
  {
    id: 2,
    bankName: "Standard Chartered Bank Zimbabwe",
    bankCode: "SCB",
    returnType: "Quarterly Returns",
    submissionDate: "2024-01-14",
    dueDate: "2024-01-25",
    status: "Approved",
    validationStatus: "Passed",
    remarks: "Complete and accurate submission",
    fileSize: "3.1 MB",
    submittedBy: "Sarah Johnson",
    priority: "Medium"
  },
  {
    id: 3,
    bankName: "FBC Bank Limited",
    bankCode: "FBC",
    returnType: "Monthly Returns",
    submissionDate: "2024-01-13",
    dueDate: "2024-01-18",
    status: "Rejected",
    validationStatus: "Failed",
    remarks: "Missing required fields in section 3",
    fileSize: "1.8 MB",
    submittedBy: "Mike Chen",
    priority: "High"
  },
  {
    id: 4,
    bankName: "NMB Bank Limited",
    bankCode: "NMB",
    returnType: "Annual Returns",
    submissionDate: "2024-01-12",
    dueDate: "2024-01-30",
    status: "Under Review",
    validationStatus: "Warning",
    remarks: "Minor discrepancies in calculation",
    fileSize: "4.2 MB",
    submittedBy: "Emily Davis",
    priority: "Low"
  },
  {
    id: 5,
    bankName: "Zimbabwe Building Society",
    bankCode: "ZBS",
    returnType: "Monthly Returns",
    submissionDate: "2024-01-11",
    dueDate: "2024-01-16",
    status: "Overdue",
    validationStatus: "Failed",
    remarks: "Submission past due date",
    fileSize: "2.1 MB",
    submittedBy: "David Wilson",
    priority: "Critical"
  }
]

export default function SubmissionsInbox() {
  const navigate = useNavigate()
  const [selectedReturns, setSelectedReturns] = useState([])
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [selectedReturn, setSelectedReturn] = useState(null)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200'
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Under Review': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200'
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getValidationColor = (status) => {
    switch (status) {
      case 'Passed': return 'bg-green-100 text-green-800 border-green-200'
      case 'Failed': return 'bg-red-100 text-red-800 border-red-200'
      case 'Warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredReturns = sampleReturns.filter(returnItem => {
    const matchesStatus = filterStatus === 'All' || returnItem.status === filterStatus
    const matchesSearch = returnItem.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         returnItem.returnType.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredReturns.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedReturns = filteredReturns.slice(startIndex, endIndex)

  const handleSelectReturn = (returnId) => {
    setSelectedReturns(prev => 
      prev.includes(returnId) 
        ? prev.filter(id => id !== returnId)
        : [...prev, returnId]
    )
  }

  const handleSelectAll = () => {
    if (selectedReturns.length === paginatedReturns.length) {
      setSelectedReturns([])
    } else {
      setSelectedReturns(paginatedReturns.map(item => item.id))
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setSelectedReturns([]) // Clear selections when changing pages
  }

  const handleBulkAction = (action) => {
    if (selectedReturns.length === 0) {
      alert('Please select returns to perform bulk actions')
      return
    }
    
    console.log(`Bulk ${action} for returns:`, selectedReturns)
    
    if (action === 'approve') {
      alert(`Approving ${selectedReturns.length} selected returns`)
      // In a real app, you'd make API calls to approve all selected returns
    } else if (action === 'reject') {
      alert(`Rejecting ${selectedReturns.length} selected returns`)
      // In a real app, you'd make API calls to reject all selected returns
    }
    
    // Clear selections after action
    setSelectedReturns([])
  }

  const handleViewSubmission = (returnItem) => {
    // Navigate to individual submission view
    navigate(`/client/submission/${returnItem.id}`, { state: { submission: returnItem } })
  }

  const handleApproveReturn = (returnItem) => {
    setSelectedReturn(returnItem)
    setShowApproveModal(true)
  }

  const handleRejectReturn = (returnItem) => {
    setSelectedReturn(returnItem)
    setShowRejectModal(true)
  }

  const handleDownloadReturn = (returnItem) => {
    // Create a mock file download
    const fileName = `${returnItem.bankCode}_${returnItem.returnType.replace(/\s+/g, '_')}_${returnItem.submissionDate}.pdf`
    const fileContent = `Return Details for ${returnItem.bankName}
    
Return Type: ${returnItem.returnType}
Submission Date: ${returnItem.submissionDate}
Due Date: ${returnItem.dueDate}
Status: ${returnItem.status}
Validation Status: ${returnItem.validationStatus}
Priority: ${returnItem.priority}
File Size: ${returnItem.fileSize}
Submitted By: ${returnItem.submittedBy}
Remarks: ${returnItem.remarks}

This is a mock download for demonstration purposes.`

    const blob = new Blob([fileContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const confirmApprove = () => {
    console.log('Approving return:', selectedReturn)
    setShowApproveModal(false)
    setSelectedReturn(null)
    // In a real app, you'd make an API call here
  }

  const confirmReject = () => {
    console.log('Rejecting return:', selectedReturn)
    setShowRejectModal(false)
    setSelectedReturn(null)
    // In a real app, you'd make an API call here
  }

  const closeModals = () => {
    setShowApproveModal(false)
    setShowRejectModal(false)
    setSelectedReturn(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-lg font-semibold text-gray-800">Submissions Inbox</h1>
                    <p className="text-sm text-gray-600">Manage and review bank submission data</p>
                  </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-2">
              <Download className="h-4 w-4" />
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white p-2">
              <FileText className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-gray-100 border border-gray-300 p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 border border-blue-300">
              <FileText className="h-3 w-3 text-blue-700" />
            </div>
            <div>
                    <h3 className="text-xs font-medium text-gray-600">Total Submissions</h3>
                    <p className="text-sm font-semibold text-blue-700">{sampleReturns.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-300 p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-yellow-100 border border-yellow-300">
              <Clock className="h-3 w-3 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Pending Review</h3>
              <p className="text-sm font-semibold text-yellow-700">
                {sampleReturns.filter(r => r.status === 'Pending Review').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-300 p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 border border-green-300">
              <CheckCircle className="h-3 w-3 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Approved</h3>
              <p className="text-sm font-semibold text-green-700">
                {sampleReturns.filter(r => r.status === 'Approved').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 border border-gray-300 p-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-100 border border-red-300">
              <XCircle className="h-3 w-3 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Overdue</h3>
              <p className="text-sm font-semibold text-red-700">
                {sampleReturns.filter(r => r.status === 'Overdue').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-yellow-50 border border-yellow-200 p-4">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-800">2 returns are approaching their due date</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search banks or return types..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Pending Review">Pending Review</option>
                <option value="Under Review">Under Review</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
          </div>

          {selectedReturns.length > 0 && (
            <div className="flex gap-2">
              <button 
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 text-xs"
                onClick={() => handleBulkAction('approve')}
              >
                Approve Selected
              </button>
              <button 
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs"
                onClick={() => handleBulkAction('reject')}
              >
                Reject Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Returns Table */}
      <div className="bg-white border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white">
            <thead className="bg-gray-100">
              <tr className="border-b border-gray-300 bg-gray-100">
                <th className="w-12 py-2 bg-gray-100 text-left">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                    checked={selectedReturns.length === paginatedReturns.length && paginatedReturns.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="py-2 text-xs font-semibold text-gray-700 bg-gray-100 text-left">Bank</th>
                <th className="py-2 text-xs font-semibold text-gray-700 bg-gray-100 text-left">Return Type</th>
                <th className="py-2 text-xs font-semibold text-gray-700 bg-gray-100 text-left">Submission Date</th>
                <th className="py-2 text-xs font-semibold text-gray-700 bg-gray-100 text-left">Due Date</th>
                <th className="py-2 text-xs font-semibold text-gray-700 bg-gray-100 text-center">Status</th>
                <th className="py-2 text-xs font-semibold text-gray-700 bg-gray-100 text-center">Validation</th>
                <th className="py-2 text-xs font-semibold text-gray-700 bg-gray-100 text-center">Priority</th>
                <th className="py-2 text-xs font-semibold text-gray-700 bg-gray-100 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedReturns.map((returnItem) => (
                <tr key={returnItem.id} className="bg-white hover:bg-gray-50 border-b border-gray-100">
                  <td className="py-1.5 text-left">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                      checked={selectedReturns.includes(returnItem.id)}
                      onChange={() => handleSelectReturn(returnItem.id)}
                    />
                  </td>
                  <td className="py-1.5 text-left">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{returnItem.bankName}</div>
                      <div className="text-xs text-gray-500">{returnItem.bankCode}</div>
                    </div>
                  </td>
                  <td className="py-1.5 text-left">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{returnItem.returnType}</div>
                      <div className="text-xs text-gray-500">{returnItem.fileSize}</div>
                    </div>
                  </td>
                  <td className="py-1.5 text-left">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs">{returnItem.submissionDate}</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-left">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <span className="text-xs">{returnItem.dueDate}</span>
                    </div>
                  </td>
                  <td className="py-1.5 text-center">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(returnItem.status)} border`}>
                      {returnItem.status}
                    </span>
                  </td>
                  <td className="py-1.5 text-center">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getValidationColor(returnItem.validationStatus)} border`}>
                      {returnItem.validationStatus}
                    </span>
                  </td>
                  <td className="py-1.5 text-center">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getPriorityColor(returnItem.priority)} border`}>
                      {returnItem.priority}
                    </span>
                  </td>
                  <td className="py-1.5 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => handleViewSubmission(returnItem)}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-1.5 py-1 transition-colors"
                        title="View Submission"
                      >
                        <Eye className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => handleApproveReturn(returnItem)}
                        className="bg-green-500 hover:bg-green-600 text-white text-xs px-1.5 py-1 transition-colors"
                        title="Approve Return"
                      >
                        <CheckCircle className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => handleRejectReturn(returnItem)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs px-1.5 py-1 transition-colors"
                        title="Reject Return"
                      >
                        <XCircle className="h-3 w-3" />
                      </button>
                      <button 
                        onClick={() => handleDownloadReturn(returnItem)}
                        className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-1.5 py-1 transition-colors"
                        title="Download Return"
                      >
                        <Download className="h-3 w-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-700">
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, filteredReturns.length)} of {filteredReturns.length} submissions
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 text-sm border ${
                    currentPage === page
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm border border-gray-300 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Remarks Section */}
      <div className="bg-white border border-gray-200 p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Recent Remarks</h3>
        <div className="space-y-2">
          {sampleReturns.slice(0, 3).map((returnItem) => (
            <div key={returnItem.id} className="border-l-2 border-blue-500 pl-3 py-2 bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">{returnItem.bankName}</p>
                  <p className="text-xs text-gray-500">{returnItem.remarks}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(returnItem.status)} border`}>
                  {returnItem.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Approve Return Modal */}
      {showApproveModal && selectedReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Approve Return</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to approve the return from <strong>{selectedReturn.bankName}</strong>?
            </p>
            
            <div className="bg-gray-50 p-3 rounded border mb-4">
              <p className="text-xs text-gray-600">
                <strong>Return Type:</strong> {selectedReturn.returnType}<br/>
                <strong>Submission Date:</strong> {selectedReturn.submissionDate}<br/>
                <strong>Current Status:</strong> {selectedReturn.status}
              </p>
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmApprove}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                Approve Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Return Modal */}
      {showRejectModal && selectedReturn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Reject Return</h3>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to reject the return from <strong>{selectedReturn.bankName}</strong>?
            </p>
            
            <div className="bg-gray-50 p-3 rounded border mb-4">
              <p className="text-xs text-gray-600">
                <strong>Return Type:</strong> {selectedReturn.returnType}<br/>
                <strong>Submission Date:</strong> {selectedReturn.submissionDate}<br/>
                <strong>Current Status:</strong> {selectedReturn.status}
              </p>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rejection Reason (Optional)
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows="3"
                placeholder="Enter reason for rejection..."
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmReject}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                Reject Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
