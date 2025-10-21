import React, { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Building2, 
  Users, 
  DollarSign, 
  BarChart3, 
  PieChart, 
  LineChart,
  Calendar,
  Filter,
  Download,
  Eye,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

// Mock data for deposit trends
const mockDepositData = [
  {
    id: 1,
    bankName: 'CBZ Bank Limited',
    bankCode: 'CBZ',
    totalDeposits: 2890400000,
    individualDeposits: 1890400000,
    corporateDeposits: 1000000000,
    insuredDeposits: 2890400000,
    uninsuredDeposits: 0,
    depositGrowth: 12.5,
    individualGrowth: 15.2,
    corporateGrowth: 8.7,
    marketShare: 35.2,
    avgAccountSize: 12500,
    accountCount: 231232,
    lastUpdated: '2024-01-15'
  },
  {
    id: 2,
    bankName: 'Standard Chartered Bank Zimbabwe',
    bankCode: 'SCB',
    totalDeposits: 1250000000,
    individualDeposits: 750000000,
    corporateDeposits: 500000000,
    insuredDeposits: 1250000000,
    uninsuredDeposits: 0,
    depositGrowth: 8.3,
    individualGrowth: 10.1,
    corporateGrowth: 5.8,
    marketShare: 15.2,
    avgAccountSize: 18750,
    accountCount: 66667,
    lastUpdated: '2024-01-15'
  },
  {
    id: 3,
    bankName: 'Nedbank Zimbabwe',
    bankCode: 'NED',
    totalDeposits: 890000000,
    individualDeposits: 534000000,
    corporateDeposits: 356000000,
    insuredDeposits: 890000000,
    uninsuredDeposits: 0,
    depositGrowth: -2.1,
    individualGrowth: 1.2,
    corporateGrowth: -7.8,
    marketShare: 10.8,
    avgAccountSize: 8900,
    accountCount: 100000,
    lastUpdated: '2024-01-15'
  },
  {
    id: 4,
    bankName: 'Ecobank Zimbabwe',
    bankCode: 'ECO',
    totalDeposits: 650000000,
    individualDeposits: 455000000,
    corporateDeposits: 195000000,
    insuredDeposits: 650000000,
    uninsuredDeposits: 0,
    depositGrowth: 5.7,
    individualGrowth: 8.9,
    corporateGrowth: -1.2,
    marketShare: 7.9,
    avgAccountSize: 6500,
    accountCount: 100000,
    lastUpdated: '2024-01-15'
  }
]

const monthlyTrends = [
  { month: 'Jan 2023', total: 7200000000, individual: 4320000000, corporate: 2880000000 },
  { month: 'Feb 2023', total: 7350000000, individual: 4410000000, corporate: 2940000000 },
  { month: 'Mar 2023', total: 7500000000, individual: 4500000000, corporate: 3000000000 },
  { month: 'Apr 2023', total: 7650000000, individual: 4590000000, corporate: 3060000000 },
  { month: 'May 2023', total: 7800000000, individual: 4680000000, corporate: 3120000000 },
  { month: 'Jun 2023', total: 7950000000, individual: 4770000000, corporate: 3180000000 },
  { month: 'Jul 2023', total: 8100000000, individual: 4860000000, corporate: 3240000000 },
  { month: 'Aug 2023', total: 8250000000, individual: 4950000000, corporate: 3300000000 },
  { month: 'Sep 2023', total: 8400000000, individual: 5040000000, corporate: 3360000000 },
  { month: 'Oct 2023', total: 8550000000, individual: 5130000000, corporate: 3420000000 },
  { month: 'Nov 2023', total: 8700000000, individual: 5220000000, corporate: 3480000000 },
  { month: 'Dec 2023', total: 8850000000, individual: 5310000000, corporate: 3540000000 },
  { month: 'Jan 2024', total: 9000000000, individual: 5400000000, corporate: 3600000000 }
]

export default function DepositTrends() {
  const [depositData, setDepositData] = useState(mockDepositData)
  const [selectedPeriod, setSelectedPeriod] = useState('12M')
  const [selectedBank, setSelectedBank] = useState('All')
  const [viewType, setViewType] = useState('table')

  const getGrowthColor = (growth) => {
    if (growth > 5) return 'text-green-600'
    if (growth > 0) return 'text-blue-600'
    if (growth > -5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getGrowthIcon = (growth) => {
    if (growth > 0) return <ArrowUp className="h-3 w-3" />
    if (growth < 0) return <ArrowDown className="h-3 w-3" />
    return <Minus className="h-3 w-3" />
  }

  const getGrowthBgColor = (growth) => {
    if (growth > 5) return 'bg-green-100 border-green-200'
    if (growth > 0) return 'bg-blue-100 border-blue-200'
    if (growth > -5) return 'bg-yellow-100 border-yellow-200'
    return 'bg-red-100 border-red-200'
  }

  const totalMarketDeposits = depositData.reduce((sum, bank) => sum + bank.totalDeposits, 0)
  const totalIndividualDeposits = depositData.reduce((sum, bank) => sum + bank.individualDeposits, 0)
  const totalCorporateDeposits = depositData.reduce((sum, bank) => sum + bank.corporateDeposits, 0)
  const avgGrowth = depositData.reduce((sum, bank) => sum + bank.depositGrowth, 0) / depositData.length

  const filteredData = selectedBank === 'All' 
    ? depositData 
    : depositData.filter(bank => bank.bankCode === selectedBank)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Deposit Trends</h1>
            <p className="text-sm text-gray-600">Graphs deposit volumes (corporate vs. individual) per institution</p>
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
              <h3 className="text-xs font-medium text-gray-600">Total Market Deposits</h3>
              <p className="text-sm font-semibold text-blue-700">${totalMarketDeposits.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 border border-green-300">
              <Users className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Individual Deposits</h3>
              <p className="text-sm font-semibold text-green-700">${totalIndividualDeposits.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 border border-orange-300">
              <Building2 className="h-4 w-4 text-orange-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Corporate Deposits</h3>
              <p className="text-sm font-semibold text-orange-700">${totalCorporateDeposits.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 border border-purple-300">
              <TrendingUp className="h-4 w-4 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Average Growth</h3>
              <p className="text-sm font-semibold text-purple-700">{avgGrowth.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border border-gray-300 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="3M">Last 3 Months</option>
              <option value="6M">Last 6 Months</option>
              <option value="12M">Last 12 Months</option>
              <option value="24M">Last 24 Months</option>
            </select>
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

      {/* Deposit Trends Table */}
      {viewType === 'table' && (
        <div className="bg-white border border-gray-300">
          <div className="p-6 border-b border-gray-300">
            <h2 className="text-md font-semibold text-gray-800">Bank Deposit Analysis</h2>
            <p className="text-sm text-gray-600">Individual vs corporate deposit breakdown by institution</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Bank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Total Deposits</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Individual</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Corporate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Growth</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Market Share</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Avg Account Size</th>
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
                      <p className="font-semibold text-gray-900">${bank.totalDeposits.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-green-600">${bank.individualDeposits.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{((bank.individualDeposits / bank.totalDeposits) * 100).toFixed(1)}%</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-semibold text-orange-600">${bank.corporateDeposits.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{((bank.corporateDeposits / bank.totalDeposits) * 100).toFixed(1)}%</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {getGrowthIcon(bank.depositGrowth)}
                        <span className={`font-semibold ${getGrowthColor(bank.depositGrowth)}`}>
                          {bank.depositGrowth > 0 ? '+' : ''}{bank.depositGrowth}%
                        </span>
                      </div>
                      <div className="flex gap-2 mt-1">
                        <span className={`text-xs px-1 py-0.5 rounded ${getGrowthBgColor(bank.individualGrowth)}`}>
                          Ind: {bank.individualGrowth > 0 ? '+' : ''}{bank.individualGrowth}%
                        </span>
                        <span className={`text-xs px-1 py-0.5 rounded ${getGrowthBgColor(bank.corporateGrowth)}`}>
                          Corp: {bank.corporateGrowth > 0 ? '+' : ''}{bank.corporateGrowth}%
                        </span>
                      </div>
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
                      <p className="font-semibold text-gray-900">${bank.avgAccountSize.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">{bank.accountCount.toLocaleString()} accounts</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="View Details">
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

      {/* Chart View */}
      {viewType === 'chart' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Market Share Pie Chart */}
          <div className="bg-white border border-gray-300 p-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Market Share Distribution</h3>
            <div className="space-y-3">
              {depositData.map((bank, index) => {
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

          {/* Growth Trends */}
          <div className="bg-white border border-gray-300 p-6">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Deposit Growth Trends</h3>
            <div className="space-y-4">
              {depositData.map((bank) => (
                <div key={bank.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">{bank.bankName}</p>
                    <p className="text-xs text-gray-500">Total Growth: {bank.depositGrowth > 0 ? '+' : ''}{bank.depositGrowth}%</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {getGrowthIcon(bank.depositGrowth)}
                    <span className={`font-semibold ${getGrowthColor(bank.depositGrowth)}`}>
                      {bank.depositGrowth > 0 ? '+' : ''}{bank.depositGrowth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Trends */}
          <div className="bg-white border border-gray-300 p-6 lg:col-span-2">
            <h3 className="text-md font-semibold text-gray-800 mb-4">Monthly Deposit Trends</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Month</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Total</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Individual</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Corporate</th>
                    <th className="px-3 py-2 text-left text-xs font-medium text-gray-700">Growth</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {monthlyTrends.slice(-6).map((trend, index) => {
                    const prevTrend = index > 0 ? monthlyTrends[monthlyTrends.length - 6 + index - 1] : null
                    const growth = prevTrend ? ((trend.total - prevTrend.total) / prevTrend.total * 100) : 0
                    
                    return (
                      <tr key={trend.month}>
                        <td className="px-3 py-2 text-gray-900">{trend.month}</td>
                        <td className="px-3 py-2 font-semibold text-gray-900">${trend.total.toLocaleString()}</td>
                        <td className="px-3 py-2 text-green-600">${trend.individual.toLocaleString()}</td>
                        <td className="px-3 py-2 text-orange-600">${trend.corporate.toLocaleString()}</td>
                        <td className="px-3 py-2">
                          <div className="flex items-center gap-1">
                            {getGrowthIcon(growth)}
                            <span className={getGrowthColor(growth)}>
                              {growth > 0 ? '+' : ''}{growth.toFixed(1)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
