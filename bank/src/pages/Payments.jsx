import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  CreditCard,
  Upload,
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  RefreshCw,
  Calendar,
  DollarSign,
  Building2,
  Filter,
  Search
} from 'lucide-react'

const Payments = () => {
  const { user } = useAuth()
  const [selectedInvoice, setSelectedInvoice] = useState('')
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentDate, setPaymentDate] = useState('')
  const [uploadedProof, setUploadedProof] = useState(null)
  const [uploadStatus, setUploadStatus] = useState('idle')

  // Mock payment data
  const payments = [
    {
      id: 'PAY-2024-001',
      invoiceId: 'INV-2024-002',
      amount: 7200000,
      paymentDate: '2024-01-10',
      status: 'Verified',
      proofFile: 'payment_proof_001.pdf',
      uploadedDate: '2024-01-10',
      verifiedDate: '2024-01-12',
      description: 'Q3 2023 Premium Payment'
    },
    {
      id: 'PAY-2024-002',
      invoiceId: 'INV-2024-001',
      amount: 8500000,
      paymentDate: '2024-01-15',
      status: 'Pending Verification',
      proofFile: 'payment_proof_002.pdf',
      uploadedDate: '2024-01-15',
      verifiedDate: null,
      description: 'Q4 2023 Premium Payment'
    },
    {
      id: 'PAY-2024-003',
      invoiceId: 'INV-2024-003',
      amount: 6800000,
      paymentDate: '2024-01-20',
      status: 'Rejected',
      proofFile: 'payment_proof_003.pdf',
      uploadedDate: '2024-01-20',
      verifiedDate: '2024-01-22',
      description: 'Q2 2023 Premium Payment',
      rejectionReason: 'Incorrect reference number'
    }
  ]

  const pendingInvoices = [
    {
      id: 'INV-2024-001',
      period: 'Q4 2023',
      amount: 8500000,
      dueDate: '2024-02-15',
      status: 'Pending'
    },
    {
      id: 'INV-2024-003',
      period: 'Q2 2023',
      amount: 6800000,
      dueDate: '2023-10-15',
      status: 'Overdue'
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'Verified': return 'text-green-600 bg-green-100 border-green-200'
      case 'Pending Verification': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'Rejected': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Verified': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'Pending Verification': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'Rejected': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    setUploadedProof(file)
  }

  const handleSubmitPayment = async () => {
    if (!selectedInvoice || !paymentAmount || !paymentDate || !uploadedProof) {
      alert('Please fill in all fields and upload proof of payment')
      return
    }

    setUploadStatus('uploading')
    
    // Simulate payment submission
    setTimeout(() => {
      setUploadStatus('success')
      alert('Payment proof submitted successfully. Awaiting verification.')
      // Reset form
      setSelectedInvoice('')
      setPaymentAmount('')
      setPaymentDate('')
      setUploadedProof(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Payment Management</h1>
            <p className="text-sm text-gray-600">Upload proof of payments and track verification status</p>
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

      {/* Payment Submission Form */}
      <div className="bg-white border border-gray-300 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Submit Payment Proof</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Invoice Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Invoice
            </label>
            <select
              value={selectedInvoice}
              onChange={(e) => {
                setSelectedInvoice(e.target.value)
                const invoice = pendingInvoices.find(inv => inv.id === e.target.value)
                if (invoice) {
                  setPaymentAmount(invoice.amount.toString())
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Invoice</option>
              {pendingInvoices.map((invoice) => (
                <option key={invoice.id} value={invoice.id}>
                  {invoice.id} - {invoice.period} (${invoice.amount.toLocaleString()})
                </option>
              ))}
            </select>
          </div>

          {/* Payment Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Amount
            </label>
            <div className="relative">
              <DollarSign className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Payment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Date
            </label>
            <div className="relative">
              <Calendar className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Proof Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Proof of Payment
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <div className="text-sm text-gray-600 mb-2">
                <p className="font-medium">Click to upload or drag and drop</p>
                <p>PDF, JPG, PNG files up to 5MB</p>
              </div>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="proof-upload"
              />
              <label
                htmlFor="proof-upload"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer inline-block text-sm"
              >
                Choose File
              </label>
            </div>
            {uploadedProof && (
              <div className="mt-2 p-2 bg-gray-50 rounded flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-gray-900">{uploadedProof.name}</span>
                </div>
                <button
                  onClick={() => setUploadedProof(null)}
                  className="text-red-600 hover:text-red-800"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmitPayment}
            disabled={!selectedInvoice || !paymentAmount || !paymentDate || !uploadedProof || uploadStatus === 'uploading'}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center"
          >
            {uploadStatus === 'uploading' ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Submit Payment Proof
              </>
            )}
          </button>
        </div>
      </div>

      {/* Payment History */}
      <div className="bg-white border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Payment ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Invoice</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Payment Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Verified Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{payment.id}</p>
                      <p className="text-xs text-gray-500">Uploaded: {payment.uploadedDate}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900">{payment.invoiceId}</p>
                    <p className="text-xs text-gray-500">{payment.description}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">${payment.amount.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{payment.paymentDate}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(payment.status)} border rounded`}>
                        {payment.status}
                      </span>
                    </div>
                    {payment.rejectionReason && (
                      <p className="text-xs text-red-600 mt-1">{payment.rejectionReason}</p>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm text-gray-900">
                      {payment.verifiedDate || 'Pending'}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="View Details">
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="Download Proof">
                        <Download className="h-3 w-3" />
                        Proof
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Instructions */}
      <div className="bg-green-50 border border-green-200 p-6">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Payment Instructions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-800 mb-2">Required Information</h4>
            <div className="text-sm text-green-700 space-y-1">
              <p>• Include invoice number in payment reference</p>
              <p>• Upload clear proof of payment (bank statement, receipt)</p>
              <p>• Ensure payment amount matches invoice exactly</p>
              <p>• Submit within 5 business days of payment</p>
            </div>
          </div>
          <div>
            <h4 className="font-medium text-green-800 mb-2">Verification Process</h4>
            <div className="text-sm text-green-700 space-y-1">
              <p>• DPC will verify payment within 2-3 business days</p>
              <p>• You'll receive email confirmation once verified</p>
              <p>• Payment status will update in your dashboard</p>
              <p>• Contact support if verification is delayed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payments
