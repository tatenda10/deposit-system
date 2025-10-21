import React from 'react'
import { Card, Badge, Button } from 'flowbite-react'
import { Users as UsersIcon, UserPlus, Edit, Trash2, Shield, UserCheck } from 'lucide-react'

const sampleUsers = [
  { id: 1, name: 'Frankie Sullivan', email: 'frankie.sullivan@dpc.gov.zw', role: 'Administrator', status: 'Active', lastLogin: '2024-01-15 09:30' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@dpc.gov.zw', role: 'Supervisor', status: 'Active', lastLogin: '2024-01-15 08:45' },
  { id: 3, name: 'Michael Chen', email: 'michael.chen@dpc.gov.zw', role: 'Analyst', status: 'Active', lastLogin: '2024-01-14 16:20' },
  { id: 4, name: 'Emily Rodriguez', email: 'emily.rodriguez@dpc.gov.zw', role: 'Analyst', status: 'Inactive', lastLogin: '2024-01-10 14:15' },
  { id: 5, name: 'David Kim', email: 'david.kim@dpc.gov.zw', role: 'Supervisor', status: 'Active', lastLogin: '2024-01-15 10:15' }
]

export default function Users() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
            <p className="text-gray-600">Manage system users and their permissions</p>
          </div>
          <Button color="blue" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </Card>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <UsersIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Active Users</h3>
              <p className="text-2xl font-bold text-green-600">4</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Administrators</h3>
              <p className="text-2xl font-bold text-purple-600">1</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
          <div className="flex gap-2">
            <Button size="sm" color="gray">Export</Button>
            <Button size="sm" color="blue">Filter</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">User</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Login</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sampleUsers.map((user) => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-gray-500 text-xs">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge 
                      color={user.role === 'Administrator' ? 'purple' : user.role === 'Supervisor' ? 'blue' : 'gray'}
                    >
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge color={user.status === 'Active' ? 'success' : 'failure'}>
                      {user.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button size="xs" color="blue">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="xs" color="red">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Role Permissions */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Permissions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Administrator</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Full system access</li>
              <li>• User management</li>
              <li>• System configuration</li>
              <li>• All reports and analytics</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Supervisor</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Bank surveillance</li>
              <li>• Risk analysis</li>
              <li>• Premium management</li>
              <li>• Limited user management</li>
            </ul>
          </div>
          <div className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2">Analyst</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• View reports</li>
              <li>• Data analysis</li>
              <li>• Read-only access</li>
              <li>• Export capabilities</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}
