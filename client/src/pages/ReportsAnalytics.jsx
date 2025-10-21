import { BarChart3, TrendingUp, Download, Filter, Calendar, FileText, PieChart, Activity } from 'lucide-react'

const sampleReportData = [
  {
    id: "RPT001",
    title: "Monthly Returns Summary",
    type: "Returns",
    status: "Completed",
    generatedDate: "2024-01-15",
    fileSize: "2.3 MB",
    downloads: 15
  },
  {
    id: "RPT002", 
    title: "Risk Assessment Report",
    type: "Risk Analysis",
    status: "In Progress",
    generatedDate: "2024-01-14",
    fileSize: "1.8 MB",
    downloads: 8
  },
  {
    id: "RPT003",
    title: "Premium Collection Report",
    type: "Premium",
    status: "Completed",
    generatedDate: "2024-01-12",
    fileSize: "1.2 MB",
    downloads: 22
  }
]

const sampleAnalyticsData = [
  {
    metric: "Total Deposits",
    value: "$4.5B",
    change: "+12.5%",
    trend: "up"
  },
  {
    metric: "Active Banks",
    value: "15",
    change: "+2",
    trend: "up"
  },
  {
    metric: "Premium Collection",
    value: "$7.2M",
    change: "+8.3%",
    trend: "up"
  },
  {
    metric: "Risk Score",
    value: "0.15",
    change: "-0.02",
    trend: "down"
  }
]

export default function ReportsAnalytics() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800'
      case 'In Progress': return 'bg-yellow-100 text-yellow-800'
      case 'Failed': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-gray-600">Generate reports and view system analytics</p>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {sampleAnalyticsData.map((item, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{item.metric}</p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {getTrendIcon(item.trend)}
                  <span className={`text-sm font-medium ${
                    item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change}
                  </span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-600" />
            </div>
          </div>
        ))}
      </div>

      {/* Report Generation */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate New Report
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Report Type</option>
                <option value="returns">Returns Summary</option>
                <option value="risk">Risk Assessment</option>
                <option value="premium">Premium Collection</option>
                <option value="surveillance">Bank Surveillance</option>
                <option value="customer">Customer Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="last-month">Last Month</option>
                <option value="last-quarter">Last Quarter</option>
                <option value="last-year">Last Year</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Generate Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Reports
            </h3>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Filter className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Calendar className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleReportData.map((report, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{report.title}</p>
                      <p className="text-xs text-gray-500">ID: {report.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{report.generatedDate}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{report.fileSize}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{report.downloads}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              System Overview
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-blue-900">Total Institutions</p>
                  <p className="text-sm text-blue-700">15 registered banks</p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-green-900">Active Returns</p>
                  <p className="text-sm text-green-700">12 pending submissions</p>
                </div>
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-medium text-purple-900">Risk Alerts</p>
                  <p className="text-sm text-purple-700">3 high-risk institutions</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activity
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">CBZ Bank submitted returns</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Risk assessment completed</p>
                  <p className="text-sm text-gray-600">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900">Premium calculation updated</p>
                  <p className="text-sm text-gray-600">6 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
