import React, { useState } from 'react'
import { 
  CheckCircle, 
  DollarSign, 
  Building2, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Download, 
  Eye, 
  FileText,
  Search,
  Filter,
  RefreshCw,
  Shield,
  User,
  CreditCard,
  Banknote,
  Receipt,
  Settings,
  TrendingUp,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  X,
  Check
} from 'lucide-react'

// Mock data for premium reconciliations
const mockReconciliations = [
  {
    id: 'REC-2024-001',
    bankName: 'CBZ Bank Limited',
    bankCode: 'CBZ',
    invoiceId: 'INV-2024-001',
    invoiceAmount: 4335600,
    paymentAmount: 4335600,
    paymentDate: '2024-01-20',
    reconciliationDate: '2024-01-21',
    status: 'Reconciled',
    variance: 0,
    variancePercentage: 0,
    reconciledBy: 'Sarah Chikwanda',
    notes: 'Perfect match - payment received on time',
    documents: ['invoice.pdf', 'payment_proof.pdf', 'bank_statement.pdf']
  },
  {
    id: 'REC-2024-002',
    bankName: 'Standard Chartered Bank Zimbabwe',
    bankCode: 'SCB',
    invoiceId: 'INV-2024-002',
    invoiceAmount: 2250000,
    paymentAmount: 2250000,
    paymentDate: '2024-01-18',
    reconciliationDate: '2024-01-19',
    status: 'Reconciled',
    variance: 0,
    variancePercentage: 0,
    reconciledBy: 'Sarah Chikwanda',
    notes: 'Payment received early - no issues',
    documents: ['invoice.pdf', 'cheque_copy.pdf', 'deposit_slip.pdf']
  },
  {
    id: 'REC-2024-003',
    bankName: 'Nedbank Zimbabwe',
    bankCode: 'NED',
    invoiceId: 'INV-2024-003',
    invoiceAmount: 1068000,
    paymentAmount: 1068000,
    paymentDate: '2024-01-25',
    reconciliationDate: null,
    status: 'Pending',
    variance: 0,
    variancePercentage: 0,
    reconciledBy: null,
    notes: null,
    documents: ['invoice.pdf', 'payment_proof.pdf']
  },
  {
    id: 'REC-2024-004',
    bankName: 'Ecobank Zimbabwe',
    bankCode: 'ECO',
    invoiceId: 'INV-2024-004',
    invoiceAmount: 1430000,
    paymentAmount: 1400000,
    paymentDate: '2024-01-30',
    reconciliationDate: '2024-01-31',
    status: 'Variance',
    variance: -30000,
    variancePercentage: -2.1,
    reconciledBy: 'Sarah Chikwanda',
    notes: 'Short payment - bank to be contacted for balance',
    documents: ['invoice.pdf', 'payment_proof.pdf', 'bank_statement.pdf']
  }
]

export default function PaymentReconciliation() {
  const [reconciliations, setReconciliations] = useState(mockReconciliations)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showReconcileModal, setShowReconcileModal] = useState(false)
  const [selectedReconciliation, setSelectedReconciliation] = useState(null)
  const [reconciliationNotes, setReconciliationNotes] = useState('')

  const getStatusColor = (status) => {
    switch (status) {
      case 'Reconciled': return 'bg-green-100 text-green-800 border-green-200'
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Variance': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'Disputed': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getVarianceColor = (variance) => {
    if (variance === 0) return 'text-green-600'
    if (variance > 0) return 'text-blue-600'
    return 'text-red-600'
  }

  const filteredReconciliations = reconciliations.filter(reconciliation => {
    const matchesStatus = filterStatus === 'All' || reconciliation.status === filterStatus
    const matchesSearch = reconciliation.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reconciliation.bankCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reconciliation.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reconciliation.invoiceId.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalInvoiced = reconciliations.reduce((sum, rec) => sum + rec.invoiceAmount, 0)
  const totalReceived = reconciliations.filter(r => r.status === 'Reconciled').reduce((sum, rec) => sum + rec.paymentAmount, 0)
  const totalVariance = reconciliations.reduce((sum, rec) => sum + rec.variance, 0)
  const totalPending = reconciliations.filter(r => r.status === 'Pending').length

  const handleReconcile = (reconciliationId) => {
    setSelectedReconciliation(reconciliations.find(r => r.id === reconciliationId))
    setShowReconcileModal(true)
  }

  const confirmReconciliation = () => {
    if (selectedReconciliation) {
      setReconciliations(reconciliations.map(rec => 
        rec.id === selectedReconciliation.id 
          ? { 
              ...rec, 
              status: 'Reconciled',
              reconciliationDate: new Date().toISOString().split('T')[0],
              reconciledBy: 'Current User',
              notes: reconciliationNotes
            }
          : rec
      ))
      setShowReconcileModal(false)
      setSelectedReconciliation(null)
      setReconciliationNotes('')
    }
  }

  const handleDispute = (reconciliationId) => {
    setReconciliations(reconciliations.map(rec => 
      rec.id === reconciliationId 
        ? { 
            ...rec, 
            status: 'Disputed',
            reconciliationDate: new Date().toISOString().split('T')[0],
            reconciledBy: 'Current User'
          }
        : rec
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Premium Reconciliations</h1>
            <p className="text-sm text-gray-600">Reconcile payments with invoices and maintain transaction statements</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              Auto Reconcile
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
            <div className="p-2 bg-blue-100 border border-blue-300">
              <DollarSign className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Invoiced</h3>
              <p className="text-sm font-semibold text-blue-700">${totalInvoiced.toLocaleString()}</p>
            </div>
          </div>
        </div>
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
            <div className="p-2 bg-orange-100 border border-orange-300">
              <TrendingUp className="h-4 w-4 text-orange-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Variance</h3>
              <p className={`text-sm font-semibold ${getVarianceColor(totalVariance)}`}>
                ${Math.abs(totalVariance).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 border border-yellow-300">
              <Clock className="h-4 w-4 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Pending</h3>
              <p className="text-sm font-semibold text-yellow-700">{totalPending}</p>
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
                placeholder="Search reconciliations..."
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
              <option value="Reconciled">Reconciled</option>
              <option value="Pending">Pending</option>
              <option value="Variance">Variance</option>
              <option value="Disputed">Disputed</option>
            </select>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-sm font-medium flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Reconciliations Table */}
      <div className="bg-white border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-md font-semibold text-gray-800">Payment Reconciliations</h2>
          <p className="text-sm text-gray-600">Invoice and payment matching with variance analysis</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Reconciliation</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Bank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Invoice Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Payment Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Variance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Reconciled By</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredReconciliations.map((reconciliation) => (
                <tr key={reconciliation.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{reconciliation.id}</p>
                      <p className="text-xs text-gray-500">{reconciliation.invoiceId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{reconciliation.bankName}</p>
                      <p className="text-xs text-gray-500">{reconciliation.bankCode}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">${reconciliation.invoiceAmount.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">${reconciliation.paymentAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{reconciliation.paymentDate}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      {reconciliation.variance > 0 && <ArrowRight className="h-3 w-3 text-blue-600" />}
                      {reconciliation.variance < 0 && <ArrowLeft className="h-3 w-3 text-red-600" />}
                      {reconciliation.variance === 0 && <Check className="h-3 w-3 text-green-600" />}
                      <span className={`font-semibold ${getVarianceColor(reconciliation.variance)}`}>
                        ${Math.abs(reconciliation.variance).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {reconciliation.variancePercentage > 0 ? '+' : ''}{reconciliation.variancePercentage.toFixed(1)}%
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(reconciliation.status)} border rounded`}>
                      {reconciliation.status}
                    </span>
                    {reconciliation.notes && (
                      <p className="text-xs text-gray-500 mt-1 max-w-xs truncate">{reconciliation.notes}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      {reconciliation.reconciledBy ? (
                        <>
                          <p className="text-gray-900">{reconciliation.reconciledBy}</p>
                          <p className="text-xs text-gray-500">{reconciliation.reconciliationDate}</p>
                        </>
                      ) : (
                        <p className="text-gray-500">Not reconciled</p>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {reconciliation.status === 'Pending' && (
                        <button
                          onClick={() => handleReconcile(reconciliation.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                          title="Reconcile Payment"
                        >
                          <CheckCircle className="h-3 w-3" />
                          Reconcile
                        </button>
                      )}
                      <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="View Details">
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                      {reconciliation.status === 'Variance' && (
                        <button
                          onClick={() => handleDispute(reconciliation.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                          title="Dispute Variance"
                        >
                          <X className="h-3 w-3" />
                          Dispute
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

      {/* Reconciliation Modal */}
      {showReconcileModal && selectedReconciliation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reconcile Payment</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Bank</label>
                <p className="text-sm text-gray-900">{selectedReconciliation.bankName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Invoice Amount</label>
                <p className="text-sm text-gray-900">${selectedReconciliation.invoiceAmount.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Payment Amount</label>
                <p className="text-sm text-gray-900">${selectedReconciliation.paymentAmount.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Variance</label>
                <p className={`text-sm font-semibold ${getVarianceColor(selectedReconciliation.variance)}`}>
                  ${Math.abs(selectedReconciliation.variance).toLocaleString()}
                  ({selectedReconciliation.variancePercentage > 0 ? '+' : ''}{selectedReconciliation.variancePercentage.toFixed(1)}%)
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Reconciliation Notes</label>
                <textarea
                  value={reconciliationNotes}
                  onChange={(e) => setReconciliationNotes(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter reconciliation notes..."
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowReconcileModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmReconciliation}
                className="px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg"
              >
                Confirm Reconciliation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
