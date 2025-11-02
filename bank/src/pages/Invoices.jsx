import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  FileText,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  CreditCard,
  RefreshCw,
  Filter,
  Search,
  Building2,
  TrendingUp,
  TrendingDown,
  Upload,
  Receipt,
  X
} from 'lucide-react'

const Invoices = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('invoices')
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [uploadedFiles, setUploadedFiles] = useState([])

  const tabs = [
    { id: 'invoices', name: 'Invoices', icon: FileText },
    { id: 'payments', name: 'Payments', icon: CreditCard }
  ]

  // Mock invoice data
  const invoices = [
    {
      id: 'INV-2024-001',
      period: 'Q4 2023',
      amount: 8500000,
      dueDate: '2024-02-15',
      status: 'Pending',
      createdDate: '2024-01-15',
      description: 'Quarterly premium for Q4 2023',
      paymentStatus: 'Unpaid',
      daysOverdue: 0
    },
    {
      id: 'INV-2024-002',
      period: 'Q3 2023',
      amount: 7200000,
      dueDate: '2024-01-15',
      status: 'Paid',
      createdDate: '2023-12-15',
      description: 'Quarterly premium for Q3 2023',
      paymentStatus: 'Paid',
      daysOverdue: 0,
      paidDate: '2024-01-10'
    },
    {
      id: 'INV-2024-003',
      period: 'Q2 2023',
      amount: 6800000,
      dueDate: '2023-10-15',
      status: 'Overdue',
      createdDate: '2023-09-15',
      description: 'Quarterly premium for Q2 2023',
      paymentStatus: 'Overdue',
      daysOverdue: 92
    },
    {
      id: 'INV-2024-004',
      period: 'Q1 2023',
      amount: 6200000,
      dueDate: '2023-07-15',
      status: 'Paid',
      createdDate: '2023-06-15',
      description: 'Quarterly premium for Q1 2023',
      paymentStatus: 'Paid',
      daysOverdue: 0,
      paidDate: '2023-07-10'
    }
  ]

  // Mock payment data
  const payments = [
    {
      id: 'PAY-2024-001',
      invoiceId: 'INV-2024-002',
      amount: 7200000,
      paymentDate: '2024-01-10',
      status: 'Verified',
      method: 'Bank Transfer',
      reference: 'CBZ-2024-001',
      uploadedDate: '2024-01-10',
      verifiedDate: '2024-01-12'
    },
    {
      id: 'PAY-2024-002',
      invoiceId: 'INV-2024-004',
      amount: 6200000,
      paymentDate: '2023-07-10',
      status: 'Verified',
      method: 'Bank Transfer',
      reference: 'CBZ-2023-004',
      uploadedDate: '2023-07-10',
      verifiedDate: '2023-07-12'
    },
    {
      id: 'PAY-2024-003',
      invoiceId: 'INV-2024-001',
      amount: 8500000,
      paymentDate: '2024-01-20',
      status: 'Pending Verification',
      method: 'Bank Transfer',
      reference: 'CBZ-2024-002',
      uploadedDate: '2024-01-20',
      verifiedDate: null
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-100 border-green-200'
      case 'Pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'Overdue': return 'text-red-600 bg-red-100 border-red-200'
      case 'Verified': return 'text-green-600 bg-green-100 border-green-200'
      case 'Pending Verification': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-600'
      case 'Unpaid': return 'text-yellow-600'
      case 'Overdue': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'All' || invoice.status === filterStatus
    const matchesSearch = invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.period.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalOutstanding = invoices
    .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const totalPaid = invoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0)

  const overdueCount = invoices.filter(inv => inv.status === 'Overdue').length

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files)
    setUploadedFiles(prev => [...prev, ...files])
    setShowUploadModal(false)
    // Simulate upload success
    alert(`Successfully uploaded ${files.length} file(s)`)
  }

  const handleViewInvoice = (invoice) => {
    setSelectedItem(invoice)
    setShowViewModal(true)
  }

  const handleViewPayment = (payment) => {
    setSelectedItem(payment)
    setShowViewModal(true)
  }

  const handleDownloadPDF = (item) => {
    // Simulate PDF download
    const blob = new Blob(['PDF content would be here'], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${item.id || item.invoiceId}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleMakePayment = (invoice) => {
    alert(`Redirecting to payment gateway for ${invoice.id} - Amount: $${invoice.amount.toLocaleString()}`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Invoices & Payments</h1>
            <p className="text-xs text-gray-600">Manage your premium invoices and payment records</p>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 border border-blue-300">
              <FileText className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Invoices</h3>
              <p className="text-lg font-bold text-blue-700">{invoices.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 border border-yellow-300">
              <DollarSign className="h-5 w-5 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Outstanding</h3>
              <p className="text-lg font-bold text-yellow-700">${totalOutstanding.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 border border-green-300">
              <CheckCircle className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Paid</h3>
              <p className="text-lg font-bold text-green-700">${totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 border border-red-300">
              <AlertTriangle className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Overdue</h3>
              <p className="text-lg font-bold text-red-700">{overdueCount}</p>
            </div>
          </div>
        </div>
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
          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Invoices Table */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Invoice</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Period</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Amount</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Due Date</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Payment</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredInvoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2">
                            <div>
                              <p className="text-xs font-medium text-gray-900">{invoice.id}</p>
                              <p className="text-xs text-gray-500">Created: {invoice.createdDate}</p>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-xs font-medium text-gray-900">{invoice.period}</p>
                            <p className="text-xs text-gray-500">{invoice.description}</p>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-xs font-semibold text-gray-900">${invoice.amount.toLocaleString()}</p>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <div>
                                <p className="text-xs font-medium text-gray-900">{invoice.dueDate}</p>
                                {invoice.daysOverdue > 0 && (
                                  <p className="text-xs text-red-600">{invoice.daysOverdue} days overdue</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(invoice.status)} border rounded`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-medium ${getPaymentStatusColor(invoice.paymentStatus)}`}>
                                {invoice.paymentStatus}
                              </span>
                              {invoice.paidDate && (
                                <p className="text-xs text-gray-500">Paid: {invoice.paidDate}</p>
                              )}
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex gap-1">
                              <button 
                                onClick={() => handleViewInvoice(invoice)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                                title="View Invoice"
                              >
                                <Eye className="h-3 w-3" />
                                View
                              </button>
                              <button 
                                onClick={() => handleDownloadPDF(invoice)}
                                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                                title="Download PDF"
                              >
                                <Download className="h-3 w-3" />
                                PDF
                              </button>
                              {invoice.status === 'Pending' && (
                                <button 
                                  onClick={() => handleMakePayment(invoice)}
                                  className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                                  title="Make Payment"
                                >
                                  <CreditCard className="h-3 w-3" />
                                  Pay
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-gray-800">Payment Records</h3>
                <button 
                  onClick={() => setShowUploadModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-2"
                >
                  <Upload className="h-3 w-3" />
                  Upload Payment Proof
                </button>
              </div>

              {/* Payments Table */}
              <div className="border border-gray-300 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-300">
                      <tr>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Payment ID</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Invoice</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Amount</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Payment Date</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Method</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Status</th>
                        <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-gray-50">
                          <td className="px-3 py-2">
                            <div>
                              <p className="text-xs font-medium text-gray-900">{payment.id}</p>
                              <p className="text-xs text-gray-500">Ref: {payment.reference}</p>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-xs font-medium text-gray-900">{payment.invoiceId}</p>
                          </td>
                          <td className="px-3 py-2">
                            <p className="text-xs font-semibold text-gray-900">${payment.amount.toLocaleString()}</p>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-3 w-3 text-gray-400" />
                              <div>
                                <p className="text-xs font-medium text-gray-900">{payment.paymentDate}</p>
                                <p className="text-xs text-gray-500">Uploaded: {payment.uploadedDate}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex items-center gap-2">
                              <CreditCard className="h-3 w-3 text-gray-400" />
                              <span className="text-xs text-gray-900">{payment.method}</span>
                            </div>
                          </td>
                          <td className="px-3 py-2">
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(payment.status)} border rounded`}>
                              {payment.status}
                            </span>
                            {payment.verifiedDate && (
                              <p className="text-xs text-gray-500 mt-1">Verified: {payment.verifiedDate}</p>
                            )}
                          </td>
                          <td className="px-3 py-2">
                            <div className="flex gap-1">
                              <button 
                                onClick={() => handleViewPayment(payment)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                                title="View Payment"
                              >
                                <Eye className="h-3 w-3" />
                                View
                              </button>
                              <button 
                                onClick={() => handleDownloadPDF(payment)}
                                className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                                title="Download Receipt"
                              >
                                <Receipt className="h-3 w-3" />
                                Receipt
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="bg-blue-50 border border-blue-200 p-4">
        <h3 className="text-sm font-semibold text-blue-800 mb-3">Payment Instructions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-xs font-medium text-blue-800 mb-2">Bank Transfer Details</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p><strong>Bank:</strong> Reserve Bank of Zimbabwe</p>
              <p><strong>Account Name:</strong> Deposit Protection Corporation</p>
              <p><strong>Account Number:</strong> 1234567890</p>
              <p><strong>Reference:</strong> [Your Bank Code] - [Invoice Number]</p>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-medium text-blue-800 mb-2">Payment Process</h4>
            <div className="text-xs text-blue-700 space-y-1">
              <p>1. Make payment using the details above</p>
              <p>2. Upload proof of payment in the Payments section</p>
              <p>3. Wait for DPC verification and confirmation</p>
              <p>4. Payment will be reflected within 2-3 business days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Upload Payment Proof</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Files
                </label>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
              <div className="text-xs text-gray-500">
                <p>Supported formats: PDF, JPG, PNG</p>
                <p>Maximum file size: 10MB per file</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedItem.id?.startsWith('INV') ? 'Invoice Details' : 'Payment Details'}
              </h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4">
              {selectedItem.id?.startsWith('INV') ? (
                // Invoice Details
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-600">Invoice ID</p>
                    <p className="text-gray-900">{selectedItem.id}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Period</p>
                    <p className="text-gray-900">{selectedItem.period}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Amount</p>
                    <p className="text-gray-900 font-semibold">${selectedItem.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Due Date</p>
                    <p className="text-gray-900">{selectedItem.dueDate}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(selectedItem.status)} border rounded`}>
                      {selectedItem.status}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Payment Status</p>
                    <p className={`text-sm font-medium ${getPaymentStatusColor(selectedItem.paymentStatus)}`}>
                      {selectedItem.paymentStatus}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-medium text-gray-600">Description</p>
                    <p className="text-gray-900">{selectedItem.description}</p>
                  </div>
                </div>
              ) : (
                // Payment Details
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-600">Payment ID</p>
                    <p className="text-gray-900">{selectedItem.id}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Invoice</p>
                    <p className="text-gray-900">{selectedItem.invoiceId}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Amount</p>
                    <p className="text-gray-900 font-semibold">${selectedItem.amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Payment Date</p>
                    <p className="text-gray-900">{selectedItem.paymentDate}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Method</p>
                    <p className="text-gray-900">{selectedItem.method}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Status</p>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(selectedItem.status)} border rounded`}>
                      {selectedItem.status}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Reference</p>
                    <p className="text-gray-900">{selectedItem.reference}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">Uploaded Date</p>
                    <p className="text-gray-900">{selectedItem.uploadedDate}</p>
                  </div>
                  {selectedItem.verifiedDate && (
                    <div>
                      <p className="font-medium text-gray-600">Verified Date</p>
                      <p className="text-gray-900">{selectedItem.verifiedDate}</p>
                    </div>
                  )}
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
                onClick={() => handleDownloadPDF(selectedItem)}
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

export default Invoices