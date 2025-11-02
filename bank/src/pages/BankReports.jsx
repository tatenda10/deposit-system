import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { FileText, Download, Eye, Calendar, BarChart3, TrendingUp, AlertTriangle, CheckCircle, X } from 'lucide-react'

const BankReports = () => {
  const { user } = useAuth()
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)

  // Mock reports data
  const reports = [
    {
      id: 'RPT-2024-001',
      name: 'Monthly Compliance Report',
      type: 'Compliance',
      period: 'January 2024',
      generatedDate: '2024-02-01',
      status: 'Generated',
      size: '2.3 MB',
      description: 'Comprehensive compliance status report for January 2024'
    },
    {
      id: 'RPT-2024-002',
      name: 'Submission History Report',
      type: 'Submission',
      period: 'Q4 2023',
      generatedDate: '2024-01-15',
      status: 'Generated',
      size: '1.8 MB',
      description: 'Historical submission data and status tracking'
    },
    {
      id: 'RPT-2024-003',
      name: 'Premium Payment Summary',
      type: 'Financial',
      period: '2023',
      generatedDate: '2024-01-10',
      status: 'Generated',
      size: '3.1 MB',
      description: 'Annual premium payment summary and reconciliation'
    },
    {
      id: 'RPT-2024-004',
      name: 'SCV Data Analysis',
      type: 'SCV',
      period: 'December 2023',
      generatedDate: '2024-01-05',
      status: 'Generated',
      size: '4.2 MB',
      description: 'Single Customer View data analysis and insights'
    }
  ]

  const handleViewReport = (report) => {
    setSelectedReport(report)
    setShowViewModal(true)
  }

  const handleDownloadReport = (report) => {
    // Simulate report download
    const blob = new Blob(['Report content would be here'], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${report.name}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getReportIcon = (type) => {
    switch (type) {
      case 'Compliance': return CheckCircle
      case 'Submission': return FileText
      case 'Financial': return TrendingUp
      case 'SCV': return BarChart3
      default: return FileText
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Generated': return 'text-green-600 bg-green-100 border-green-200'
      case 'Processing': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'Failed': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4">
        <h1 className="text-lg font-bold text-gray-800">Reports</h1>
        <p className="text-xs text-gray-600">Generate compliance and submission reports</p>
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
              <h3 className="text-xs font-medium text-gray-600">Total Reports</h3>
              <p className="text-lg font-bold text-blue-700">{reports.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 border border-green-300">
              <CheckCircle className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Generated</h3>
              <p className="text-lg font-bold text-green-700">{reports.filter(r => r.status === 'Generated').length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 border border-purple-300">
              <BarChart3 className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">This Month</h3>
              <p className="text-lg font-bold text-purple-700">3</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 border border-orange-300">
              <TrendingUp className="h-5 w-5 text-orange-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Available</h3>
              <p className="text-lg font-bold text-orange-700">{reports.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white border border-gray-300">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">Available Reports</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Report</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Type</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Period</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Generated</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Size</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => {
                const IconComponent = getReportIcon(report.type)
                return (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <IconComponent className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs font-medium text-gray-900">{report.name}</p>
                          <p className="text-xs text-gray-500">{report.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border rounded">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-900">{report.period}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs text-gray-900">{report.generatedDate}</p>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(report.status)} border rounded`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs text-gray-900">{report.size}</p>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleViewReport(report)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                          title="View Report"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </button>
                        <button 
                          onClick={() => handleDownloadReport(report)}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                          title="Download Report"
                        >
                          <Download className="h-3 w-3" />
                          PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Report Details</h3>
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
                  <p className="font-medium text-gray-600">Report Name</p>
                  <p className="text-gray-900">{selectedReport.name}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Report ID</p>
                  <p className="text-gray-900">{selectedReport.id}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Type</p>
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border rounded">
                    {selectedReport.type}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Period</p>
                  <p className="text-gray-900">{selectedReport.period}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Generated Date</p>
                  <p className="text-gray-900">{selectedReport.generatedDate}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(selectedReport.status)} border rounded`}>
                    {selectedReport.status}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-600">File Size</p>
                  <p className="text-gray-900">{selectedReport.size}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Description</p>
                  <p className="text-gray-900">{selectedReport.description}</p>
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
                onClick={() => handleDownloadReport(selectedReport)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BankReports
