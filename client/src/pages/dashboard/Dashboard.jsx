import React, { useState } from 'react'
import {
  Building2,
  DollarSign,
  Shield,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  Activity,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  RefreshCw,
  FileText,
  CreditCard,
  Banknote,
  Target,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  Award,
  Zap,
  Calendar,
  Settings,
  Bell,
  Search,
  Filter
} from 'lucide-react'

// Mock data for dashboard
const mockDashboardData = {
  systemHealth: {
    status: 'Operational',
    uptime: 99.8,
    lastUpdate: '2024-01-15 14:30:00',
    alerts: 3,
    warnings: 2
  },
  keyMetrics: {
    totalBanks: 25,
    totalDeposits: 15000000000,
    insuredDeposits: 12000000000,
    coverageRatio: 80.0,
    totalAssets: 18000000000,
    premiumCollected: 45000000,
    pendingReturns: 3,
    overduePayments: 1
  },
  recentActivity: [
    {
      id: 1,
      type: 'premium_payment',
      bank: 'CBZ Bank Limited',
      description: 'Q4 2023 premium payment received',
      amount: 8500000,
      timestamp: '2024-01-15 10:30:00',
      status: 'completed'
    },
    {
      id: 2,
      type: 'return_submission',
      bank: 'Standard Chartered Bank',
      description: 'December 2023 returns submitted',
      timestamp: '2024-01-15 09:15:00',
      status: 'pending_review'
    },
    {
      id: 3,
      type: 'risk_assessment',
      bank: 'FBC Bank Limited',
      description: 'Risk score updated - improved rating',
      timestamp: '2024-01-14 16:45:00',
      status: 'completed'
    },
    {
      id: 4,
      type: 'compliance_check',
      bank: 'NMB Bank Limited',
      description: 'Monthly compliance review completed',
      timestamp: '2024-01-14 14:20:00',
      status: 'completed'
    },
    {
      id: 5,
      type: 'alert',
      bank: 'Zimbabwe Building Society',
      description: 'High risk alert - requires immediate attention',
      timestamp: '2024-01-14 11:10:00',
      status: 'urgent'
    }
  ],
  bankOverview: [
    {
      id: 1,
      name: "CBZ Bank Limited",
      code: "CBZ",
      status: "Active",
      camelsRating: 2.2,
      totalDeposits: 2890400000,
      riskScore: 0.15,
      complianceScore: 95,
      marketShare: 19.3,
      lastUpdated: "2024-01-15",
      alerts: 0,
      trend: "improving"
    },
    {
      id: 2,
      name: "Standard Chartered Bank",
      code: "SCB",
      status: "Active",
      camelsRating: 1.8,
      totalDeposits: 2100000000,
      riskScore: 0.08,
      complianceScore: 98,
      marketShare: 14.0,
      lastUpdated: "2024-01-15",
      alerts: 0,
      trend: "stable"
    },
    {
      id: 3,
      name: "FBC Bank Limited",
      code: "FBC",
      status: "Active",
      camelsRating: 2.8,
      totalDeposits: 1200000000,
      riskScore: 0.25,
      complianceScore: 92,
      marketShare: 8.0,
      lastUpdated: "2024-01-14",
      alerts: 1,
      trend: "declining"
    },
    {
      id: 4,
      name: "NMB Bank Limited",
      code: "NMB",
      status: "Active",
      camelsRating: 2.5,
      totalDeposits: 800000000,
      riskScore: 0.18,
      complianceScore: 94,
      marketShare: 5.3,
      lastUpdated: "2024-01-14",
      alerts: 0,
      trend: "stable"
    },
    {
      id: 5,
      name: "Zimbabwe Building Society",
      code: "ZBS",
      status: "Active",
      camelsRating: 3.5,
      totalDeposits: 600000000,
      riskScore: 0.35,
      complianceScore: 88,
      marketShare: 4.0,
      lastUpdated: "2024-01-13",
      alerts: 2,
      trend: "declining"
    }
  ],
  alerts: [
    {
      id: 1,
      type: 'high_risk',
      severity: 'critical',
      title: 'High Risk Banks',
      description: '2 institutions flagged for immediate review',
      count: 2,
      timestamp: '2024-01-15 14:30:00'
    },
    {
      id: 2,
      type: 'overdue_returns',
      severity: 'warning',
      title: 'Overdue Returns',
      description: '3 submissions pending beyond due date',
      count: 3,
      timestamp: '2024-01-15 12:00:00'
    },
    {
      id: 3,
      type: 'payment_overdue',
      severity: 'info',
      title: 'Premium Collection',
      description: '1 bank payment overdue',
      count: 1,
      timestamp: '2024-01-15 10:15:00'
    }
  ]
}

export default function Dashboard() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d')
  const [showAlerts, setShowAlerts] = useState(true)

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-200'
      case 'pending_review': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'urgent': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100 border-red-200'
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'info': return 'text-blue-600 bg-blue-100 border-blue-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getRiskColor = (score) => {
    if (score < 0.15) return 'text-green-600'
    if (score < 0.25) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getComplianceColor = (score) => {
    if (score >= 95) return 'text-green-600'
    if (score >= 90) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return <ArrowUp className="h-3 w-3 text-green-600" />
      case 'declining': return <ArrowDown className="h-3 w-3 text-red-600" />
      case 'stable': return <Minus className="h-3 w-3 text-gray-600" />
      default: return <Minus className="h-3 w-3 text-gray-600" />
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'premium_payment': return <DollarSign className="h-4 w-4 text-green-600" />
      case 'return_submission': return <FileText className="h-4 w-4 text-blue-600" />
      case 'risk_assessment': return <Shield className="h-4 w-4 text-purple-600" />
      case 'compliance_check': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'alert': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Regulatory Dashboard</h1>
            <p className="text-sm text-gray-600">Deposit Protection Corporation - System Overview</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">System Operational</span>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
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

      {/* System Health Status */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">System Health</h2>
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">{mockDashboardData.systemHealth.alerts} alerts</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{mockDashboardData.systemHealth.uptime}%</div>
            <div className="text-sm text-gray-600">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{mockDashboardData.systemHealth.status}</div>
            <div className="text-sm text-gray-600">Status</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{mockDashboardData.systemHealth.alerts}</div>
            <div className="text-sm text-gray-600">Active Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{mockDashboardData.systemHealth.warnings}</div>
            <div className="text-sm text-gray-600">Warnings</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 border border-blue-300">
              <Building2 className="h-5 w-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Banks</h3>
              <p className="text-2xl font-bold text-blue-700">{mockDashboardData.keyMetrics.totalBanks}</p>
              <p className="text-xs text-green-600">+2 this quarter</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 border border-green-300">
              <DollarSign className="h-5 w-5 text-green-700" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Total Deposits</h3>
              <p className="text-2xl font-bold text-green-700">${(mockDashboardData.keyMetrics.totalDeposits / 1000000000).toFixed(1)}B</p>
              <p className="text-xs text-green-600">+8.5% YoY</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 border border-purple-300">
              <Shield className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Insured Deposits</h3>
              <p className="text-2xl font-bold text-purple-700">${(mockDashboardData.keyMetrics.insuredDeposits / 1000000000).toFixed(1)}B</p>
              <p className="text-xs text-gray-600">{mockDashboardData.keyMetrics.coverageRatio}% coverage</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 border border-orange-300">
              <Target className="h-5 w-5 text-orange-700" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-600">Premium Collected</h3>
              <p className="text-2xl font-bold text-orange-700">${(mockDashboardData.keyMetrics.premiumCollected / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-gray-600">This quarter</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Alerts */}
        <div className="bg-white border border-gray-300">
          <div className="p-6 border-b border-gray-300">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">System Alerts</h2>
              <button
                onClick={() => setShowAlerts(!showAlerts)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showAlerts ? 'Hide' : 'Show'} Details
              </button>
            </div>
          </div>
          <div className="p-6 space-y-3">
            {mockDashboardData.alerts.map((alert) => (
              <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">{alert.title}</span>
                  </div>
                  <span className="text-sm font-bold">{alert.count}</span>
                </div>
                <p className="text-sm mt-1">{alert.description}</p>
                <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white border border-gray-300">
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-6 space-y-4">
            {mockDashboardData.recentActivity.slice(0, 5).map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{activity.bank}</span>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(activity.status)} border rounded`}>
                      {activity.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  {activity.amount && (
                    <p className="text-sm font-semibold text-green-600">${activity.amount.toLocaleString()}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bank Overview */}
      <div className="bg-white border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Bank Overview</h2>
              <p className="text-sm text-gray-600">Real-time status and performance metrics</p>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
              </select>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 text-xs font-medium flex items-center gap-1">
                <Filter className="h-3 w-3" />
                Filter
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Institution</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">CAMELS Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Total Deposits</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Market Share</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Compliance</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockDashboardData.bankOverview.map((bank) => (
                <tr key={bank.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                  <div>
                        <p className="font-medium text-gray-900">{bank.name}</p>
                        <p className="text-xs text-gray-500">{bank.code}</p>
                      </div>
                      {bank.alerts > 0 && (
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                          <span className="text-xs text-red-600">{bank.alerts}</span>
                        </div>
                      )}
                  </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                        bank.camelsRating <= 2 ? 'bg-green-100 text-green-800 border-green-200' :
                        bank.camelsRating <= 3 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-red-100 text-red-800 border-red-200'
                      } border rounded`}>
                    {bank.camelsRating}
                      </span>
                      {getTrendIcon(bank.trend)}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            bank.riskScore < 0.15 ? 'bg-green-500' :
                            bank.riskScore < 0.25 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${bank.riskScore * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-sm font-medium ${getRiskColor(bank.riskScore)}`}>
                        {(bank.riskScore * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">${(bank.totalDeposits / 1000000000).toFixed(1)}B</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${bank.marketShare}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{bank.marketShare}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            bank.complianceScore >= 95 ? 'bg-green-500' :
                            bank.complianceScore >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${bank.complianceScore}%` }}
                        ></div>
                  </div>
                      <span className={`text-sm font-medium ${getComplianceColor(bank.complianceScore)}`}>
                        {bank.complianceScore}%
                      </span>
                  </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                      bank.status === 'Active' ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'
                    } border rounded`}>
                    {bank.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="View Details">
                        <Eye className="h-3 w-3" />
                        View
                      </button>
                      <button className="bg-gray-500 hover:bg-gray-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="Generate Report">
                        <Download className="h-3 w-3" />
                        Report
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
  )
}

