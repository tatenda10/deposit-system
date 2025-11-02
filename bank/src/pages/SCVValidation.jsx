import React from 'react'
import { useAuth } from '../contexts/AuthContext'

const SCVValidation = () => {
  const { user } = useAuth()
  
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-300 p-6">
        <h1 className="text-2xl font-bold text-gray-800">SCV Validation</h1>
        <p className="text-sm text-gray-600">View SCV data validation results and error reports</p>
        <p className="text-xs text-gray-500">{user?.bankName} - {user?.role}</p>
      </div>
      
      <div className="bg-white border border-gray-300 p-6">
        <p className="text-gray-600">SCV Validation functionality will be implemented here.</p>
      </div>
    </div>
  )
}

export default SCVValidation
