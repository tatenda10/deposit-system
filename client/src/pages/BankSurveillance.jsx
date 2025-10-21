import { Building2, AlertTriangle, Shield, DollarSign, TrendingUp, TrendingDown, Activity } from 'lucide-react'

const sampleBanks = [
  { id: 1, name: "CBZ Bank Limited", code: "CBZ", status: "Active", camelsRating: "2", totalDeposits: 2500000000, insuredDeposits: 2000000000, riskScore: 0.15, complianceScore: 95, lastSubmission: "2024-01-15" },
  { id: 2, name: "Standard Chartered Bank Zimbabwe", code: "SCB", status: "Active", camelsRating: "1", totalDeposits: 1800000000, insuredDeposits: 1500000000, riskScore: 0.08, complianceScore: 98, lastSubmission: "2024-01-14" },
  { id: 3, name: "FBC Bank Limited", code: "FBC", status: "Active", camelsRating: "3", totalDeposits: 1200000000, insuredDeposits: 1000000000, riskScore: 0.25, complianceScore: 92, lastSubmission: "2024-01-16" },
  { id: 4, name: "NMB Bank Limited", code: "NMB", status: "Active", camelsRating: "2", totalDeposits: 800000000, insuredDeposits: 700000000, riskScore: 0.18, complianceScore: 94, lastSubmission: "2024-01-13" },
  { id: 5, name: "Zimbabwe Building Society", code: "ZBS", status: "Active", camelsRating: "4", totalDeposits: 600000000, insuredDeposits: 500000000, riskScore: 0.35, complianceScore: 88, lastSubmission: "2024-01-12" }
]

const sampleDepositTrends = [
  { month: "Jul", individual: 1200000000, corporate: 800000000 },
  { month: "Aug", individual: 1250000000, corporate: 850000000 },
  { month: "Sep", individual: 1300000000, corporate: 900000000 },
  { month: "Oct", individual: 1350000000, corporate: 950000000 },
  { month: "Nov", individual: 1400000000, corporate: 1000000000 },
  { month: "Dec", individual: 1500000000, corporate: 1000000000 }
]

export default function BankSurveillance() {
  const getCamelsColor = (rating) => {
    switch (rating) {
      case '1': return 'bg-green-100 text-green-800'
      case '2': return 'bg-blue-100 text-blue-800'
      case '3': return 'bg-yellow-100 text-yellow-800'
      case '4': return 'bg-orange-100 text-orange-800'
      case '5': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (riskScore) => {
    if (riskScore < 0.15) return 'text-green-600'
    if (riskScore < 0.25) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bank Surveillance</h1>
        <p className="text-gray-600">Monitor financial health and performance of member institutions</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Institutions</p>
              <p className="text-2xl font-bold text-gray-900">{sampleBanks.length}</p>
            </div>
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk Banks</p>
              <p className="text-2xl font-bold text-red-600">
                {sampleBanks.filter(bank => bank.riskScore > 0.2).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average CAMELS</p>
              <p className="text-2xl font-bold text-gray-900">
                {(sampleBanks.reduce((sum, bank) => sum + parseInt(bank.camelsRating), 0) / sampleBanks.length).toFixed(1)}
              </p>
            </div>
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Deposits</p>
              <p className="text-2xl font-bold text-gray-900">
                ${(sampleBanks.reduce((sum, bank) => sum + bank.totalDeposits, 0) / 1000000000).toFixed(1)}B
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Bank Performance Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Institution Performance
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CAMELS Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Deposits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Insured Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Submission</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleBanks.map((bank) => (
                <tr key={bank.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{bank.name}</p>
                      <p className="text-sm text-gray-500">{bank.code}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCamelsColor(bank.camelsRating)}`}>
                      {bank.camelsRating}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
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
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">${(bank.totalDeposits / 1000000000).toFixed(1)}B</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">${(bank.insuredDeposits / 1000000000).toFixed(1)}B</p>
                    <p className="text-xs text-gray-500">
                      {((bank.insuredDeposits / bank.totalDeposits) * 100).toFixed(1)}% coverage
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${bank.complianceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{bank.complianceScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{new Date(bank.lastSubmission).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {bank.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deposit Trends and Risk Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Deposit Trends
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sampleDepositTrends.slice(-3).map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{trend.month} 2023</p>
                    <p className="text-sm text-gray-600">
                      Individual: ${(trend.individual / 1000000000).toFixed(1)}B
                    </p>
                    <p className="text-sm text-gray-600">
                      Corporate: ${(trend.corporate / 1000000000).toFixed(1)}B
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      ${((trend.individual + trend.corporate) / 1000000000).toFixed(1)}B
                    </p>
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      +5.2%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Alerts
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sampleBanks.filter(bank => bank.riskScore > 0.2).map((bank) => (
                <div key={bank.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-red-900">{bank.name}</p>
                      <p className="text-sm text-red-700">
                        Risk Score: {(bank.riskScore * 100).toFixed(1)}% | CAMELS: {bank.camelsRating}
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm text-red-700 border border-red-300 rounded hover:bg-red-100">
                    Review
                  </button>
                </div>
              ))}
              
              {sampleBanks.filter(bank => bank.riskScore > 0.2).length === 0 && (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-green-600 font-medium">All institutions within acceptable risk levels</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
