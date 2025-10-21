import React, { useState } from 'react'
import {
  AlertTriangle,
  Building2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Shield,
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
  Minus
} from 'lucide-react'

// Mock data for exposure analysis
const mockExposureData = [
  {
    id: 1,
    bankName: 'CBZ Bank Limited',
    bankCode: 'CBZ',
    totalExposure: 4500000000,
    sectorExposures: {
      agriculture: 1200000000,
      mining: 800000000,
      manufacturing: 900000000,
      retail: 600000000,
      services: 1000000000
    },
    concentrationRisk: 'High',
    largestExposure: 450000000,
    exposureLimit: 500000000,
    utilizationRate: 90.0,
    riskRating: 'Moderate',
    lastUpdated: '2024-01-15',
    breaches: 2,
    warnings: 1
  },
  {
    id: 2,
    bankName: 'Standard Chartered Bank',
    bankCode: 'SCB',
    totalExposure: 3200000000,
    sectorExposures: {
      agriculture: 400000000,
      mining: 1200000000,
      manufacturing: 600000000,
      retail: 500000000,
      services: 500000000
    },
    concentrationRisk: 'Moderate',
    largestExposure: 320000000,
    exposureLimit: 400000000,
    utilizationRate: 80.0,
    riskRating: 'Low',
    lastUpdated: '2024-01-15',
    breaches: 0,
    warnings: 0
  },
  {
    id: 3,
    bankName: 'Nedbank Zimbabwe',
    bankCode: 'NED',
    totalExposure: 2800000000,
    sectorExposures: {
      agriculture: 600000000,
      mining: 500000000,
      manufacturing: 800000000,
      retail: 400000000,
      services: 500000000
    },
    concentrationRisk: 'Low',
    largestExposure: 280000000,
    exposureLimit: 350000000,
    utilizationRate: 80.0,
    riskRating: 'Low',
    lastUpdated: '2024-01-15',
    breaches: 0,
    warnings: 0
  },
  {
    id: 4,
    bankName: 'Ecobank Zimbabwe',
    bankCode: 'ECO',
    totalExposure: 2100000000,
    sectorExposures: {
      agriculture: 500000000,
      mining: 400000000,
      manufacturing: 500000000,
      retail: 400000000,
      services: 400000000
    },
    concentrationRisk: 'Moderate',
    largestExposure: 210000000,
    exposureLimit: 300000000,
    utilizationRate: 70.0,
    riskRating: 'Moderate',
    lastUpdated: '2024-01-15',
    breaches: 1,
    warnings: 2
  }
]

const sectorLimits = {
  agriculture: 25.0,
  mining: 30.0,
  manufacturing: 20.0,
  retail: 15.0,
  services: 20.0
}

export default function ExposureAnalysis() {
  const [exposureData, setExposureData] = useState(mockExposureData)
  const [selectedBank, setSelectedBank] = useState('All')
  const [selectedSector, setSelectedSector] = useState('All')
  const [viewType, setViewType] = useState('overview')
  const [showDetails, setShowDetails] = useState(null)

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200'
      case 'Moderate': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'Low': return 'text-green-600 bg-green-100 border-green-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getUtilizationColor = (rate) => {
    if (rate >= 90) return 'text-red-600'
    if (rate >= 80) return 'text-yellow-600'
    return 'text-green-600'
  }

  const getSectorIcon = (sector) => {
    switch (sector) {
      case 'agriculture': return '🌾'
      case 'mining': return '⛏️'
      case 'manufacturing': return '🏭'
      case 'retail': return '🛒'
      case 'services': return '💼'
      default: return '📊'
    }
  }

  const filteredData = exposureData.filter(bank => {
    if (selectedBank !== 'All' && bank.bankCode !== selectedBank) return false
    return true
  })

  const totalExposure = exposureData.reduce((sum, bank) => sum + bank.totalExposure, 0)
  const totalBreaches = exposureData.reduce((sum, bank) => sum + bank.breaches, 0)
  const totalWarnings = exposureData.reduce((sum, bank) => sum + bank.warnings, 0)
  const avgUtilization = exposureData.reduce((sum, bank) => sum + bank.utilizationRate, 0) / exposureData.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Exposure Analysis</h1>
            <p className="text-sm text-gray-600">Analyze risk exposures and concentration limits across institutions</p>
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
              <DollarSign className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Exposure</h3>
              <p className="text-sm font-semibold text-blue-700">${totalExposure.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 border border-red-300">
              <AlertTriangle className="h-4 w-4 text-red-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Limit Breaches</h3>
              <p className="text-sm font-semibold text-red-700">{totalBreaches}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-yellow-100 border border-yellow-300">
              <AlertCircle className="h-4 w-4 text-yellow-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Warnings</h3>
              <p className="text-sm font-semibold text-yellow-700">{totalWarnings}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 border border-green-300">
              <Target className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Avg Utilization</h3>
              <p className="text-sm font-semibold text-green-700">{avgUtilization.toFixed(1)}%</p>
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
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="All">All Sectors</option>
              <option value="agriculture">Agriculture</option>
              <option value="mining">Mining</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="retail">Retail</option>
              <option value="services">Services</option>
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
                onClick={() => setViewType('sector')}
                className={`px-3 py-2 text-sm font-medium ${
                  viewType === 'sector' ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Sector Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Exposure Overview */}
      {viewType === 'overview' && (
        <div className="bg-white border border-gray-300">
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-md font-semibold text-gray-800">Institution Exposure Analysis</h2>
            <p className="text-sm text-gray-600">Risk exposure limits and concentration analysis by institution</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Bank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Total Exposure</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Largest Exposure</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Utilization</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Concentration Risk</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Risk Rating</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Breaches</th>
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
                      <p className="font-semibold text-gray-900">${bank.totalExposure.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-gray-900">${bank.largestExposure.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">Limit: ${bank.exposureLimit.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              bank.utilizationRate >= 90 ? 'bg-red-500' :
                              bank.utilizationRate >= 80 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${bank.utilizationRate}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getUtilizationColor(bank.utilizationRate)}`}>
                          {bank.utilizationRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getRiskColor(bank.concentrationRisk)} border rounded`}>
                        {bank.concentrationRisk}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getRiskColor(bank.riskRating)} border rounded`}>
                        {bank.riskRating}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {bank.breaches > 0 && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 rounded">
                            {bank.breaches} Breaches
                          </span>
                        )}
                        {bank.warnings > 0 && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 rounded">
                            {bank.warnings} Warnings
                          </span>
                        )}
                        {bank.breaches === 0 && bank.warnings === 0 && (
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 border border-green-200 rounded">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Compliant
                          </span>
                        )}
                      </div>
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

      {/* Sector Analysis */}
      {viewType === 'sector' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sector Exposure Limits */}
          <div className="bg-white border border-gray-300 p-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Sector Exposure Limits</h3>
            <div className="space-y-3">
              {Object.entries(sectorLimits).map(([sector, limit]) => (
                <div key={sector} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getSectorIcon(sector)}</span>
                    <span className="text-sm font-medium text-gray-900 capitalize">{sector}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(limit / 30) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{limit}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Exposure Distribution */}
          <div className="bg-white border border-gray-300 p-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Sector Exposure Distribution</h3>
            <div className="space-y-3">
              {Object.entries(exposureData[0]?.sectorExposures || {}).map(([sector, amount]) => {
                const percentage = (amount / exposureData[0]?.totalExposure) * 100
                return (
                  <div key={sector} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getSectorIcon(sector)}</span>
                      <span className="text-sm font-medium text-gray-900 capitalize">{sector}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                )
              })}
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
                Detailed Exposure Analysis - {exposureData.find(b => b.id === showDetails)?.bankName}
              </h3>
              <button
                onClick={() => setShowDetails(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {(() => {
              const bank = exposureData.find(b => b.id === showDetails)
              if (!bank) return null
              
              return (
                <div className="space-y-6">
                  {/* Bank Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Total Exposure</h4>
                      <p className="text-lg font-semibold text-gray-900">${bank.totalExposure.toLocaleString()}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Utilization Rate</h4>
                      <p className={`text-lg font-semibold ${getUtilizationColor(bank.utilizationRate)}`}>
                        {bank.utilizationRate}%
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Risk Rating</h4>
                      <span className={`inline-flex items-center px-2 py-1 text-sm font-medium ${getRiskColor(bank.riskRating)} border rounded`}>
                        {bank.riskRating}
                      </span>
                    </div>
                  </div>

                  {/* Sector Breakdown */}
                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-4">Sector Exposure Breakdown</h4>
                    <div className="space-y-3">
                      {Object.entries(bank.sectorExposures).map(([sector, amount]) => {
                        const percentage = (amount / bank.totalExposure) * 100
                        const limit = sectorLimits[sector]
                        const isOverLimit = percentage > limit
                        
                        return (
                          <div key={sector} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{getSectorIcon(sector)}</span>
                              <div>
                                <p className="font-medium text-gray-900 capitalize">{sector}</p>
                                <p className="text-sm text-gray-600">Limit: {limit}%</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">${amount.toLocaleString()}</p>
                                <p className={`text-sm ${isOverLimit ? 'text-red-600' : 'text-gray-600'}`}>
                                  {percentage.toFixed(1)}%
                                </p>
                              </div>
                              {isOverLimit && (
                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 border border-red-200 rounded">
                                  <AlertTriangle className="h-3 w-3 mr-1" />
                                  Over Limit
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
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