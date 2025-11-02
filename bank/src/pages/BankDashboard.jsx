import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import {
  Building2,
  FileText,
  AlertTriangle,
  DollarSign,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Upload,
  CreditCard,
  Bell,
  Calendar,
  Shield,
  BarChart3,
  Download,
  RefreshCw,
  Eye,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

const BankDashboard = () => {
  const { user } = useAuth()
  const [selectedPeriod, setSelectedPeriod] = useState('current')

  // Mock data for bank dashboard
  const dashboardData = {
    complianceStatus: {
      overall: 'Good',
      score: 92,
      lastSubmission: '2024-01-15',
      nextDeadline: '2024-02-15',
      pendingReturns: 0,
      rejectedReturns: 1
    },
    premiumStatus: {
      currentInvoice: 8500000,
      dueDate: '2024-02-15',
      status: 'Pending',
      overdueAmount: 0,
      totalPaid: 25500000
    },
    recentActivity: [
      {
        id: 1,
        type: 'submission',
        title: 'December 2023 Returns Submitted',
        status: 'Under Review',
        date: '2024-01-15',
        icon: FileText,
        color: 'blue'
      },
      {
        id: 2,
        type: 'payment',
        title: 'Q4 2023 Premium Payment',
        status: 'Verified',
        date: '2024-01-10',
        amount: 8500000,
        icon: CreditCard,
        color: 'green'
      },
      {
        id: 3,
        type: 'alert',
        title: 'November 2023 Returns Rejected',
        status: 'Action Required',
        date: '2024-01-05',
        icon: AlertTriangle,
        color: 'red'
      },
      {
        id: 4,
        type: 'notification',
        title: 'SCV Data Upload Required',
        status: 'Due Soon',
        date: '2024-01-20',
        icon: Bell,
        color: 'yellow'
      }
    ],
    upcomingDeadlines: [
      {
        id: 1,
        title: 'January 2024 Returns',
        dueDate: '2024-02-15',
        type: 'Monthly Returns',
        priority: 'High',
        daysLeft: 15
      },
      {
        id: 2,
        title: 'Q4 2023 SCV Submission',
        dueDate: '2024-02-28',
        type: 'SCV Data',
        priority: 'Medium',
        daysLeft: 28
      },
      {
        id: 3,
        title: 'Premium Payment',
        dueDate: '2024-02-15',
        type: 'Payment',
        priority: 'High',
        daysLeft: 15
      }
    ],
    keyMetrics: {
      totalSubmissions: 12,
      successfulSubmissions: 11,
      pendingSubmissions: 1,
      totalPenalties: 25000,
      complianceScore: 92,
      lastAudit: '2024-01-10'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'text-green-600 bg-green-100 border-green-200'
      case 'Under Review': return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'Verified': return 'text-green-600 bg-green-100 border-green-200'
      case 'Action Required': return 'text-red-600 bg-red-100 border-red-200'
      case 'Due Soon': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'Low': return 'text-green-600 bg-green-100 border-green-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'submission': return <FileText className="h-4 w-4" />
      case 'payment': return <CreditCard className="h-4 w-4" />
      case 'alert': return <AlertTriangle className="h-4 w-4" />
      case 'notification': return <Bell className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Bank Dashboard</h1>
            <p className="text-xs text-gray-600">Welcome back, {user?.name}</p>
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

      {/* Compliance Status */}
      <div className="bg-white border border-gray-300 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-800">Compliance Status</h2>
          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(dashboardData.complianceStatus.overall)} border rounded`}>
            {dashboardData.complianceStatus.overall}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{dashboardData.complianceStatus.score}%</div>
            <div className="text-xs text-gray-600">Compliance Score</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{dashboardData.complianceStatus.pendingReturns}</div>
            <div className="text-xs text-gray-600">Pending Returns</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">{dashboardData.complianceStatus.rejectedReturns}</div>
            <div className="text-xs text-gray-600">Rejected Returns</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">{dashboardData.complianceStatus.nextDeadline}</div>
            <div className="text-xs text-gray-600">Next Deadline</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 border border-blue-300">
              <FileText className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Submissions</h3>
              <p className="text-lg font-bold text-blue-700">{dashboardData.keyMetrics.totalSubmissions}</p>
              <p className="text-xs text-green-600">{dashboardData.keyMetrics.successfulSubmissions} successful</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 border border-green-300">
              <DollarSign className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Premium Due</h3>
              <p className="text-lg font-bold text-green-700">${dashboardData.premiumStatus.currentInvoice.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Due: {dashboardData.premiumStatus.dueDate}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 border border-red-300">
              <AlertTriangle className="h-5 w-5 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Penalties</h3>
              <p className="text-lg font-bold text-red-700">${dashboardData.keyMetrics.totalPenalties.toLocaleString()}</p>
              <p className="text-xs text-gray-600">Outstanding amount</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 border border-purple-300">
              <Shield className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Compliance Score</h3>
              <p className="text-lg font-bold text-purple-700">{dashboardData.keyMetrics.complianceScore}%</p>
              <p className="text-xs text-gray-600">Last audit: {dashboardData.keyMetrics.lastAudit}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity and Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Activity */}
        <div className="bg-white border border-gray-300">
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-sm font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-4 space-y-3">
            {dashboardData.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  activity.color === 'blue' ? 'bg-blue-100' :
                  activity.color === 'green' ? 'bg-green-100' :
                  activity.color === 'red' ? 'bg-red-100' :
                  'bg-yellow-100'
                }`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{activity.title}</span>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(activity.status)} border rounded`}>
                      {activity.status}
                    </span>
                  </div>
                  {activity.amount && (
                    <p className="text-sm font-semibold text-green-600">${activity.amount.toLocaleString()}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        <div className="bg-white border border-gray-300">
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-sm font-semibold text-gray-800">Upcoming Deadlines</h2>
          </div>
          <div className="p-4 space-y-3">
            {dashboardData.upcomingDeadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{deadline.title}</p>
                    <p className="text-sm text-gray-600">{deadline.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getPriorityColor(deadline.priority)} border rounded`}>
                    {deadline.priority}
                  </span>
                  <p className="text-sm text-gray-600 mt-1">{deadline.daysLeft} days left</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white border border-gray-300 p-4">
        <h2 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <Upload className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Upload Returns</p>
                <p className="text-xs text-gray-600">Submit monthly returns</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Make Payment</p>
                <p className="text-xs text-gray-600">Pay premium invoice</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">View Reports</p>
                <p className="text-xs text-gray-600">Generate compliance reports</p>
              </div>
            </div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-900">Notifications</p>
                <p className="text-xs text-gray-600">View system alerts</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default BankDashboard
