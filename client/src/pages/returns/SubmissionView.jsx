import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, CheckCircle, XCircle, Calendar, FileText, Building2, User, AlertTriangle, Clock, BarChart3, Shield, DollarSign, Database } from 'lucide-react'

// Mock submitted data - in a real app, this would come from an API
const mockSubmittedData = {
  1: {
    bankName: "CBZ Bank Limited",
    bankCode: "CBZ",
    returnType: "Monthly Returns",
    submissionDate: "2024-01-15",
    dueDate: "2024-01-20",
    status: "Pending Review",
    validationStatus: "Passed",
    remarks: "All data validated successfully",
    fileSize: "2.4 MB",
    submittedBy: "John Smith",
    priority: "High",
    submittedData: {
      totalDeposits: 1250000000,
      insuredDeposits: 980000000,
      uninsuredDeposits: 270000000,
      numberOfAccounts: 45000,
      averageAccountSize: 27777.78,
      depositCategories: {
        "Savings Accounts": 450000000,
        "Current Accounts": 320000000,
        "Fixed Deposits": 280000000,
        "Other Deposits": 200000000
      },
      riskMetrics: {
        concentrationRisk: "Medium",
        liquidityRisk: "Low",
        creditRisk: "Low"
      },
      complianceStatus: {
        regulatoryCompliance: "Compliant",
        reportingAccuracy: "Accurate",
        timelinessScore: 95
      }
    }
  },
  2: {
    bankName: "Standard Chartered Bank Zimbabwe",
    bankCode: "SCB",
    returnType: "Quarterly Returns",
    submissionDate: "2024-01-14",
    dueDate: "2024-01-25",
    status: "Approved",
    validationStatus: "Passed",
    remarks: "Complete and accurate submission",
    fileSize: "3.1 MB",
    submittedBy: "Sarah Johnson",
    priority: "Medium",
    submittedData: {
      totalDeposits: 890000000,
      insuredDeposits: 720000000,
      uninsuredDeposits: 170000000,
      numberOfAccounts: 32000,
      averageAccountSize: 27812.50,
      depositCategories: {
        "Savings Accounts": 320000000,
        "Current Accounts": 280000000,
        "Fixed Deposits": 190000000,
        "Other Deposits": 100000000
      },
      riskMetrics: {
        concentrationRisk: "Low",
        liquidityRisk: "Low",
        creditRisk: "Medium"
      },
      complianceStatus: {
        regulatoryCompliance: "Compliant",
        reportingAccuracy: "Accurate",
        timelinessScore: 98
      }
    }
  }
}

export default function SubmissionView() {
  const location = useLocation()
  const navigate = useNavigate()
  const [submission, setSubmission] = useState(null)
  const [submittedData, setSubmittedData] = useState(null)
  const [activeTab, setActiveTab] = useState('prudential')
  const [currentStatus, setCurrentStatus] = useState('Pending Review')

  useEffect(() => {
    if (location.state?.submission) {
      setSubmission(location.state.submission)
      setCurrentStatus(location.state.submission.status)
      // In a real app, you'd fetch the actual submitted data from an API
      setSubmittedData(mockSubmittedData[location.state.submission.id])
    } else {
      // If no state, redirect back to submissions
      navigate('/client/returns')
    }
  }, [location.state, navigate])

  const handleDownload = () => {
    if (!submission) return

    const fileName = `${submission.bankCode}_${submission.returnType.replace(/\s+/g, '_')}_${submission.submissionDate}.pdf`
    const fileContent = `Submission Details for ${submission.bankName}
    
Return Type: ${submission.returnType}
Submission Date: ${submission.submissionDate}
Due Date: ${submission.dueDate}
Status: ${currentStatus}
Validation Status: ${submission.validationStatus}
Priority: ${submission.priority}
File Size: ${submission.fileSize}
Submitted By: ${submission.submittedBy}
Remarks: ${submission.remarks}

${submittedData ? `
SUBMITTED DATA:
Total Deposits: $${submittedData.totalDeposits?.toLocaleString() || 'N/A'}
Insured Deposits: $${submittedData.insuredDeposits?.toLocaleString() || 'N/A'}
Uninsured Deposits: $${submittedData.uninsuredDeposits?.toLocaleString() || 'N/A'}
Number of Accounts: ${submittedData.numberOfAccounts?.toLocaleString() || 'N/A'}
Average Account Size: $${submittedData.averageAccountSize?.toLocaleString() || 'N/A'}

DEPOSIT CATEGORIES:
${submittedData.depositCategories ? Object.entries(submittedData.depositCategories).map(([category, amount]) => 
  `${category}: $${amount?.toLocaleString() || 'N/A'}`
).join('\n') : 'No deposit category data available'}

RISK METRICS:
Concentration Risk: ${submittedData.riskMetrics?.concentrationRisk || 'N/A'}
Liquidity Risk: ${submittedData.riskMetrics?.liquidityRisk || 'N/A'}
Credit Risk: ${submittedData.riskMetrics?.creditRisk || 'N/A'}

COMPLIANCE STATUS:
Regulatory Compliance: ${submittedData.complianceStatus?.regulatoryCompliance || 'N/A'}
Reporting Accuracy: ${submittedData.complianceStatus?.reportingAccuracy || 'N/A'}
Timeliness Score: ${submittedData.complianceStatus?.timelinessScore || 'N/A'}%
` : 'No submitted data available'}

This is a mock download for demonstration purposes.`

    const blob = new Blob([fileContent], { type: 'text/plain' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = fileName
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleApprove = () => {
    setCurrentStatus('Approved')
    // In a real app, you'd make an API call to update the status
    console.log('Submission approved:', submission?.id)
  }

  if (!submission) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading submission...</p>
        </div>
      </div>
    )
  }

  if (!submittedData) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/client/returns')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">Submission Details</h1>
                <p className="text-sm text-gray-600">{submission.bankName} - {submission.returnType}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading submitted data...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Submission Details</h1>
            <p className="text-sm text-gray-600">{submission.bankName} - {submission.returnType}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleApprove}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1"
            >
              <CheckCircle className="h-3 w-3" />
              Approve
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1">
              <XCircle className="h-3 w-3" />
              Reject
            </button>
          </div>
        </div>
      </div>

      {/* Submission Info */}
      <div className="bg-white border border-gray-300 p-6">
        <h2 className="text-md font-semibold text-gray-800 mb-4">Submission Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Bank Name</label>
            <p className="text-sm text-gray-900">{submission.bankName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Bank Code</label>
            <p className="text-sm text-gray-900">{submission.bankCode}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Return Type</label>
            <p className="text-sm text-gray-900">{submission.returnType}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">File Size</label>
            <p className="text-sm text-gray-900">{submission.fileSize}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Submission Date</label>
            <p className="text-sm text-gray-900 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {submission.submissionDate}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Due Date</label>
            <p className="text-sm text-gray-900 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {submission.dueDate}
            </p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Status</label>
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
              currentStatus === 'Approved' ? 'bg-green-100 text-green-800 border-green-200' :
              currentStatus === 'Pending Review' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
              currentStatus === 'Rejected' ? 'bg-red-100 text-red-800 border-red-200' :
              'bg-gray-100 text-gray-800 border-gray-300'
            } border`}>
              {currentStatus}
            </span>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Priority</label>
            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
              submission.priority === 'Critical' ? 'bg-red-100 text-red-800 border-red-200' :
              submission.priority === 'High' ? 'bg-orange-100 text-orange-800 border-orange-200' :
              submission.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
              'bg-green-100 text-green-800 border-green-200'
            } border`}>
              {submission.priority}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <label className="text-sm font-medium text-gray-700">Remarks</label>
          <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded border-gray-300 border mt-1">{submission.remarks}</p>
        </div>
      </div>

      {/* Submitted Data Tabs */}
      <div className="bg-white border border-gray-300 p-6">
        <h2 className="text-md font-semibold text-gray-800 mb-4">Submitted Data</h2>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-300 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('prudential')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'prudential'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Prudential Returns
              </div>
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'financial'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Financial Statements
              </div>
            </button>
            <button
              onClick={() => setActiveTab('liquidity')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'liquidity'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Liquidity & Funding
              </div>
            </button>
            <button
              onClick={() => setActiveTab('capital')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'capital'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Capital Adequacy
              </div>
            </button>
            <button
              onClick={() => setActiveTab('scv')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scv'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Database className="h-4 w-4" />
                Single Customer View
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'prudential' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Prudential Returns Data</h3>
              <div className="space-y-4">
                {/* Key Financial Ratios */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Key Financial Ratios</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Capital Adequacy Ratio</p>
                      <p className="text-sm font-semibold text-gray-900">14.2%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Tier 1 Capital Ratio</p>
                      <p className="text-sm font-semibold text-gray-900">11.8%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Liquidity Coverage Ratio</p>
                      <p className="text-sm font-semibold text-gray-900">125.3%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Net Stable Funding Ratio</p>
                      <p className="text-sm font-semibold text-gray-900">118.7%</p>
                    </div>
                  </div>
                </div>

                {/* Risk Metrics */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Risk Exposure Metrics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Credit Risk Exposure</p>
                      <p className="text-sm font-semibold text-gray-900">$2,450,000,000</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Market Risk Exposure</p>
                      <p className="text-sm font-semibold text-gray-900">$180,000,000</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Operational Risk Exposure</p>
                      <p className="text-sm font-semibold text-gray-900">$95,000,000</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Concentration Risk (Top 10)</p>
                      <p className="text-sm font-semibold text-gray-900">$450,000,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'financial' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Comprehensive Financial Statements</h3>
              <div className="space-y-4">
                {/* Detailed Balance Sheet */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Balance Sheet (USD Millions) - As at 31 December 2024</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">ASSETS</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Cash and Balances with Central Bank</span>
                          <span className="text-xs font-medium text-gray-900">$125.4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Due from Other Banks</span>
                          <span className="text-xs font-medium text-gray-900">$89.2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Trading Securities</span>
                          <span className="text-xs font-medium text-gray-900">$45.8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Investment Securities - Available for Sale</span>
                          <span className="text-xs font-medium text-gray-900">$634.7</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Investment Securities - Held to Maturity</span>
                          <span className="text-xs font-medium text-gray-900">$180.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Loans and Advances to Customers</span>
                          <span className="text-xs font-medium text-gray-900">$2,450.8</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span className="text-xs text-gray-500">- Personal Loans</span>
                          <span className="text-xs font-medium text-gray-700">$890.2</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span className="text-xs text-gray-500">- Corporate Loans</span>
                          <span className="text-xs font-medium text-gray-700">$1,280.5</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span className="text-xs text-gray-500">- Mortgage Loans</span>
                          <span className="text-xs font-medium text-gray-700">$280.1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Allowance for Credit Losses</span>
                          <span className="text-xs font-medium text-red-600">($45.2)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Property, Plant & Equipment</span>
                          <span className="text-xs font-medium text-gray-900">$125.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Intangible Assets</span>
                          <span className="text-xs font-medium text-gray-900">$28.4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Other Assets</span>
                          <span className="text-xs font-medium text-gray-900">$95.7</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="text-xs font-semibold text-gray-700">TOTAL ASSETS</span>
                          <span className="text-xs font-semibold text-gray-900">$3,706.8</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-gray-700 mb-2">LIABILITIES & EQUITY</h5>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Customer Deposits</span>
                          <span className="text-xs font-medium text-gray-900">$2,890.4</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span className="text-xs text-gray-500">- Current Accounts</span>
                          <span className="text-xs font-medium text-gray-700">$980.5</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span className="text-xs text-gray-500">- Savings Accounts</span>
                          <span className="text-xs font-medium text-gray-700">$1,450.2</span>
                        </div>
                        <div className="flex justify-between pl-4">
                          <span className="text-xs text-gray-500">- Fixed Deposits</span>
                          <span className="text-xs font-medium text-gray-700">$459.7</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Due to Other Banks</span>
                          <span className="text-xs font-medium text-gray-900">$125.8</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Borrowings from Central Bank</span>
                          <span className="text-xs font-medium text-gray-900">$180.4</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Other Borrowings</span>
                          <span className="text-xs font-medium text-gray-900">$144.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Subordinated Debt</span>
                          <span className="text-xs font-medium text-gray-900">$45.2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Other Liabilities</span>
                          <span className="text-xs font-medium text-gray-900">$135.3</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Provisions</span>
                          <span className="text-xs font-medium text-gray-900">$28.5</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="text-xs font-semibold text-gray-700">TOTAL LIABILITIES</span>
                          <span className="text-xs font-semibold text-gray-900">$3,521.1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Share Capital</span>
                          <span className="text-xs font-medium text-gray-900">$125.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Share Premium</span>
                          <span className="text-xs font-medium text-gray-900">$45.2</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-xs text-gray-600">Retained Earnings</span>
                          <span className="text-xs font-medium text-gray-900">$15.5</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="text-xs font-semibold text-gray-700">TOTAL EQUITY</span>
                          <span className="text-xs font-semibold text-gray-900">$185.7</span>
                        </div>
                        <div className="flex justify-between border-t pt-1">
                          <span className="text-xs font-semibold text-gray-700">TOTAL LIABILITIES & EQUITY</span>
                          <span className="text-xs font-semibold text-gray-900">$3,706.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comprehensive Income Statement */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Income Statement (USD Millions) - Year Ended 31 December 2024</h4>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Interest Income</span>
                      <span className="text-xs font-medium text-gray-900">$245.8</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Loans and Advances</span>
                      <span className="text-xs font-medium text-gray-700">$198.5</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Investment Securities</span>
                      <span className="text-xs font-medium text-gray-700">$32.8</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Other Interest Income</span>
                      <span className="text-xs font-medium text-gray-700">$14.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Interest Expense</span>
                      <span className="text-xs font-medium text-gray-900">($125.3)</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Customer Deposits</span>
                      <span className="text-xs font-medium text-gray-700">($89.2)</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Borrowings</span>
                      <span className="text-xs font-medium text-gray-700">($36.1)</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="text-xs font-semibold text-gray-700">Net Interest Income</span>
                      <span className="text-xs font-semibold text-gray-900">$120.5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Non-Interest Income</span>
                      <span className="text-xs font-medium text-gray-900">$45.2</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Fees and Commissions</span>
                      <span className="text-xs font-medium text-gray-700">$28.5</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Trading Income</span>
                      <span className="text-xs font-medium text-gray-700">$8.2</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Other Income</span>
                      <span className="text-xs font-medium text-gray-700">$8.5</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="text-xs font-semibold text-gray-700">Total Operating Income</span>
                      <span className="text-xs font-semibold text-gray-900">$165.7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Operating Expenses</span>
                      <span className="text-xs font-medium text-gray-900">($95.8)</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Staff Costs</span>
                      <span className="text-xs font-medium text-gray-700">($45.2)</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Premises and Equipment</span>
                      <span className="text-xs font-medium text-gray-700">($18.5)</span>
                    </div>
                    <div className="flex justify-between pl-4">
                      <span className="text-xs text-gray-500">- Other Operating Expenses</span>
                      <span className="text-xs font-medium text-gray-700">($32.1)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Credit Loss Expense</span>
                      <span className="text-xs font-medium text-gray-900">($12.5)</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="text-xs font-semibold text-gray-700">Net Profit Before Tax</span>
                      <span className="text-xs font-semibold text-gray-900">$57.4</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Tax Expense</span>
                      <span className="text-xs font-medium text-gray-900">($18.5)</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="text-xs font-semibold text-gray-700">Net Profit After Tax</span>
                      <span className="text-xs font-semibold text-gray-900">$38.9</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Dividends Declared</span>
                      <span className="text-xs font-medium text-gray-900">($15.0)</span>
                    </div>
                    <div className="flex justify-between border-t pt-1">
                      <span className="text-xs font-semibold text-gray-700">Retained Earnings</span>
                      <span className="text-xs font-semibold text-gray-900">$23.9</span>
                    </div>
                  </div>
                </div>

                {/* Key Performance Indicators */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Key Performance Indicators</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Return on Assets (ROA)</p>
                      <p className="text-sm font-semibold text-green-600">1.05%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Return on Equity (ROE)</p>
                      <p className="text-sm font-semibold text-green-600">20.95%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Net Interest Margin</p>
                      <p className="text-sm font-semibold text-green-600">3.25%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Cost to Income Ratio</p>
                      <p className="text-sm font-semibold text-gray-600">57.8%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Loan to Deposit Ratio</p>
                      <p className="text-sm font-semibold text-gray-600">84.8%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Non-Performing Loans</p>
                      <p className="text-sm font-semibold text-yellow-600">2.8%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Earnings per Share</p>
                      <p className="text-sm font-semibold text-gray-900">$0.31</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Dividend per Share</p>
                      <p className="text-sm font-semibold text-gray-900">$0.12</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'liquidity' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Liquidity & Funding Metrics Data</h3>
              <div className="space-y-4">
                {/* Liquidity Ratios */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Liquidity Coverage Ratio (LCR)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">High Quality Liquid Assets</p>
                      <p className="text-sm font-semibold text-gray-900">$562.4M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Net Cash Outflows (30 days)</p>
                      <p className="text-sm font-semibold text-gray-900">$448.7M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">LCR Ratio</p>
                      <p className="text-sm font-semibold text-green-600">125.3%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Regulatory Minimum</p>
                      <p className="text-sm font-semibold text-gray-600">100.0%</p>
                    </div>
                  </div>
                </div>

                {/* Net Stable Funding Ratio */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Net Stable Funding Ratio (NSFR)</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Available Stable Funding</p>
                      <p className="text-sm font-semibold text-gray-900">$3,245.8M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Required Stable Funding</p>
                      <p className="text-sm font-semibold text-gray-900">$2,732.1M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">NSFR Ratio</p>
                      <p className="text-sm font-semibold text-green-600">118.7%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Regulatory Minimum</p>
                      <p className="text-sm font-semibold text-gray-600">100.0%</p>
                    </div>
                  </div>
                </div>

                {/* Currency Breakdown */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Currency Breakdown</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">USD Deposits</p>
                      <p className="text-sm font-semibold text-gray-900">$1,890.4M (65.4%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">ZWL Deposits</p>
                      <p className="text-sm font-semibold text-gray-900">$850.2M (29.4%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Other Currencies</p>
                      <p className="text-sm font-semibold text-gray-900">$149.8M (5.2%)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'capital' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Capital Adequacy & Risk Data</h3>
              <div className="space-y-4">
                {/* Capital Ratios */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Capital Adequacy Ratios</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Tier 1 Capital</p>
                      <p className="text-sm font-semibold text-gray-900">$185.7M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Tier 2 Capital</p>
                      <p className="text-sm font-semibold text-gray-900">$45.2M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total Capital</p>
                      <p className="text-sm font-semibold text-gray-900">$230.9M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Risk-Weighted Assets</p>
                      <p className="text-sm font-semibold text-gray-900">$1,625.4M</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-gray-600">Tier 1 Ratio</p>
                      <p className="text-sm font-semibold text-green-600">11.8%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total Capital Ratio</p>
                      <p className="text-sm font-semibold text-green-600">14.2%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Regulatory Minimum</p>
                      <p className="text-sm font-semibold text-gray-600">8.0%</p>
                    </div>
                  </div>
                </div>

                {/* Large Exposures */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Large Exposures (Top 10)</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Total Large Exposures</span>
                      <span className="text-sm font-semibold text-gray-900">$450.2M</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">% of Total Capital</span>
                      <span className="text-sm font-semibold text-gray-900">195.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-600">Regulatory Limit</span>
                      <span className="text-sm font-semibold text-gray-600">800.0%</span>
                    </div>
                  </div>
                </div>

                {/* Risk Exposures */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Risk Exposures by Category</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Credit Risk</p>
                      <p className="text-sm font-semibold text-gray-900">$2,450.8M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Market Risk</p>
                      <p className="text-sm font-semibold text-gray-900">$180.5M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Operational Risk</p>
                      <p className="text-sm font-semibold text-gray-900">$95.2M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Concentration Risk</p>
                      <p className="text-sm font-semibold text-gray-900">$450.2M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scv' && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Single Customer View (SCV) Data</h3>
              <div className="space-y-4">
                {/* Deposit Summary */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Deposit Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-600">Total Deposits</p>
                      <p className="text-sm font-semibold text-gray-900">$2,890.4M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Number of Accounts</p>
                      <p className="text-sm font-semibold text-gray-900">45,230</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Average Balance</p>
                      <p className="text-sm font-semibold text-gray-900">$63,945</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Insured Deposits</p>
                      <p className="text-sm font-semibold text-green-600">$2,890.4M</p>
                    </div>
                  </div>
                </div>

                {/* Account Types */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Deposit Account Types</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Savings Accounts</p>
                      <p className="text-sm font-semibold text-gray-900">$1,450.2M (50.2%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Current Accounts</p>
                      <p className="text-sm font-semibold text-gray-900">$980.5M (33.9%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Fixed Deposits</p>
                      <p className="text-sm font-semibold text-gray-900">$320.8M (11.1%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Other Deposits</p>
                      <p className="text-sm font-semibold text-gray-900">$138.9M (4.8%)</p>
                    </div>
                  </div>
                </div>

                {/* Customer Segments */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Customer Segments</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Retail Customers</p>
                      <p className="text-sm font-semibold text-gray-900">42,180 accounts</p>
                      <p className="text-xs text-gray-500">$1,890.4M (65.4%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Corporate Customers</p>
                      <p className="text-sm font-semibold text-gray-900">2,850 accounts</p>
                      <p className="text-xs text-gray-500">$850.2M (29.4%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Government Accounts</p>
                      <p className="text-sm font-semibold text-gray-900">200 accounts</p>
                      <p className="text-xs text-gray-500">$149.8M (5.2%)</p>
                    </div>
                  </div>
                </div>

                {/* Deposit Insurance Coverage */}
                <div className="bg-gray-50 p-4 border">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Deposit Insurance Coverage</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Fully Insured Accounts</p>
                      <p className="text-sm font-semibold text-green-600">44,890 (99.2%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Partially Insured Accounts</p>
                      <p className="text-sm font-semibold text-yellow-600">340 (0.8%)</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Uninsured Amount</p>
                      <p className="text-sm font-semibold text-gray-900">$0.0M</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Insurance Limit per Account</p>
                      <p className="text-sm font-semibold text-gray-600">$10,000</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
