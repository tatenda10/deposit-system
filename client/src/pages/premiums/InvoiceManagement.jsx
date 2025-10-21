import React, { useState } from 'react'
import { 
  FileText, 
  DollarSign, 
  Building2, 
  Calendar, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Download, 
  Send, 
  Eye, 
  RefreshCw,
  Filter,
  Search,
  Plus,
  Settings,
  BarChart3,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react'

// Mock data for premium invoices
const mockInvoices = [
  {
    id: 'INV-2024-001',
    bankName: 'CBZ Bank Limited',
    bankCode: 'CBZ',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-15',
    premiumAmount: 4335600,
    status: 'Sent',
    paymentStatus: 'Pending',
    sentDate: '2024-01-15',
    accountingPosted: true,
    lastReminder: null,
    reminderCount: 0
  },
  {
    id: 'INV-2024-002',
    bankName: 'Standard Chartered Bank Zimbabwe',
    bankCode: 'SCB',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-15',
    premiumAmount: 2250000,
    status: 'Sent',
    paymentStatus: 'Paid',
    sentDate: '2024-01-15',
    accountingPosted: true,
    lastReminder: null,
    reminderCount: 0
  },
  {
    id: 'INV-2024-003',
    bankName: 'Nedbank Zimbabwe',
    bankCode: 'NED',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-15',
    premiumAmount: 1068000,
    status: 'Draft',
    paymentStatus: 'Pending',
    sentDate: null,
    accountingPosted: false,
    lastReminder: null,
    reminderCount: 0
  },
  {
    id: 'INV-2024-004',
    bankName: 'Ecobank Zimbabwe',
    bankCode: 'ECO',
    invoiceDate: '2024-01-15',
    dueDate: '2024-02-15',
    premiumAmount: 1430000,
    status: 'Sent',
    paymentStatus: 'Overdue',
    sentDate: '2024-01-15',
    accountingPosted: true,
    lastReminder: '2024-02-20',
    reminderCount: 2
  }
]

export default function InvoiceManagement() {
  const [invoices, setInvoices] = useState(mockInvoices)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showGenerateModal, setShowGenerateModal] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('2024-01')

  const getStatusColor = (status) => {
    switch (status) {
      case 'Sent': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Draft': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Cancelled': return 'bg-red-100 text-red-800 border-red-200'
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

  const filteredInvoices = invoices.filter(invoice => {
    const matchesStatus = filterStatus === 'All' || invoice.status === filterStatus
    const matchesSearch = invoice.bankName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.bankCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.premiumAmount, 0)
  const totalPaid = invoices.filter(inv => inv.paymentStatus === 'Paid').reduce((sum, invoice) => sum + invoice.premiumAmount, 0)
  const totalPending = invoices.filter(inv => inv.paymentStatus === 'Pending').reduce((sum, invoice) => sum + invoice.premiumAmount, 0)
  const totalOverdue = invoices.filter(inv => inv.paymentStatus === 'Overdue').reduce((sum, invoice) => sum + invoice.premiumAmount, 0)

  const handleSendInvoice = (invoiceId) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId 
        ? { ...invoice, status: 'Sent', sentDate: new Date().toISOString().split('T')[0] }
        : invoice
    ))
  }

  const handleGenerateInvoices = () => {
    // In a real app, this would generate invoices for all banks
    console.log('Generating invoices for period:', selectedPeriod)
    setShowGenerateModal(false)
  }

  const handleSendReminder = (invoiceId) => {
    setInvoices(invoices.map(invoice => 
      invoice.id === invoiceId 
        ? { 
            ...invoice, 
            lastReminder: new Date().toISOString().split('T')[0],
            reminderCount: invoice.reminderCount + 1
          }
        : invoice
    ))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Premium Invoicing</h1>
            <p className="text-sm text-gray-600">Generate automated premium invoices and transmit to accounting system</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowGenerateModal(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1"
            >
              <Plus className="h-3 w-3" />
              Generate Invoices
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
              <h3 className="text-xs font-medium text-gray-600">Total Paid</h3>
              <p className="text-sm font-semibold text-green-700">${totalPaid.toLocaleString()}</p>
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
              <h3 className="text-xs font-medium text-gray-600">Overdue</h3>
              <p className="text-sm font-semibold text-red-700">${totalOverdue.toLocaleString()}</p>
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
                placeholder="Search invoices..."
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
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 text-sm font-medium flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-md font-semibold text-gray-800">Premium Invoices</h2>
          <p className="text-sm text-gray-600">Generated invoices and payment tracking</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Invoice</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Bank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Due Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Accounting</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{invoice.id}</p>
                      <p className="text-xs text-gray-500">{invoice.invoiceDate}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{invoice.bankName}</p>
                      <p className="text-xs text-gray-500">{invoice.bankCode}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">${invoice.premiumAmount.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-900">{invoice.dueDate}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(invoice.status)} border rounded`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getPaymentStatusColor(invoice.paymentStatus)} border rounded`}>
                      {invoice.paymentStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                      invoice.accountingPosted ? 'bg-green-100 text-green-800 border-green-200' : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                    } border rounded`}>
                      {invoice.accountingPosted ? 'Posted' : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {invoice.status === 'Draft' && (
                        <button
                          onClick={() => handleSendInvoice(invoice.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                          title="Send Invoice"
                        >
                          <Send className="h-3 w-3" />
                          Send
                        </button>
                      )}
                      <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="View Invoice">
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                      {invoice.paymentStatus === 'Overdue' && (
                        <button
                          onClick={() => handleSendReminder(invoice.id)}
                          className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                          title="Send Reminder"
                        >
                          <AlertTriangle className="h-3 w-3" />
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

      {/* Generate Invoices Modal */}
      {showGenerateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Premium Invoices</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Billing Period</label>
                <input
                  type="month"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Invoice Due Date</label>
                <input
                  type="date"
                  defaultValue="2024-02-15"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Auto-Post to Accounting</label>
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Automatically post invoices to accounting system</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowGenerateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateInvoices}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
              >
                Generate Invoices
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
