import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { RefreshCw, DollarSign, CheckCircle, AlertTriangle, Calendar, Download, Eye, X, Search, Filter, CreditCard, FileText } from 'lucide-react'

const Reconciliation = () => {
  const { user } = useAuth()
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedReconciliation, setSelectedReconciliation] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock reconciliation data
  const reconciliations = [
    {
      id: 'REC-2024-001',
      invoiceId: 'INV-2024-001',
      invoiceAmount: 8500000,
      paymentAmount: 8500000,
      paymentId: 'PAY-2024-001',
      status: 'Reconciled',
      invoiceDate: '2024-01-15',
      paymentDate: '2024-02-10',
      reconciledDate: '2024-02-12',
      difference: 0,
      notes: 'Full payment received and reconciled'
    },
    {
      id: 'REC-2024-002',
      invoiceId: 'INV-2024-002',
      invoiceAmount: 7200000,
      paymentAmount: 7000000,
      paymentId: 'PAY-2024-002',
      status: 'Partial',
      invoiceDate: '2024-01-10',
      paymentDate: '2024-02-05',
      reconciledDate: '2024-02-08',
      difference: -200000,
      notes: 'Partial payment - $200,000 outstanding'
    },
    {
      id: 'REC-2024-003',
      invoiceId: 'INV-2024-003',
      invoiceAmount: 6800000,
      paymentAmount: 0,
      paymentId: null,
      status: 'Outstanding',
      invoiceDate: '2024-01-05',
      paymentDate: null,
      reconciledDate: null,
      difference: -6800000,
      notes: 'No payment received - invoice overdue'
    },
    {
      id: 'REC-2024-004',
      invoiceId: 'INV-2024-004',
      invoiceAmount: 6200000,
      paymentAmount: 6200000,
      paymentId: 'PAY-2024-003',
      status: 'Reconciled',
      invoiceDate: '2023-12-15',
      paymentDate: '2024-01-10',
      reconciledDate: '2024-01-12',
      difference: 0,
      notes: 'Payment received and fully reconciled'
    }
  ]

  const handleViewReconciliation = (reconciliation) => {
    setSelectedReconciliation(reconciliation)
    setShowViewModal(true)
  }

  const handleDownloadReconciliation = (reconciliation) => {
    // Simulate reconciliation report download
    const blob = new Blob(['Reconciliation report content would be here'], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `reconciliation_report_${reconciliation.id}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reconciled': return 'text-green-600 bg-green-100 border-green-200'
      case 'Partial': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'Outstanding': return 'text-red-600 bg-red-100 border-red-200'
      case 'Discrepancy': return 'text-orange-600 bg-orange-100 border-orange-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Reconciled': return CheckCircle
      case 'Partial': return AlertTriangle
      case 'Outstanding': return AlertTriangle
      case 'Discrepancy': return AlertTriangle
      default: return FileText
    }
  }

  const filteredReconciliations = reconciliations.filter(reconciliation => {
    const matchesStatus = filterStatus === 'All' || reconciliation.status === filterStatus
    const matchesSearch = reconciliation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reconciliation.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reconciliation.paymentId?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalInvoices = reconciliations.length
  const reconciledCount = reconciliations.filter(r => r.status === 'Reconciled').length
  const outstandingCount = reconciliations.filter(r => r.status === 'Outstanding').length
  const totalOutstanding = reconciliations
    .filter(r => r.status === 'Outstanding' || r.status === 'Partial')
    .reduce((sum, r) => sum + Math.abs(r.difference), 0)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4">
        <h1 className="text-lg font-bold text-gray-800">Reconciliation</h1>
        <p className="text-xs text-gray-600">Reconcile invoice payments and track outstanding balances</p>
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
              <h3 className="text-xs font-medium text-gray-600">Total Invoices</h3>
              <p className="text-lg font-bold text-blue-700">{totalInvoices}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 border border-green-300">
              <CheckCircle className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Reconciled</h3>
              <p className="text-lg font-bold text-green-700">{reconciledCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 border border-red-300">
              <AlertTriangle className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Outstanding</h3>
              <p className="text-lg font-bold text-red-700">{outstandingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 border border-yellow-300">
              <DollarSign className="h-5 w-5 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Outstanding Amount</h3>
              <p className="text-lg font-bold text-yellow-700">${totalOutstanding.toLocaleString()}</p>
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
              <option value="Reconciled">Reconciled</option>
              <option value="Partial">Partial</option>
              <option value="Outstanding">Outstanding</option>
              <option value="Discrepancy">Discrepancy</option>
            </select>
            <div className="relative">
              <Search className="h-3 w-3 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search reconciliations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Reconciliation Table */}
      <div className="bg-white border border-gray-300">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">Payment Reconciliation</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Reconciliation</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Invoice</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Payment</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Invoice Amount</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Payment Amount</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Difference</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReconciliations.map((reconciliation) => {
                const StatusIcon = getStatusIcon(reconciliation.status)
                return (
                  <tr key={reconciliation.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-3">
                        <StatusIcon className="h-4 w-4 text-blue-600" />
                        <div>
                          <p className="text-xs font-medium text-gray-900">{reconciliation.id}</p>
                          <p className="text-xs text-gray-500">
                            {reconciliation.reconciledDate ? `Reconciled: ${reconciliation.reconciledDate}` : 'Not reconciled'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div>
                        <p className="text-xs font-medium text-gray-900">{reconciliation.invoiceId}</p>
                        <p className="text-xs text-gray-500">{reconciliation.invoiceDate}</p>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <div>
                        <p className="text-xs font-medium text-gray-900">{reconciliation.paymentId || 'N/A'}</p>
                        <p className="text-xs text-gray-500">{reconciliation.paymentDate || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs font-semibold text-gray-900">${reconciliation.invoiceAmount.toLocaleString()}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p className="text-xs font-semibold text-gray-900">${reconciliation.paymentAmount.toLocaleString()}</p>
                    </td>
                    <td className="px-3 py-2">
                      <p className={`text-xs font-semibold ${
                        reconciliation.difference === 0 ? 'text-green-600' : 
                        reconciliation.difference < 0 ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {reconciliation.difference === 0 ? 'Balanced' : `$${Math.abs(reconciliation.difference).toLocaleString()}`}
                      </p>
                    </td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(reconciliation.status)} border rounded`}>
                        {reconciliation.status}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleViewReconciliation(reconciliation)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                          title="View Details"
                        >
                          <Eye className="h-3 w-3" />
                          View
                        </button>
                        <button 
                          onClick={() => handleDownloadReconciliation(reconciliation)}
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
      {showViewModal && selectedReconciliation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Reconciliation Details</h3>
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
                  <p className="font-medium text-gray-600">Reconciliation ID</p>
                  <p className="text-gray-900">{selectedReconciliation.id}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(selectedReconciliation.status)} border rounded`}>
                    {selectedReconciliation.status}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Invoice ID</p>
                  <p className="text-gray-900">{selectedReconciliation.invoiceId}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Payment ID</p>
                  <p className="text-gray-900">{selectedReconciliation.paymentId || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Invoice Amount</p>
                  <p className="text-gray-900 font-semibold">${selectedReconciliation.invoiceAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Payment Amount</p>
                  <p className="text-gray-900 font-semibold">${selectedReconciliation.paymentAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Difference</p>
                  <p className={`text-sm font-semibold ${
                    selectedReconciliation.difference === 0 ? 'text-green-600' : 
                    selectedReconciliation.difference < 0 ? 'text-red-600' : 'text-blue-600'
                  }`}>
                    {selectedReconciliation.difference === 0 ? 'Balanced' : `$${Math.abs(selectedReconciliation.difference).toLocaleString()}`}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Invoice Date</p>
                  <p className="text-gray-900">{selectedReconciliation.invoiceDate}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Payment Date</p>
                  <p className="text-gray-900">{selectedReconciliation.paymentDate || 'N/A'}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Reconciled Date</p>
                  <p className="text-gray-900">{selectedReconciliation.reconciledDate || 'Not reconciled'}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-medium text-gray-600">Notes</p>
                  <p className="text-gray-900">{selectedReconciliation.notes}</p>
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
                onClick={() => handleDownloadReconciliation(selectedReconciliation)}
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

export default Reconciliation
