import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { AlertTriangle, DollarSign, Calendar, Clock, Download, Eye, CreditCard, CheckCircle, X, Search, Filter } from 'lucide-react'

const Penalties = () => {
  const { user } = useAuth()
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedPenalty, setSelectedPenalty] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock penalties data
  const penalties = [
    {
      id: 'PEN-2024-001',
      type: 'Late Submission',
      description: 'Monthly returns submitted 5 days late',
      submissionId: 'SUB-2024-001',
      period: 'January 2024',
      dueDate: '2024-02-15',
      submittedDate: '2024-02-20',
      daysLate: 5,
      amount: 25000,
      status: 'Outstanding',
      issuedDate: '2024-02-21',
      dueDate: '2024-03-21',
      paymentStatus: 'Unpaid'
    },
    {
      id: 'PEN-2024-002',
      type: 'Data Quality',
      description: 'Multiple validation errors in quarterly returns',
      submissionId: 'SUB-2024-002',
      period: 'Q4 2023',
      dueDate: '2024-01-31',
      submittedDate: '2024-01-15',
      daysLate: 0,
      amount: 15000,
      status: 'Paid',
      issuedDate: '2024-01-16',
      dueDate: '2024-02-16',
      paymentStatus: 'Paid',
      paidDate: '2024-02-10'
    },
    {
      id: 'PEN-2024-003',
      type: 'Late Submission',
      description: 'SCV data submitted 3 days late',
      submissionId: 'SUB-2024-003',
      period: 'December 2023',
      dueDate: '2024-01-25',
      submittedDate: '2024-01-28',
      daysLate: 3,
      amount: 12000,
      status: 'Overdue',
      issuedDate: '2024-01-29',
      dueDate: '2024-02-29',
      paymentStatus: 'Overdue'
    },
    {
      id: 'PEN-2024-004',
      type: 'Incomplete Data',
      description: 'Missing required fields in financial statements',
      submissionId: 'SUB-2024-004',
      period: 'November 2023',
      dueDate: '2024-01-20',
      submittedDate: '2024-01-18',
      daysLate: 0,
      amount: 8000,
      status: 'Outstanding',
      issuedDate: '2024-01-19',
      dueDate: '2024-02-19',
      paymentStatus: 'Unpaid'
    }
  ]

  const handleViewPenalty = (penalty) => {
    setSelectedPenalty(penalty)
    setShowViewModal(true)
  }

  const handlePayPenalty = (penalty) => {
    alert(`Redirecting to payment gateway for penalty ${penalty.id} - Amount: $${penalty.amount.toLocaleString()}`)
  }

  const handleDownloadPenalty = (penalty) => {
    // Simulate penalty notice download
    const blob = new Blob(['Penalty notice content would be here'], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `penalty_notice_${penalty.id}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'text-green-600 bg-green-100 border-green-200'
      case 'Outstanding': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'Overdue': return 'text-red-600 bg-red-100 border-red-200'
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

  const filteredPenalties = penalties.filter(penalty => {
    const matchesStatus = filterStatus === 'All' || penalty.status === filterStatus
    const matchesSearch = penalty.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         penalty.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         penalty.period.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalPenalties = penalties.length
  const outstandingAmount = penalties
    .filter(p => p.status === 'Outstanding' || p.status === 'Overdue')
    .reduce((sum, p) => sum + p.amount, 0)
  const paidAmount = penalties
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + p.amount, 0)
  const overdueCount = penalties.filter(p => p.status === 'Overdue').length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4">
        <h1 className="text-lg font-bold text-gray-800">Penalties</h1>
        <p className="text-xs text-gray-600">View and manage penalties for late or incorrect submissions</p>
        <p className="text-xs text-gray-500">{user?.bankName} - {user?.role}</p>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 border border-blue-300">
              <AlertTriangle className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Penalties</h3>
              <p className="text-lg font-bold text-blue-700">{totalPenalties}</p>
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
              <p className="text-lg font-bold text-yellow-700">${outstandingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 border border-green-300">
              <CheckCircle className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Paid</h3>
              <p className="text-lg font-bold text-green-700">${paidAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 border border-red-300">
              <Clock className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Overdue</h3>
              <p className="text-lg font-bold text-red-700">{overdueCount}</p>
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
              <option value="Outstanding">Outstanding</option>
              <option value="Paid">Paid</option>
              <option value="Overdue">Overdue</option>
            </select>
            <div className="relative">
              <Search className="h-3 w-3 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search penalties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Penalties Table */}
      <div className="bg-white border border-gray-300">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-800">Penalty Notices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Penalty</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Type</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Period</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Amount</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Due Date</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPenalties.map((penalty) => (
                <tr key={penalty.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">{penalty.id}</p>
                        <p className="text-xs text-gray-500">{penalty.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border rounded">
                      {penalty.type}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <p className="text-xs text-gray-900">{penalty.period}</p>
                    {penalty.daysLate > 0 && (
                      <p className="text-xs text-red-600">{penalty.daysLate} days late</p>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <p className="text-xs font-semibold text-gray-900">${penalty.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(penalty.status)} border rounded`}>
                        {penalty.status}
                      </span>
                      <span className={`text-xs font-medium ${getPaymentStatusColor(penalty.paymentStatus)}`}>
                        {penalty.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-900">{penalty.dueDate}</p>
                        {penalty.paidDate && (
                          <p className="text-xs text-gray-500">Paid: {penalty.paidDate}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleViewPenalty(penalty)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                        title="View Details"
                      >
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                      <button 
                        onClick={() => handleDownloadPenalty(penalty)}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                        title="Download Notice"
                      >
                        <Download className="h-3 w-3" />
                        PDF
                      </button>
                      {(penalty.status === 'Outstanding' || penalty.status === 'Overdue') && (
                        <button 
                          onClick={() => handlePayPenalty(penalty)}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" 
                          title="Pay Penalty"
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

      {/* View Modal */}
      {showViewModal && selectedPenalty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Penalty Details</h3>
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
                  <p className="font-medium text-gray-600">Penalty ID</p>
                  <p className="text-gray-900">{selectedPenalty.id}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Type</p>
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 border rounded">
                    {selectedPenalty.type}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Period</p>
                  <p className="text-gray-900">{selectedPenalty.period}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Amount</p>
                  <p className="text-gray-900 font-semibold">${selectedPenalty.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Status</p>
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(selectedPenalty.status)} border rounded`}>
                    {selectedPenalty.status}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Payment Status</p>
                  <p className={`text-sm font-medium ${getPaymentStatusColor(selectedPenalty.paymentStatus)}`}>
                    {selectedPenalty.paymentStatus}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Issued Date</p>
                  <p className="text-gray-900">{selectedPenalty.issuedDate}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Due Date</p>
                  <p className="text-gray-900">{selectedPenalty.dueDate}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Submission ID</p>
                  <p className="text-gray-900">{selectedPenalty.submissionId}</p>
                </div>
                <div>
                  <p className="font-medium text-gray-600">Days Late</p>
                  <p className="text-gray-900">{selectedPenalty.daysLate}</p>
                </div>
                <div className="col-span-2">
                  <p className="font-medium text-gray-600">Description</p>
                  <p className="text-gray-900">{selectedPenalty.description}</p>
                </div>
                {selectedPenalty.paidDate && (
                  <div>
                    <p className="font-medium text-gray-600">Paid Date</p>
                    <p className="text-gray-900">{selectedPenalty.paidDate}</p>
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
                onClick={() => handleDownloadPenalty(selectedPenalty)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download Notice
              </button>
              {(selectedPenalty.status === 'Outstanding' || selectedPenalty.status === 'Overdue') && (
                <button 
                  onClick={() => handlePayPenalty(selectedPenalty)}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 rounded-lg flex items-center gap-2"
                >
                  <CreditCard className="h-4 w-4" />
                  Pay Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Penalties
