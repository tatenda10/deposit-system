import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const SCVReports = () => {
  const { user } = useAuth()
  
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-300 p-6">
        <h1 className="text-2xl font-bold text-gray-800">SCV Reports</h1>
        <p className="text-sm text-gray-600">Generate and view SCV reports and summaries</p>
        <p className="text-xs text-gray-500">{user?.bankName} - {user?.role}</p>
      </div>
      
      <div className="bg-white border border-gray-300 p-6">
        <p className="text-gray-600">SCV Reports functionality will be implemented here.</p>
      </div>
    </div>
  )
}

export default SCVReports
