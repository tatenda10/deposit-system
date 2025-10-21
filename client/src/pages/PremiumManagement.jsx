import { DollarSign, Calculator, TrendingUp, AlertCircle, CheckCircle, Clock, FileText } from 'lucide-react'

const samplePremiumData = [
  {
    bankName: "CBZ Bank Limited",
    currentPremium: 0.15,
    calculatedPremium: 0.18,
    riskAdjustment: 0.03,
    baseRate: 0.15,
    totalDeposits: 2000000000,
    premiumAmount: 3000000,
    status: "Pending Review",
    lastUpdated: "2024-01-15"
  },
  {
    bankName: "Standard Chartered Bank Zimbabwe",
    currentPremium: 0.12,
    calculatedPremium: 0.10,
    riskAdjustment: -0.02,
    baseRate: 0.12,
    totalDeposits: 1500000000,
    premiumAmount: 1500000,
    status: "Approved",
    lastUpdated: "2024-01-10"
  },
  {
    bankName: "FBC Bank Limited",
    currentPremium: 0.20,
    calculatedPremium: 0.25,
    riskAdjustment: 0.05,
    baseRate: 0.20,
    totalDeposits: 1000000000,
    premiumAmount: 2500000,
    status: "Under Review",
    lastUpdated: "2024-01-12"
  }
]

export default function PremiumManagement() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800'
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800'
      case 'Under Review': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-4 h-4" />
      case 'Pending Review': return <Clock className="w-4 h-4" />
      case 'Under Review': return <AlertCircle className="w-4 h-4" />
      default: return <FileText className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Premium Management</h1>
        <p className="text-gray-600">Calculate and manage deposit insurance premiums</p>
      </div>

      {/* Premium Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Premiums</p>
              <p className="text-2xl font-bold text-gray-900">$7.0M</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-yellow-600">
                {samplePremiumData.filter(p => p.status === 'Pending Review').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Premium Rate</p>
              <p className="text-2xl font-bold text-blue-600">0.16%</p>
            </div>
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Risk Adjustments</p>
              <p className="text-2xl font-bold text-purple-600">+0.02%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Premium Calculation Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Premium Calculations
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calculated Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Adjustment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Deposits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Premium Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {samplePremiumData.map((premium, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{premium.bankName}</p>
                      <p className="text-xs text-gray-500">Updated: {premium.lastUpdated}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{(premium.currentPremium * 100).toFixed(2)}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${premium.currentPremium * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{(premium.calculatedPremium * 100).toFixed(2)}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            premium.calculatedPremium > premium.currentPremium ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${premium.calculatedPremium * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${
                        premium.riskAdjustment > 0 ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {premium.riskAdjustment > 0 ? '+' : ''}{(premium.riskAdjustment * 100).toFixed(2)}%
                      </span>
                      {premium.riskAdjustment > 0 ? (
                        <TrendingUp className="w-4 h-4 text-red-500" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">${(premium.totalDeposits / 1000000000).toFixed(1)}B</p>
                    <p className="text-xs text-gray-500">Total Deposits</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">${(premium.premiumAmount / 1000000).toFixed(1)}M</p>
                    <p className="text-xs text-gray-500">Annual Premium</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(premium.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(premium.status)}`}>
                        {premium.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Calculate</button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Review</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Premium Calculation Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Premium Calculator
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Base Premium Rate</label>
                <input 
                  type="number" 
                  step="0.01" 
                  defaultValue="0.15" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Risk Adjustment Factor</label>
                <input 
                  type="number" 
                  step="0.01" 
                  defaultValue="0.03" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Deposits (USD)</label>
                <input 
                  type="number" 
                  defaultValue="1000000000" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Calculate Premium
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Premium Trends
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {samplePremiumData.map((premium, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{premium.bankName}</p>
                    <p className="text-sm text-gray-600">
                      Rate Change: {premium.riskAdjustment > 0 ? '+' : ''}{(premium.riskAdjustment * 100).toFixed(2)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      premium.riskAdjustment > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {premium.riskAdjustment > 0 ? "Increase" : "Decrease"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
