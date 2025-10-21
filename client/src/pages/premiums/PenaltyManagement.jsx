import React, { useState } from 'react'
import { 
  AlertTriangle, 
  DollarSign, 
  Building2, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Download, 
  Eye, 
  FileText,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Shield,
  User,
  CreditCard,
  Banknote,
  Receipt,
  Settings,
  TrendingUp,
  BarChart3
} from 'lucide-react'

// Mock data for penalty levying
const mockPenalties = [
  {
    id: 'PEN-2024-001',
    bankName: 'CBZ Bank Limited',
    bankCode: 'CBZ',
    invoiceId: 'INV-2024-001',
    originalAmount: 4335600,
    dueDate: '2024-02-15',
    daysOverdue: 5,
    penaltyRate: 0.05,
    penaltyAmount: 216780,
    totalAmount: 4552380,
    status: 'Applied',
    appliedDate: '2024-02-20',
    appliedBy: 'System Auto',
    paymentStatus: 'Pending',
    reminderSent: 2
  },
  {
    id: 'PEN-2024-002',
    bankName: 'Standard Chartered Bank Zimbabwe',
    bankCode: 'SCB',
    invoiceId: 'INV-2024-002',
    originalAmount: 2250000,
    dueDate: '2024-02-15',
    daysOverdue: 0,
    penaltyRate: 0.00,
    penaltyAmount: 0,
    totalAmount: 2250000,
    status: 'Not Applicable',
    appliedDate: null,
    appliedBy: null,
    paymentStatus: 'Paid',
    reminderSent: 0
  },
  {
    id: 'PEN-2024-003',
    bankName: 'Nedbank Zimbabwe',
    bankCode: 'NED',
    invoiceId: 'INV-2024-003',
    originalAmount: 1068000,
    dueDate: '2024-02-15',
    daysOverdue: 10,
    penaltyRate: 0.10,
    penaltyAmount: 106800,
    totalAmount: 1174800,
    status: 'Applied',
    appliedDate: '2024-02-25',
    appliedBy: 'System Auto',
    paymentStatus: 'Pending',
    reminderSent: 3
  },
  {
    id: 'PEN-2024-004',
    bankName: 'Ecobank Zimbabwe',
    bankCode: 'ECO',
    invoiceId: 'INV-2024-004',
    originalAmount: 1430000,
    dueDate: '2024-02-15',
    daysOverdue: 15,
    penaltyRate: 0.15,
    penaltyAmount: 214500,
    totalAmount: 1644500,
    status: 'Applied',
    appliedDate: '2024-03-02',
    appliedBy: 'System Auto',
    paymentStatus: 'Overdue',
    reminderSent: 5
  }
]

export default function PenaltyManagement() {
  const [penalties, setPenalties] = useState(mockPenalties)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showConfigModal, setShowConfigModal] = useState(false)
  const [penaltyConfig, setPenaltyConfig] = useState({
    gracePeriod: 5,
    baseRate: 0.05,
    escalationRate: 0.02,
    maxRate: 0.25
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'bg-red-100 text-red-800 border-red-200'
      case 'Not Applicable': return 'bg-green-100 text-green-800 border-green-200'
      case 'Waived': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800 border-green-200'
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredPenalties = penalties.filter(penalty => {
    const matchesStatus = filterStatus === 'All' || penalty.status === filterStatus
    const matchesSearch = penalty.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         penalty.bankCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         penalty.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalPenalties = penalties.filter(p => p.status === 'Applied').reduce((sum, penalty) => sum + penalty.penaltyAmount, 0)
  const totalOverdue = penalties.filter(p => p.paymentStatus === 'Overdue').reduce((sum, penalty) => sum + penalty.totalAmount, 0)
  const totalPending = penalties.filter(p => p.paymentStatus === 'Pending').reduce((sum, penalty) => sum + penalty.totalAmount, 0)
  const totalApplied = penalties.filter(p => p.status === 'Applied').length

  const handleApplyPenalty = (penaltyId) => {
    setPenalties(penalties.map(penalty => 
      penalty.id === penaltyId 
        ? { 
            ...penalty, 
            status: 'Applied',
            appliedDate: new Date().toISOString().split('T')[0],
            appliedBy: 'Current User'
          }
        : penalty
    ))
  }

  const handleWaivePenalty = (penaltyId) => {
    setPenalties(penalties.map(penalty => 
      penalty.id === penaltyId 
        ? { 
            ...penalty, 
            status: 'Waived',
            penaltyAmount: 0,
            totalAmount: penalty.originalAmount,
            appliedDate: new Date().toISOString().split('T')[0],
            appliedBy: 'Current User'
          }
        : penalty
    ))
  }

  const handleSendReminder = (penaltyId) => {
    setPenalties(penalties.map(penalty => 
      penalty.id === penaltyId 
        ? { 
            ...penalty, 
            reminderSent: penalty.reminderSent + 1
          }
        : penalty
    ))
  }

  const calculatePenalty = (originalAmount, daysOverdue, penaltyRate) => {
    if (daysOverdue <= penaltyConfig.gracePeriod) return 0
    return originalAmount * penaltyRate
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Penalty Levying</h1>
            <p className="text-sm text-gray-600">Apply penalties for non-compliance with payment deadlines</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowConfigModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1"
            >
              <Settings className="h-3 w-3" />
              Configure
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
            <div className="p-2 bg-red-100 border border-red-300">
              <AlertTriangle className="h-4 w-4 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Penalties</h3>
              <p className="text-sm font-semibold text-red-700">${totalPenalties.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 border border-orange-300">
              <Clock className="h-4 w-4 text-orange-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Overdue Amount</h3>
              <p className="text-sm font-semibold text-orange-700">${totalOverdue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 border border-yellow-300">
              <TrendingUp className="h-4 w-4 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Pending</h3>
              <p className="text-sm font-semibold text-yellow-700">${totalPending.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 border border-blue-300">
              <Shield className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Penalties Applied</h3>
              <p className="text-sm font-semibold text-blue-700">{totalApplied}</p>
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
                placeholder="Search penalties..."
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
              <option value="Applied">Applied</option>
              <option value="Not Applicable">Not Applicable</option>
              <option value="Waived">Waived</option>
            </select>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-sm font-medium flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Penalties Table */}
      <div className="bg-white border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-md font-semibold text-gray-800">Penalty Levying</h2>
          <p className="text-sm text-gray-600">Applied penalties and payment tracking</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Penalty</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Bank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Original Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Days Overdue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Penalty Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Total Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPenalties.map((penalty) => (
                <tr key={penalty.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{penalty.id}</p>
                      <p className="text-xs text-gray-500">{penalty.invoiceId}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{penalty.bankName}</p>
                      <p className="text-xs text-gray-500">{penalty.bankCode}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">${penalty.originalAmount.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                      penalty.daysOverdue === 0 ? 'bg-green-100 text-green-800 border-green-200' :
                      penalty.daysOverdue <= 5 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-red-100 text-red-800 border-red-200'
                    } border rounded`}>
                      {penalty.daysOverdue} days
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-red-600">${penalty.penaltyAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{(penalty.penaltyRate * 100).toFixed(1)}% rate</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">${penalty.totalAmount.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(penalty.status)} border rounded`}>
                      {penalty.status}
                    </span>
                    {penalty.appliedBy && (
                      <p className="text-xs text-gray-500 mt-1">By: {penalty.appliedBy}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getPaymentStatusColor(penalty.paymentStatus)} border rounded`}>
                      {penalty.paymentStatus}
                    </span>
                    {penalty.reminderSent > 0 && (
                      <p className="text-xs text-gray-500 mt-1">{penalty.reminderSent} reminders</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {penalty.status === 'Not Applicable' && penalty.daysOverdue > penaltyConfig.gracePeriod && (
                        <button
                          onClick={() => handleApplyPenalty(penalty.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                          title="Apply Penalty"
                        >
                          <AlertTriangle className="h-3 w-3" />
                          Apply
                        </button>
                      )}
                      {penalty.status === 'Applied' && (
                        <button
                          onClick={() => handleWaivePenalty(penalty.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                          title="Waive Penalty"
                        >
                          <Shield className="h-3 w-3" />
                          Waive
                        </button>
                      )}
                      <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="View Details">
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                      {penalty.paymentStatus === 'Overdue' && (
                        <button
                          onClick={() => handleSendReminder(penalty.id)}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                          title="Send Reminder"
                        >
                          <Clock className="h-3 w-3" />
                          Remind
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

      {/* Penalty Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Penalty Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Grace Period (Days)</label>
                <input
                  type="number"
                  value={penaltyConfig.gracePeriod}
                  onChange={(e) => setPenaltyConfig({...penaltyConfig, gracePeriod: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Base Penalty Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={penaltyConfig.baseRate * 100}
                  onChange={(e) => setPenaltyConfig({...penaltyConfig, baseRate: parseFloat(e.target.value) / 100})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Escalation Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={penaltyConfig.escalationRate * 100}
                  onChange={(e) => setPenaltyConfig({...penaltyConfig, escalationRate: parseFloat(e.target.value) / 100})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Maximum Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={penaltyConfig.maxRate * 100}
                  onChange={(e) => setPenaltyConfig({...penaltyConfig, maxRate: parseFloat(e.target.value) / 100})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
