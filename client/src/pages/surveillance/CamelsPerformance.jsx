import React, { useState } from 'react'
import {
  Shield,
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  PieChart,
  Download,
  RefreshCw,
  Eye,
  Filter,
  Search,
  Calendar,
  Users,
  CreditCard,
  Banknote,
  Target,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  Award,
  Activity,
  Zap
} from 'lucide-react'

// Mock data for CAMELS performance
const mockCamelsData = [
  {
    id: 1,
    bankName: 'CBZ Bank Limited',
    bankCode: 'CBZ',
    overallRating: 2.8,
    capital: {
      rating: 3.0,
      tier1Ratio: 12.5,
      totalRatio: 15.2,
      leverageRatio: 8.1,
      trend: 'stable'
    },
    assetQuality: {
      rating: 2.5,
      nplRatio: 3.2,
      coverageRatio: 85.0,
      provisionRatio: 2.8,
      trend: 'improving'
    },
    management: {
      rating: 3.0,
      governance: 3.2,
      riskManagement: 2.8,
      compliance: 3.0,
      trend: 'stable'
    },
    earnings: {
      rating: 2.5,
      roa: 1.8,
      roe: 15.2,
      netInterestMargin: 4.2,
      trend: 'improving'
    },
    liquidity: {
      rating: 3.5,
      liquidityRatio: 25.8,
      loanToDepositRatio: 78.5,
      cashRatio: 12.3,
      trend: 'stable'
    },
    sensitivity: {
      rating: 3.0,
      interestRateRisk: 2.8,
      marketRisk: 3.2,
      operationalRisk: 3.0,
      trend: 'stable'
    },
    lastUpdated: '2024-01-15',
    nextReview: '2024-04-15',
    status: 'Current',
    riskLevel: 'Moderate'
  },
  {
    id: 2,
    bankName: 'Standard Chartered Bank',
    bankCode: 'SCB',
    overallRating: 2.2,
    capital: {
      rating: 2.0,
      tier1Ratio: 15.8,
      totalRatio: 18.5,
      leverageRatio: 9.2,
      trend: 'improving'
    },
    assetQuality: {
      rating: 2.0,
      nplRatio: 2.1,
      coverageRatio: 95.0,
      provisionRatio: 3.2,
      trend: 'improving'
    },
    management: {
      rating: 2.5,
      governance: 2.8,
      riskManagement: 2.2,
      compliance: 2.5,
      trend: 'improving'
    },
    earnings: {
      rating: 2.0,
      roa: 2.2,
      roe: 18.5,
      netInterestMargin: 4.8,
      trend: 'improving'
    },
    liquidity: {
      rating: 2.5,
      liquidityRatio: 28.5,
      loanToDepositRatio: 72.0,
      cashRatio: 15.2,
      trend: 'improving'
    },
    sensitivity: {
      rating: 2.5,
      interestRateRisk: 2.2,
      marketRisk: 2.8,
      operationalRisk: 2.5,
      trend: 'improving'
    },
    lastUpdated: '2024-01-15',
    nextReview: '2024-04-15',
    status: 'Current',
    riskLevel: 'Low'
  },
  {
    id: 3,
    bankName: 'Nedbank Zimbabwe',
    bankCode: 'NED',
    overallRating: 3.2,
    capital: {
      rating: 3.5,
      tier1Ratio: 10.8,
      totalRatio: 13.2,
      leverageRatio: 7.5,
      trend: 'declining'
    },
    assetQuality: {
      rating: 3.0,
      nplRatio: 4.5,
      coverageRatio: 75.0,
      provisionRatio: 2.2,
      trend: 'declining'
    },
    management: {
      rating: 3.5,
      governance: 3.8,
      riskManagement: 3.2,
      compliance: 3.5,
      trend: 'stable'
    },
    earnings: {
      rating: 3.0,
      roa: 1.2,
      roe: 12.8,
      netInterestMargin: 3.5,
      trend: 'declining'
    },
    liquidity: {
      rating: 2.8,
      liquidityRatio: 22.5,
      loanToDepositRatio: 82.0,
      cashRatio: 10.8,
      trend: 'stable'
    },
    sensitivity: {
      rating: 3.2,
      interestRateRisk: 3.5,
      marketRisk: 3.0,
      operationalRisk: 3.2,
      trend: 'stable'
    },
    lastUpdated: '2024-01-15',
    nextReview: '2024-04-15',
    status: 'Current',
    riskLevel: 'High'
  },
  {
    id: 4,
    bankName: 'Ecobank Zimbabwe',
    bankCode: 'ECO',
    overallRating: 2.8,
    capital: {
      rating: 3.0,
      tier1Ratio: 11.5,
      totalRatio: 14.0,
      leverageRatio: 7.8,
      trend: 'stable'
    },
    assetQuality: {
      rating: 2.8,
      nplRatio: 3.8,
      coverageRatio: 80.0,
      provisionRatio: 2.5,
      trend: 'stable'
    },
    management: {
      rating: 2.8,
      governance: 3.0,
      riskManagement: 2.5,
      compliance: 2.8,
      trend: 'stable'
    },
    earnings: {
      rating: 2.5,
      roa: 1.5,
      roe: 14.0,
      netInterestMargin: 3.8,
      trend: 'stable'
    },
    liquidity: {
      rating: 3.0,
      liquidityRatio: 24.0,
      loanToDepositRatio: 80.0,
      cashRatio: 11.5,
      trend: 'stable'
    },
    sensitivity: {
      rating: 2.8,
      interestRateRisk: 3.0,
      marketRisk: 2.5,
      operationalRisk: 2.8,
      trend: 'stable'
    },
    lastUpdated: '2024-01-15',
    nextReview: '2024-04-15',
    status: 'Current',
    riskLevel: 'Moderate'
  }
]

const camelsCategories = {
  capital: { name: 'Capital Adequacy', weight: 0.20, description: 'Capital strength and adequacy ratios' },
  assetQuality: { name: 'Asset Quality', weight: 0.20, description: 'Loan quality and credit risk management' },
  management: { name: 'Management', weight: 0.15, description: 'Governance and risk management capabilities' },
  earnings: { name: 'Earnings', weight: 0.15, description: 'Profitability and earnings quality' },
  liquidity: { name: 'Liquidity', weight: 0.15, description: 'Liquidity position and funding stability' },
  sensitivity: { name: 'Sensitivity', weight: 0.15, description: 'Interest rate and market risk sensitivity' }
}

export default function CamelsPerformance() {
  const [camelsData, setCamelsData] = useState(mockCamelsData)
  const [selectedBank, setSelectedBank] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [viewType, setViewType] = useState('overview')
  const [showDetails, setShowDetails] = useState(null)

  const getRatingColor = (rating) => {
    if (rating <= 2.0) return 'text-green-600 bg-green-100 border-green-200'
    if (rating <= 3.0) return 'text-yellow-600 bg-yellow-100 border-yellow-200'
    if (rating <= 4.0) return 'text-orange-600 bg-orange-100 border-orange-200'
    return 'text-red-600 bg-red-100 border-red-200'
  }

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-100 border-green-200'
      case 'Moderate': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'High': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return <ArrowUp className="h-3 w-3 text-green-600" />
      case 'declining': return <ArrowDown className="h-3 w-3 text-red-600" />
      case 'stable': return <Minus className="h-3 w-3 text-gray-600" />
      default: return <Minus className="h-3 w-3 text-gray-600" />
    }
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return 'text-green-600'
      case 'declining': return 'text-red-600'
      case 'stable': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const filteredData = camelsData.filter(bank => {
    if (selectedBank !== 'All' && bank.bankCode !== selectedBank) return false
    return true
  })

  const avgOverallRating = camelsData.reduce((sum, bank) => sum + bank.overallRating, 0) / camelsData.length
  const totalBanks = camelsData.length
  const highRiskBanks = camelsData.filter(bank => bank.riskLevel === 'High').length
  const moderateRiskBanks = camelsData.filter(bank => bank.riskLevel === 'Moderate').length
  const lowRiskBanks = camelsData.filter(bank => bank.riskLevel === 'Low').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">CAMELS & Performance</h1>
            <p className="text-sm text-gray-600">Monitor CAMELS ratings and performance metrics for all institutions</p>
          </div>
          <div className="flex gap-2">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1">
              <RefreshCw className="h-3 w-3" />
              Refresh Data
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
              <Shield className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Avg Overall Rating</h3>
              <p className="text-sm font-semibold text-blue-700">{avgOverallRating.toFixed(1)}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 border border-green-300">
              <CheckCircle className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Low Risk Banks</h3>
              <p className="text-sm font-semibold text-green-700">{lowRiskBanks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 border border-yellow-300">
              <AlertCircle className="h-4 w-4 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Moderate Risk</h3>
              <p className="text-sm font-semibold text-yellow-700">{moderateRiskBanks}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 border border-red-300">
              <AlertTriangle className="h-4 w-4 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">High Risk Banks</h3>
              <p className="text-sm font-semibold text-red-700">{highRiskBanks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border border-gray-300 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Banks</option>
              <option value="CBZ">CBZ Bank</option>
              <option value="SCB">Standard Chartered</option>
              <option value="NED">Nedbank</option>
              <option value="ECO">Ecobank</option>
            </select>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Categories</option>
              <option value="capital">Capital Adequacy</option>
              <option value="assetQuality">Asset Quality</option>
              <option value="management">Management</option>
              <option value="earnings">Earnings</option>
              <option value="liquidity">Liquidity</option>
              <option value="sensitivity">Sensitivity</option>
            </select>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewType('overview')}
                className={`px-3 py-2 text-sm font-medium ${
                  viewType === 'overview' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setViewType('detailed')}
                className={`px-3 py-2 text-sm font-medium ${
                  viewType === 'detailed' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Detailed
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CAMELS Overview */}
      {viewType === 'overview' && (
        <div className="bg-white border border-gray-300">
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-md font-semibold text-gray-800">CAMELS Performance Overview</h2>
            <p className="text-sm text-gray-600">Overall ratings and risk levels across institutions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Bank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Overall Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Capital</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Assets</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Management</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Earnings</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Liquidity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Sensitivity</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Risk Level</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((bank) => (
                  <tr key={bank.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-gray-900">{bank.bankName}</p>
                        <p className="text-xs text-gray-500">{bank.bankCode}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getRatingColor(bank.overallRating)} border rounded`}>
                          {bank.overallRating}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(bank.overallRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${getRatingColor(bank.capital.rating).split(' ')[0]}`}>
                          {bank.capital.rating}
                        </span>
                        {getTrendIcon(bank.capital.trend)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${getRatingColor(bank.assetQuality.rating).split(' ')[0]}`}>
                          {bank.assetQuality.rating}
                        </span>
                        {getTrendIcon(bank.assetQuality.trend)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${getRatingColor(bank.management.rating).split(' ')[0]}`}>
                          {bank.management.rating}
                        </span>
                        {getTrendIcon(bank.management.trend)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${getRatingColor(bank.earnings.rating).split(' ')[0]}`}>
                          {bank.earnings.rating}
                        </span>
                        {getTrendIcon(bank.earnings.trend)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${getRatingColor(bank.liquidity.rating).split(' ')[0]}`}>
                          {bank.liquidity.rating}
                        </span>
                        {getTrendIcon(bank.liquidity.trend)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className={`text-sm font-medium ${getRatingColor(bank.sensitivity.rating).split(' ')[0]}`}>
                          {bank.sensitivity.rating}
                        </span>
                        {getTrendIcon(bank.sensitivity.trend)}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getRiskLevelColor(bank.riskLevel)} border rounded`}>
                        {bank.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setShowDetails(showDetails === bank.id ? null : bank.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                          title="View Details"
                        >
                          <Eye className="h-3 w-3" />
                          Details
                        </button>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="Export Data">
                          <Download className="h-3 w-3" />
                          Export
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detailed CAMELS Analysis */}
      {viewType === 'detailed' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* CAMELS Categories Breakdown */}
          <div className="bg-white border border-gray-300 p-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">CAMELS Categories</h3>
            <div className="space-y-4">
              {Object.entries(camelsCategories).map(([key, category]) => (
                <div key={key} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <span className="text-sm text-gray-600">Weight: {category.weight * 100}%</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span>1-2: Strong</span>
                      <span className="text-green-600">✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>3: Satisfactory</span>
                      <span className="text-yellow-600">⚠</span>
                    </div>
                    <div className="flex justify-between">
                      <span>4: Below Standard</span>
                      <span className="text-orange-600">⚠</span>
                    </div>
                    <div className="flex justify-between">
                      <span>5: Critical</span>
                      <span className="text-red-600">✗</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white border border-gray-300 p-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Risk Level Distribution</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-gray-900">Low Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(lowRiskBanks / totalBanks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{lowRiskBanks}</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-gray-900">Moderate Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-600 h-2 rounded-full"
                      style={{ width: `${(moderateRiskBanks / totalBanks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{moderateRiskBanks}</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="font-medium text-gray-900">High Risk</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${(highRiskBanks / totalBanks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{highRiskBanks}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detailed View Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Detailed CAMELS Analysis - {camelsData.find(b => b.id === showDetails)?.bankName}
              </h3>
              <button
                onClick={() => setShowDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {(() => {
              const bank = camelsData.find(b => b.id === showDetails)
              if (!bank) return null
              
              return (
                <div className="space-y-6">
                  {/* Bank Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Overall Rating</h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${getRatingColor(bank.overallRating).split(' ')[0]}`}>
                          {bank.overallRating}
                        </span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(bank.overallRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Level</h4>
                      <span className={`inline-flex items-center px-3 py-1 text-sm font-medium ${getRiskLevelColor(bank.riskLevel)} border rounded`}>
                        {bank.riskLevel}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Last Updated</h4>
                      <p className="text-sm text-gray-900">{bank.lastUpdated}</p>
                      <p className="text-xs text-gray-500">Next Review: {bank.nextReview}</p>
                    </div>
                  </div>

                  {/* CAMELS Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(camelsCategories).map(([key, category]) => {
                      const rating = bank[key].rating
                      const trend = bank[key].trend
                      
                      return (
                        <div key={key} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-gray-900">{category.name}</h4>
                            <div className="flex items-center gap-1">
                              <span className={`text-lg font-bold ${getRatingColor(rating).split(' ')[0]}`}>
                                {rating}
                              </span>
                              {getTrendIcon(trend)}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                          
                          {/* Category-specific metrics */}
                          {key === 'capital' && (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span>Tier 1 Ratio:</span>
                                <span className="font-medium">{bank.capital.tier1Ratio}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Ratio:</span>
                                <span className="font-medium">{bank.capital.totalRatio}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Leverage Ratio:</span>
                                <span className="font-medium">{bank.capital.leverageRatio}%</span>
                              </div>
                            </div>
                          )}
                          
                          {key === 'assetQuality' && (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span>NPL Ratio:</span>
                                <span className="font-medium">{bank.assetQuality.nplRatio}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Coverage Ratio:</span>
                                <span className="font-medium">{bank.assetQuality.coverageRatio}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Provision Ratio:</span>
                                <span className="font-medium">{bank.assetQuality.provisionRatio}%</span>
                              </div>
                            </div>
                          )}
                          
                          {key === 'earnings' && (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span>ROA:</span>
                                <span className="font-medium">{bank.earnings.roa}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>ROE:</span>
                                <span className="font-medium">{bank.earnings.roe}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Net Interest Margin:</span>
                                <span className="font-medium">{bank.earnings.netInterestMargin}%</span>
                              </div>
                            </div>
                          )}
                          
                          {key === 'liquidity' && (
                            <div className="space-y-2 text-xs">
                              <div className="flex justify-between">
                                <span>Liquidity Ratio:</span>
                                <span className="font-medium">{bank.liquidity.liquidityRatio}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Loan/Deposit Ratio:</span>
                                <span className="font-medium">{bank.liquidity.loanToDepositRatio}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Cash Ratio:</span>
                                <span className="font-medium">{bank.liquidity.cashRatio}%</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}