import { AlertTriangle, Brain, Shield, Target, TrendingUp, TrendingDown, Activity } from 'lucide-react'

const sampleRiskData = [
  {
    bankName: "CBZ Bank Limited",
    riskScore: 0.15,
    pd: 0.12,
    lgd: 0.45,
    ead: 2000000000,
    trend: "Stable",
    alerts: 0
  },
  {
    bankName: "Standard Chartered Bank Zimbabwe",
    riskScore: 0.08,
    pd: 0.05,
    lgd: 0.40,
    ead: 1500000000,
    trend: "Improving",
    alerts: 0
  },
  {
    bankName: "FBC Bank Limited",
    riskScore: 0.25,
    pd: 0.20,
    lgd: 0.50,
    ead: 1000000000,
    trend: "Deteriorating",
    alerts: 3
  }
]

export default function RiskAnalysis() {
  const getRiskLevel = (score) => {
    if (score < 0.15) return { level: 'Low', color: 'bg-green-100 text-green-800' }
    if (score < 0.25) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' }
    return { level: 'High', color: 'bg-red-100 text-red-800' }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'Improving': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'Deteriorating': return <TrendingDown className="w-4 h-4 text-red-500" />
      default: return <Activity className="w-4 h-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Risk Analysis</h1>
        <p className="text-gray-600">AI-powered risk assessment and predictive analytics</p>
      </div>

      {/* Risk Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Institutions</p>
              <p className="text-2xl font-bold text-gray-900">{sampleRiskData.length}</p>
            </div>
            <Brain className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-red-600">
                {sampleRiskData.filter(risk => risk.riskScore > 0.2).length}
              </p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-orange-600">
                {sampleRiskData.reduce((sum, risk) => sum + risk.alerts, 0)}
              </p>
            </div>
            <Target className="h-8 w-8 text-orange-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Risk Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {(sampleRiskData.reduce((sum, risk) => sum + risk.riskScore, 0) / sampleRiskData.length * 100).toFixed(1)}%
              </p>
            </div>
            <Shield className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Risk Analysis Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Risk Assessment Results
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PD (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">LGD (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EAD (USD)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alerts</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleRiskData.map((risk, index) => {
                const riskLevel = getRiskLevel(risk.riskScore)
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{risk.bankName}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              risk.riskScore < 0.15 ? 'bg-green-500' : 
                              risk.riskScore < 0.25 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${risk.riskScore * 100}%` }}
                          ></div>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${riskLevel.color}`}>
                          {riskLevel.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{(risk.riskScore * 100).toFixed(1)}%</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{(risk.pd * 100).toFixed(2)}%</p>
                      <p className="text-xs text-gray-500">Probability of Default</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">{(risk.lgd * 100).toFixed(1)}%</p>
                      <p className="text-xs text-gray-500">Loss Given Default</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">${(risk.ead / 1000000000).toFixed(1)}B</p>
                      <p className="text-xs text-gray-500">Exposure at Default</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getTrendIcon(risk.trend)}
                        <span className={`text-sm font-medium ${
                          risk.trend === 'Improving' ? 'text-green-600' :
                          risk.trend === 'Deteriorating' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {risk.trend}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {risk.alerts > 0 ? (
                        <div className="flex items-center gap-1 text-red-600">
                          <AlertTriangle className="w-4 h-4" />
                          <span className="text-sm font-medium">{risk.alerts}</span>
                        </div>
                      ) : (
                        <span className="text-green-600 text-sm">None</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Analyze</button>
                        <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">Report</button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Predictive Analytics and Risk Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Predictive Analytics
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sampleRiskData.map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{risk.bankName}</p>
                    <p className="text-sm text-gray-600">
                      Predicted Risk Score: {((risk.riskScore + Math.random() * 0.1 - 0.05) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      risk.riskScore > 0.2 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {risk.riskScore > 0.2 ? "High Risk" : "Stable"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Target className="h-5 w-5" />
              Risk Alerts
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {sampleRiskData.filter(risk => risk.alerts > 0).map((risk, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-red-900">{risk.bankName}</p>
                      <p className="text-sm text-red-700">
                        {risk.alerts} active alerts • Risk Score: {(risk.riskScore * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm text-red-700 border border-red-300 rounded hover:bg-red-100">
                    Investigate
                  </button>
                </div>
              ))}
              
              {sampleRiskData.filter(risk => risk.alerts > 0).length === 0 && (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <p className="text-green-600 font-medium">No active risk alerts</p>
                  <p className="text-sm text-gray-500">All institutions within acceptable risk parameters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
