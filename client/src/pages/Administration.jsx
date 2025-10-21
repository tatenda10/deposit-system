import { Settings, Users, Shield, Key, Bell, Database, Globe, Lock, UserPlus, Trash2, Edit, Eye } from 'lucide-react'

const sampleUsers = [
  {
    id: "USR001",
    name: "John Moyo",
    email: "john.moyo@dpc.gov.zw",
    role: "Super Administrator",
    department: "IT Department",
    lastLogin: "2024-01-15 09:30",
    status: "Active",
    permissions: ["Full Access"]
  },
  {
    id: "USR002",
    name: "Sarah Chikwava",
    email: "sarah.chikwava@dpc.gov.zw",
    role: "Risk Analyst",
    department: "Risk Management",
    lastLogin: "2024-01-14 14:20",
    status: "Active",
    permissions: ["Risk Analysis", "Reports"]
  },
  {
    id: "USR003",
    name: "Michael Ncube",
    email: "michael.ncube@dpc.gov.zw",
    role: "Data Entry",
    department: "Operations",
    lastLogin: "2024-01-12 11:45",
    status: "Inactive",
    permissions: ["Data Entry", "View Only"]
  }
]

const sampleSystemSettings = [
  {
    category: "Security",
    settings: [
      { name: "Password Policy", value: "Strong (8+ chars, special chars)", status: "Active" },
      { name: "Session Timeout", value: "30 minutes", status: "Active" },
      { name: "Two-Factor Auth", value: "Enabled", status: "Active" }
    ]
  },
  {
    category: "Notifications",
    settings: [
      { name: "Email Alerts", value: "Enabled", status: "Active" },
      { name: "SMS Notifications", value: "Disabled", status: "Inactive" },
      { name: "System Alerts", value: "Enabled", status: "Active" }
    ]
  },
  {
    category: "Data Management",
    settings: [
      { name: "Backup Frequency", value: "Daily", status: "Active" },
      { name: "Data Retention", value: "7 years", status: "Active" },
      { name: "Archive Policy", value: "Monthly", status: "Active" }
    ]
  }
]

export default function Administration() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800'
      case 'Inactive': return 'bg-gray-100 text-gray-800'
      case 'Suspended': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Administrator': return 'bg-red-100 text-red-800'
      case 'Risk Analyst': return 'bg-blue-100 text-blue-800'
      case 'Data Entry': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
        <p className="text-gray-600">System administration and user management</p>
      </div>

      {/* Admin Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{sampleUsers.length}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {sampleUsers.filter(u => u.status === 'Active').length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Health</p>
              <p className="text-2xl font-bold text-green-600">98%</p>
            </div>
            <Database className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Last Backup</p>
              <p className="text-2xl font-bold text-blue-600">2h ago</p>
            </div>
            <Globe className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </h3>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleUsers.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-500">ID: {user.id}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{user.department}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{user.lastLogin}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center gap-1">
                        <Edit className="w-3 h-3" />
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1">
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Settings className="h-5 w-5" />
              System Settings
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {sampleSystemSettings.map((category, index) => (
                <div key={index}>
                  <h4 className="font-medium text-gray-900 mb-3">{category.category}</h4>
                  <div className="space-y-2">
                    {category.settings.map((setting, settingIndex) => (
                      <div key={settingIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{setting.name}</p>
                          <p className="text-sm text-gray-600">{setting.value}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            setting.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {setting.status}
                          </span>
                          <button className="text-gray-600 hover:text-gray-800">
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security & Access
            </h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Two-Factor Authentication</p>
                    <p className="text-sm text-green-700">Enabled for all users</p>
                  </div>
                </div>
                <button className="text-green-600 hover:text-green-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-blue-900">Password Policy</p>
                    <p className="text-sm text-blue-700">Strong passwords required</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-purple-900">Audit Logging</p>
                    <p className="text-sm text-purple-700">All activities logged</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
