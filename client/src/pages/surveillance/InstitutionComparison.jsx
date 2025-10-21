import React, { useState } from 'react'
import {
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
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
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus,
  Star,
  Award,
  Activity,
  Zap,
  Shield,
  AlertTriangle,
  X,
  Plus,
  Settings
} from 'lucide-react'

// Mock data for institution comparison
const mockComparisonData = [
  {
    id: 1,
    bankName: 'CBZ Bank Limited',
    bankCode: 'CBZ',
    totalAssets: 4500000000,
    totalDeposits: 2890400000,
    totalLoans: 3200000000,
    netIncome: 85000000,
    roa: 1.89,
    roe: 18.9,
    nplRatio: 3.2,
    capitalRatio: 15.2,
    liquidityRatio: 25.8,
    marketShare: 35.2,
    customerCount: 231232,
    branchCount: 45,
    atmCount: 120,
    digitalCustomers: 180000,
    riskRating: 'Moderate',
    camelsRating: 2.8,
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    bankName: 'Standard Chartered Bank',
    bankCode: 'SCB',
    totalAssets: 3200000000,
    totalDeposits: 2100000000,
    totalLoans: 2500000000,
    netIncome: 72000000,
    roa: 2.25,
    roe: 22.5,
    nplRatio: 2.1,
    capitalRatio: 18.5,
    liquidityRatio: 28.5,
    marketShare: 25.0,
    customerCount: 180000,
    branchCount: 25,
    atmCount: 80,
    digitalCustomers: 150000,
    riskRating: 'Low',
    camelsRating: 2.2,
    lastUpdated: '2024-01-15'
  },
  {
    id: 3,
    bankName: 'Nedbank Zimbabwe',
    bankCode: 'NED',
    totalAssets: 2800000000,
    totalDeposits: 1900000000,
    totalLoans: 2200000000,
    netIncome: 45000000,
    roa: 1.61,
    roe: 16.1,
    nplRatio: 4.5,
    capitalRatio: 13.2,
    liquidityRatio: 22.5,
    marketShare: 22.0,
    customerCount: 150000,
    branchCount: 30,
    atmCount: 60,
    digitalCustomers: 120000,
    riskRating: 'High',
    camelsRating: 3.2,
    lastUpdated: '2024-01-15'
  },
  {
    id: 4,
    bankName: 'Ecobank Zimbabwe',
    bankCode: 'ECO',
    totalAssets: 2100000000,
    totalDeposits: 1400000000,
    totalLoans: 1600000000,
    netIncome: 35000000,
    roa: 1.67,
    roe: 16.7,
    nplRatio: 3.8,
    capitalRatio: 14.0,
    liquidityRatio: 24.0,
    marketShare: 17.8,
    customerCount: 120000,
    branchCount: 20,
    atmCount: 40,
    digitalCustomers: 95000,
    riskRating: 'Moderate',
    camelsRating: 2.8,
    lastUpdated: '2024-01-15'
  }
]

const comparisonMetrics = {
  financial: {
    name: 'Financial Performance',
    metrics: ['totalAssets', 'totalDeposits', 'totalLoans', 'netIncome', 'roa', 'roe'],
    labels: {
      totalAssets: 'Total Assets',
      totalDeposits: 'Total Deposits',
      totalLoans: 'Total Loans',
      netIncome: 'Net Income',
      roa: 'ROA (%)',
      roe: 'ROE (%)'
    }
  },
  risk: {
    name: 'Risk Metrics',
    metrics: ['nplRatio', 'capitalRatio', 'liquidityRatio', 'riskRating', 'camelsRating'],
    labels: {
      nplRatio: 'NPL Ratio (%)',
      capitalRatio: 'Capital Ratio (%)',
      liquidityRatio: 'Liquidity Ratio (%)',
      riskRating: 'Risk Rating',
      camelsRating: 'CAMELS Rating'
    }
  },
  market: {
    name: 'Market Position',
    metrics: ['marketShare', 'customerCount', 'branchCount', 'atmCount', 'digitalCustomers'],
    labels: {
      marketShare: 'Market Share (%)',
      customerCount: 'Customer Count',
      branchCount: 'Branch Count',
      atmCount: 'ATM Count',
      digitalCustomers: 'Digital Customers'
    }
  }
}

export default function InstitutionComparison() {
  const [comparisonData, setComparisonData] = useState(mockComparisonData)
  const [selectedBanks, setSelectedBanks] = useState(['CBZ', 'SCB'])
  const [selectedCategory, setSelectedCategory] = useState('financial')
  const [viewType, setViewType] = useState('table')
  const [showDetails, setShowDetails] = useState(null)

  const getRiskColor = (rating) => {
    switch (rating) {
      case 'Low': return 'text-green-600 bg-green-100 border-green-200'
      case 'Moderate': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'High': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getRatingColor = (rating) => {
    if (rating <= 2.0) return 'text-green-600'
    if (rating <= 3.0) return 'text-yellow-600'
    if (rating <= 4.0) return 'text-orange-600'
    return 'text-red-600'
  }

  const formatValue = (value, metric) => {
    if (typeof value === 'number') {
      if (metric.includes('Ratio') || metric.includes('roa') || metric.includes('roe') || metric.includes('Share')) {
        return `${value.toFixed(1)}%`
      }
      if (metric.includes('Count') || metric.includes('Count')) {
        return value.toLocaleString()
      }
      if (metric.includes('Assets') || metric.includes('Deposits') || metric.includes('Loans') || metric.includes('Income')) {
        return `$${value.toLocaleString()}`
      }
      return value.toLocaleString()
    }
    return value
  }

  const getBestPerformer = (metric) => {
    const filteredData = comparisonData.filter(bank => selectedBanks.includes(bank.bankCode))
    if (filteredData.length === 0) return null
    
    let best = filteredData[0]
    for (let bank of filteredData) {
      if (metric === 'nplRatio' || metric === 'camelsRating') {
        // Lower is better
        if (bank[metric] < best[metric]) best = bank
      } else {
        // Higher is better
        if (bank[metric] > best[metric]) best = bank
      }
    }
    return best
  }

  const filteredData = comparisonData.filter(bank => selectedBanks.includes(bank.bankCode))

  const totalAssets = filteredData.reduce((sum, bank) => sum + bank.totalAssets, 0)
  const totalDeposits = filteredData.reduce((sum, bank) => sum + bank.totalDeposits, 0)
  const totalLoans = filteredData.reduce((sum, bank) => sum + bank.totalLoans, 0)
  const totalIncome = filteredData.reduce((sum, bank) => sum + bank.netIncome, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Institution Comparison</h1>
            <p className="text-sm text-gray-600">Compare performance metrics and risk profiles across institutions</p>
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
              <Building2 className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Assets</h3>
              <p className="text-sm font-semibold text-blue-700">${totalAssets.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 border border-green-300">
              <DollarSign className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Deposits</h3>
              <p className="text-sm font-semibold text-green-700">${totalDeposits.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 border border-orange-300">
              <CreditCard className="h-4 w-4 text-orange-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Loans</h3>
              <p className="text-sm font-semibold text-orange-700">${totalLoans.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 border border-purple-300">
              <TrendingUp className="h-4 w-4 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Income</h3>
              <p className="text-sm font-semibold text-purple-700">${totalIncome.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border border-gray-300 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <div className="flex flex-wrap gap-2">
              {comparisonData.map((bank) => (
                <label key={bank.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedBanks.includes(bank.bankCode)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBanks([...selectedBanks, bank.bankCode])
                      } else {
                        setSelectedBanks(selectedBanks.filter(code => code !== bank.bankCode))
                      }
                    }}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{bank.bankName}</span>
                </label>
              ))}
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="financial">Financial Performance</option>
              <option value="risk">Risk Metrics</option>
              <option value="market">Market Position</option>
            </select>
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewType('table')}
                className={`px-3 py-2 text-sm font-medium ${
                  viewType === 'table' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Table
              </button>
              <button
                onClick={() => setViewType('chart')}
                className={`px-3 py-2 text-sm font-medium ${
                  viewType === 'chart' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Charts
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      {viewType === 'table' && (
        <div className="bg-white border border-gray-300">
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-md font-semibold text-gray-800">
              {comparisonMetrics[selectedCategory].name} Comparison
            </h2>
            <p className="text-sm text-gray-600">Side-by-side comparison of selected institutions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Metric</th>
                  {filteredData.map((bank) => (
                    <th key={bank.id} className="px-4 py-3 text-left text-xs font-medium text-gray-700">
                      {bank.bankName}
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Best Performer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {comparisonMetrics[selectedCategory].metrics.map((metric) => {
                  const bestPerformer = getBestPerformer(metric)
                  return (
                    <tr key={metric} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {comparisonMetrics[selectedCategory].labels[metric]}
                      </td>
                      {filteredData.map((bank) => {
                        const isBest = bestPerformer && bestPerformer.id === bank.id
                        return (
                          <td key={bank.id} className="px-4 py-3">
                            <div className={`flex items-center gap-2 ${isBest ? 'bg-green-50' : ''}`}>
                              <span className={`font-semibold ${isBest ? 'text-green-700' : 'text-gray-900'}`}>
                                {formatValue(bank[metric], metric)}
                              </span>
                              {isBest && <Award className="h-3 w-3 text-green-600" />}
                            </div>
                          </td>
                        )
                      })}
                      <td className="px-4 py-3">
                        {bestPerformer && (
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-green-700">
                              {bestPerformer.bankName}
                            </span>
                            <Award className="h-3 w-3 text-green-600" />
                          </div>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chart View */}
      {viewType === 'chart' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Share Distribution */}
          <div className="bg-white border border-gray-300 p-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Market Share Distribution</h3>
            <div className="space-y-3">
              {filteredData.map((bank, index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-orange-500', 'bg-purple-500']
                return (
                  <div key={bank.id} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${colors[index]}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-gray-900">{bank.bankName}</span>
                        <span className="text-gray-600">{bank.marketShare}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${colors[index]}`}
                          style={{ width: `${bank.marketShare}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white border border-gray-300 p-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Key Performance Metrics</h3>
            <div className="space-y-4">
              {['roa', 'roe', 'nplRatio', 'capitalRatio'].map((metric) => {
                const bestPerformer = getBestPerformer(metric)
                return (
                  <div key={metric} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {comparisonMetrics.financial.labels[metric] || comparisonMetrics.risk.labels[metric]}
                      </span>
                      {bestPerformer && (
                        <div className="flex items-center gap-1">
                          <Award className="h-3 w-3 text-green-600" />
                          <span className="text-xs text-green-600">{bestPerformer.bankName}</span>
                        </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      {filteredData.map((bank) => {
                        const isBest = bestPerformer && bestPerformer.id === bank.id
                        return (
                          <div key={bank.id} className="flex items-center justify-between">
                            <span className="text-xs text-gray-600">{bank.bankName}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-1.5">
                                <div
                                  className={`h-1.5 rounded-full ${isBest ? 'bg-green-500' : 'bg-blue-500'}`}
                                  style={{ width: `${Math.min((bank[metric] / Math.max(...filteredData.map(b => b[metric]))) * 100, 100)}%` }}
                                ></div>
                              </div>
                              <span className={`text-xs font-medium ${isBest ? 'text-green-700' : 'text-gray-900'}`}>
                                {formatValue(bank[metric], metric)}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Risk Comparison */}
          <div className="bg-white border border-gray-300 p-6 lg:col-span-2">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Risk Profile Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredData.map((bank) => (
                <div key={bank.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">{bank.bankName}</h4>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getRiskColor(bank.riskRating)} border rounded`}>
                      {bank.riskRating}
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>CAMELS Rating:</span>
                      <span className={`font-medium ${getRatingColor(bank.camelsRating)}`}>
                        {bank.camelsRating}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>NPL Ratio:</span>
                      <span className="font-medium">{bank.nplRatio}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Capital Ratio:</span>
                      <span className="font-medium">{bank.capitalRatio}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Liquidity Ratio:</span>
                      <span className="font-medium">{bank.liquidityRatio}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detailed View Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Detailed Comparison - {comparisonData.find(b => b.id === showDetails)?.bankName}
              </h3>
              <button
                onClick={() => setShowDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {(() => {
              const bank = comparisonData.find(b => b.id === showDetails)
              if (!bank) return null
              
              return (
                <div className="space-y-6">
                  {/* Bank Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Total Assets</h4>
                      <p className="text-lg font-semibold text-gray-900">${bank.totalAssets.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Market Share</h4>
                      <p className="text-lg font-semibold text-gray-900">{bank.marketShare}%</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Rating</h4>
                      <span className={`inline-flex items-center px-2 py-1 text-sm font-medium ${getRiskColor(bank.riskRating)} border rounded`}>
                        {bank.riskRating}
                      </span>
                    </div>
                  </div>

                  {/* Detailed Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-md font-semibold text-gray-800 mb-4">Financial Performance</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">ROA:</span>
                          <span className="text-sm font-medium text-gray-900">{bank.roa}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">ROE:</span>
                          <span className="text-sm font-medium text-gray-900">{bank.roe}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Net Income:</span>
                          <span className="text-sm font-medium text-gray-900">${bank.netIncome.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-md font-semibold text-gray-800 mb-4">Risk Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">NPL Ratio:</span>
                          <span className="text-sm font-medium text-gray-900">{bank.nplRatio}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Capital Ratio:</span>
                          <span className="text-sm font-medium text-gray-900">{bank.capitalRatio}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Liquidity Ratio:</span>
                          <span className="text-sm font-medium text-gray-900">{bank.liquidityRatio}%</span>
                        </div>
                      </div>
                    </div>
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