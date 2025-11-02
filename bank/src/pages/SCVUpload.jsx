import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { Upload, CheckCircle, BarChart3, FileText, AlertTriangle, Download, Eye, Trash2, X } from 'lucide-react'

const SCVUpload = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('upload')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [validationResults, setValidationResults] = useState([])
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  const tabs = [
    { id: 'upload', name: 'SCV Upload', icon: Upload },
    { id: 'validation', name: 'Validation Results', icon: CheckCircle },
    { id: 'reports', name: 'SCV Reports', icon: BarChart3 }
  ]

  const mockValidationResults = [
    {
      id: 1,
      fileName: 'SCV_Data_2024_01.xlsx',
      status: 'Valid',
      uploadedDate: '2024-01-15',
      recordCount: 12500,
      errors: 0,
      warnings: 2
    },
    {
      id: 2,
      fileName: 'SCV_Data_2023_12.xlsx',
      status: 'Errors Found',
      uploadedDate: '2023-12-20',
      recordCount: 11800,
      errors: 15,
      warnings: 5
    }
  ]

  const mockSCVReports = [
    {
      id: 1,
      reportName: 'Monthly SCV Summary',
      period: 'January 2024',
      totalDepositors: 12500,
      insuredDepositors: 11200,
      uninsuredDepositors: 1300,
      totalInsuredAmount: 45000000,
      generatedDate: '2024-01-16'
    },
    {
      id: 2,
      reportName: 'Quarterly SCV Analysis',
      period: 'Q4 2023',
      totalDepositors: 11800,
      insuredDepositors: 10500,
      uninsuredDepositors: 1300,
      totalInsuredAmount: 42000000,
      generatedDate: '2024-01-10'
    }
  ]

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setUploadedFiles(prev => [...prev, ...files])
    // Simulate upload success
    alert(`Successfully uploaded ${files.length} SCV file(s)`)
  }

  const handleViewValidation = (result) => {
    setSelectedItem(result)
    setShowViewModal(true)
  }

  const handleViewReport = (report) => {
    setSelectedItem(report)
    setShowViewModal(true)
  }

  const handleDownloadFile = (item) => {
    // Simulate file download
    const blob = new Blob(['SCV file content would be here'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${item.fileName || item.reportName}.xlsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Valid': return 'text-green-600 bg-green-100 border-green-200'
      case 'Errors Found': return 'text-red-600 bg-red-100 border-red-200'
      case 'Processing': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4">
        <h1 className="text-lg font-bold text-gray-800">SCV Management</h1>
        <p className="text-xs text-gray-600">Manage Single Customer View data uploads, validation, and reports</p>
        <p className="text-xs text-gray-500">{user?.bankName} - {user?.role}</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border border-gray-300">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-xs ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* SCV Upload Tab */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Upload SCV Data</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                  <p className="text-sm font-medium text-gray-900 mb-2">Upload SCV Data Files</p>
                  <p className="text-xs text-gray-600 mb-3">
                    Drag and drop your SCV data files here, or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </label>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-800 mb-3">Uploaded Files</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-xs font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleDownloadFile({ fileName: file.name })}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="Download"
                          >
                            <Download className="h-3 w-3" />
                          </button>
                          <button 
                            onClick={() => handleRemoveFile(index)}
                            className="p-1 text-gray-400 hover:text-red-600"
                            title="Remove"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Validation Results Tab */}
          {activeTab === 'validation' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">Validation Results</h3>
                <div className="space-y-3">
                  {mockValidationResults.map((result) => (
                    <div key={result.id} className="border border-gray-300 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-xs font-medium text-gray-900">{result.fileName}</p>
                            <p className="text-xs text-gray-500">Uploaded: {result.uploadedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium border rounded ${getStatusColor(result.status)}`}>
                            {result.status}
                          </span>
                          <button 
                            onClick={() => handleViewValidation(result)}
                            className="p-1 text-gray-400 hover:text-blue-600"
                            title="View Details"
                          >
                            <Eye className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-xs">
                        <div>
                          <p className="text-gray-600">Records</p>
                          <p className="text-xs font-semibold text-gray-900">{result.recordCount.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Errors</p>
                          <p className={`text-xs font-semibold ${result.errors > 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {result.errors}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Warnings</p>
                          <p className={`text-xs font-semibold ${result.warnings > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                            {result.warnings}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCV Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-3">SCV Reports</h3>
                <div className="space-y-3">
                  {mockSCVReports.map((report) => (
                    <div key={report.id} className="border border-gray-300 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="text-xs font-medium text-gray-900">{report.reportName}</p>
                          <p className="text-xs text-gray-500">Period: {report.period}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleViewReport(report)}
                            className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </button>
                          <button 
                            onClick={() => handleDownloadFile(report)}
                            className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-gray-600">Total Depositors</p>
                          <p className="text-xs font-semibold text-gray-900">{report.totalDepositors.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Insured Depositors</p>
                          <p className="text-xs font-semibold text-green-600">{report.insuredDepositors.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Uninsured Depositors</p>
                          <p className="text-xs font-semibold text-red-600">{report.uninsuredDepositors.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Total Insured Amount</p>
                          <p className="text-xs font-semibold text-gray-900">${report.totalInsuredAmount.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedItem.fileName ? 'Validation Details' : 'SCV Report Details'}
              </h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {selectedItem.fileName ? (
                // Validation Details
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-600">File Name</p>
                    <p className="text-gray-900">{selectedItem.fileName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(selectedItem.status)} border rounded`}>
                      {selectedItem.status}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Uploaded Date</p>
                    <p className="text-gray-900">{selectedItem.uploadedDate}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Record Count</p>
                    <p className="text-gray-900 font-semibold">{selectedItem.recordCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Errors</p>
                    <p className={`text-sm font-semibold ${selectedItem.errors > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {selectedItem.errors}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Warnings</p>
                    <p className={`text-sm font-semibold ${selectedItem.warnings > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                      {selectedItem.warnings}
                    </p>
                  </div>
                </div>
              ) : (
                // SCV Report Details
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-600">Report Name</p>
                    <p className="text-gray-900">{selectedItem.reportName}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Period</p>
                    <p className="text-gray-900">{selectedItem.period}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Total Depositors</p>
                    <p className="text-gray-900 font-semibold">{selectedItem.totalDepositors.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Insured Depositors</p>
                    <p className="text-green-600 font-semibold">{selectedItem.insuredDepositors.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Uninsured Depositors</p>
                    <p className="text-red-600 font-semibold">{selectedItem.uninsuredDepositors.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Total Insured Amount</p>
                    <p className="text-gray-900 font-semibold">${selectedItem.totalInsuredAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Generated Date</p>
                    <p className="text-gray-900">{selectedItem.generatedDate}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={() => setShowViewModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              >
                Close
              </button>
              <button 
                onClick={() => handleDownloadFile(selectedItem)}
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

export default SCVUpload