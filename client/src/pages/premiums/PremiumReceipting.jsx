import React, { useState } from 'react'
import { 
  Upload, 
  DollarSign, 
  Building2, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Download, 
  Eye, 
  FileText,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Shield,
  Calendar,
  User,
  CreditCard,
  Banknote,
  Receipt
} from 'lucide-react'

// Mock data for premium receipts
const mockReceipts = [
  {
    id: 'RCP-2024-001',
    bankName: 'CBZ Bank Limited',
    bankCode: 'CBZ',
    invoiceId: 'INV-2024-001',
    amount: 4335600,
    paymentDate: '2024-01-20',
    uploadDate: '2024-01-21',
    uploadedBy: 'John Moyo',
    status: 'Verified',
    paymentMethod: 'Bank Transfer',
    reference: 'TXN-001234567',
    documents: ['payment_proof.pdf', 'bank_statement.pdf'],
    verifiedBy: 'Sarah Chikwanda',
    verifiedDate: '2024-01-21'
  },
  {
    id: 'RCP-2024-002',
    bankName: 'Standard Chartered Bank Zimbabwe',
    bankCode: 'SCB',
    invoiceId: 'INV-2024-002',
    amount: 2250000,
    paymentDate: '2024-01-18',
    uploadDate: '2024-01-19',
    uploadedBy: 'Peter Ncube',
    status: 'Verified',
    paymentMethod: 'Cheque',
    reference: 'CHQ-789012345',
    documents: ['cheque_copy.pdf', 'deposit_slip.pdf'],
    verifiedBy: 'Sarah Chikwanda',
    verifiedDate: '2024-01-19'
  },
  {
    id: 'RCP-2024-003',
    bankName: 'Nedbank Zimbabwe',
    bankCode: 'NED',
    invoiceId: 'INV-2024-003',
    amount: 1068000,
    paymentDate: '2024-01-25',
    uploadDate: '2024-01-26',
    uploadedBy: 'Mary Sibanda',
    status: 'Pending Review',
    paymentMethod: 'Bank Transfer',
    reference: 'TXN-345678901',
    documents: ['payment_proof.pdf'],
    verifiedBy: null,
    verifiedDate: null
  },
  {
    id: 'RCP-2024-004',
    bankName: 'Ecobank Zimbabwe',
    bankCode: 'ECO',
    invoiceId: 'INV-2024-004',
    amount: 1430000,
    paymentDate: '2024-01-30',
    uploadDate: '2024-01-31',
    uploadedBy: 'David Moyo',
    status: 'Rejected',
    paymentMethod: 'Bank Transfer',
    reference: 'TXN-456789012',
    documents: ['payment_proof.pdf'],
    verifiedBy: 'Sarah Chikwanda',
    verifiedDate: '2024-01-31',
    rejectionReason: 'Insufficient documentation'
  }
]

export default function PremiumReceipting() {
  const [receipts, setReceipts] = useState(mockReceipts)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState([])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'bg-green-100 text-green-800 border-green-200'
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'Bank Transfer': return <CreditCard className="h-4 w-4" />
      case 'Cheque': return <Receipt className="h-4 w-4" />
      case 'Cash': return <Banknote className="h-4 w-4" />
      default: return <DollarSign className="h-4 w-4" />
    }
  }

  const filteredReceipts = receipts.filter(receipt => {
    const matchesStatus = filterStatus === 'All' || receipt.status === filterStatus
    const matchesSearch = receipt.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.bankCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         receipt.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalReceived = receipts.filter(r => r.status === 'Verified').reduce((sum, receipt) => sum + receipt.amount, 0)
  const totalPending = receipts.filter(r => r.status === 'Pending Review').reduce((sum, receipt) => sum + receipt.amount, 0)
  const totalRejected = receipts.filter(r => r.status === 'Rejected').reduce((sum, receipt) => sum + receipt.amount, 0)
  const totalUploads = receipts.length

  const handleVerifyReceipt = (receiptId) => {
    setReceipts(receipts.map(receipt => 
      receipt.id === receiptId 
        ? { 
            ...receipt, 
            status: 'Verified',
            verifiedBy: 'Current User',
            verifiedDate: new Date().toISOString().split('T')[0]
          }
        : receipt
    ))
  }

  const handleRejectReceipt = (receiptId, reason) => {
    setReceipts(receipts.map(receipt => 
      receipt.id === receiptId 
        ? { 
            ...receipt, 
            status: 'Rejected',
            verifiedBy: 'Current User',
            verifiedDate: new Date().toISOString().split('T')[0],
            rejectionReason: reason
          }
        : receipt
    ))
  }

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles(files)
  }

  const handleUploadReceipt = () => {
    // In a real app, this would upload files and create receipt record
    console.log('Uploading files:', selectedFiles)
    setShowUploadModal(false)
    setSelectedFiles([])
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Premium Receipting</h1>
            <p className="text-sm text-gray-600">Allow CIs to upload proof of payments and acknowledge payments</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowUploadModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1"
            >
              <Upload className="h-3 w-3" />
              Upload Receipt
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1">
              <Download className="h-3 w-3" />
              Export Report
            </button>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 border border-green-300">
              <CheckCircle className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Received</h3>
              <p className="text-sm font-semibold text-green-700">${totalReceived.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 border border-yellow-300">
              <Clock className="h-4 w-4 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Pending Review</h3>
              <p className="text-sm font-semibold text-yellow-700">${totalPending.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 border border-red-300">
              <AlertTriangle className="h-4 w-4 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Rejected</h3>
              <p className="text-sm font-semibold text-red-700">${totalRejected.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 border border-blue-300">
              <Upload className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Uploads</h3>
              <p className="text-sm font-semibold text-blue-700">{totalUploads}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border border-gray-300 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search receipts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Rejected">Rejected</option>
            </select>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-sm font-medium flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Receipts Table */}
      <div className="bg-white border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-md font-semibold text-gray-800">Payment Receipts</h2>
          <p className="text-sm text-gray-600">Uploaded proof of payments and verification status</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Receipt</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Bank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Invoice</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Payment Method</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Uploaded By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReceipts.map((receipt) => (
                <tr key={receipt.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{receipt.id}</p>
                      <p className="text-xs text-gray-500">{receipt.uploadDate}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{receipt.bankName}</p>
                      <p className="text-xs text-gray-500">{receipt.bankCode}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-900">{receipt.invoiceId}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">${receipt.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getPaymentMethodIcon(receipt.paymentMethod)}
                      <span className="text-gray-900">{receipt.paymentMethod}</span>
                    </div>
                    <p className="text-xs text-gray-500">{receipt.reference}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(receipt.status)} border rounded`}>
                      {receipt.status}
                    </span>
                    {receipt.rejectionReason && (
                      <p className="text-xs text-red-600 mt-1">{receipt.rejectionReason}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-gray-900">{receipt.uploadedBy}</p>
                      {receipt.verifiedBy && (
                        <p className="text-xs text-gray-500">Verified by: {receipt.verifiedBy}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="View Documents">
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                      {receipt.status === 'Pending Review' && (
                        <>
                          <button
                            onClick={() => handleVerifyReceipt(receipt.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                            title="Verify Receipt"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Verify
                          </button>
                          <button
                            onClick={() => handleRejectReceipt(receipt.id, 'Insufficient documentation')}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                            title="Reject Receipt"
                          >
                            <AlertTriangle className="h-3 w-3" />
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Receipt Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Payment Receipt</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Bank</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="">Select Bank</option>
                  <option value="CBZ">CBZ Bank Limited</option>
                  <option value="SCB">Standard Chartered Bank Zimbabwe</option>
                  <option value="NED">Nedbank Zimbabwe</option>
                  <option value="ECO">Ecobank Zimbabwe</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Invoice Reference</label>
                <input
                  type="text"
                  placeholder="Enter invoice ID"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Payment Amount</label>
                <input
                  type="number"
                  placeholder="Enter payment amount"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Payment Method</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cheque">Cheque</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Upload Documents</label>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">Upload payment proof, bank statements, or receipts</p>
              </div>
              {selectedFiles.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-700">Selected Files:</p>
                  <ul className="text-xs text-gray-600">
                    {selectedFiles.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadReceipt}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Upload Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
