import React from 'react'
import { Card } from 'flowbite-react'

export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure system parameters and preferences</p>
      </Card>

      {/* System Configuration */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">System Name</label>
            <input 
              type="text" 
              defaultValue="Q-Sight Regulatory System"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">System Version</label>
            <input 
              type="text" 
              defaultValue="v2.1.0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maintenance Mode</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="false">Disabled</option>
              <option value="true">Enabled</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Notifications</label>
              <p className="text-xs text-gray-500">Receive email alerts for system events</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
              <p className="text-xs text-gray-500">Receive SMS alerts for critical events</p>
            </div>
            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Dashboard Alerts</label>
              <p className="text-xs text-gray-500">Show alerts on the dashboard</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input 
              type="number" 
              defaultValue="30"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="standard">Standard</option>
              <option value="strict">Strict</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
              <p className="text-xs text-gray-500">Require 2FA for all users</p>
            </div>
            <input type="checkbox" className="h-4 w-4 text-blue-600 rounded" />
          </div>
        </div>
      </Card>

      {/* Data Settings */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Data Retention Period (days)</label>
            <input 
              type="number" 
              defaultValue="365"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Auto Backup</label>
              <p className="text-xs text-gray-500">Automatically backup data</p>
            </div>
            <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Save Settings
        </button>
      </div>
    </div>
  )
}
