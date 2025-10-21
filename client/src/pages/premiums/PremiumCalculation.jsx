import React, { useState } from 'react'
import { 
  Calculator, 
  DollarSign, 
  Building2, 
  TrendingUp, 
  Settings, 
  Download, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  BarChart3,
  Shield,
  Users,
  FileText,
  RefreshCw
} from 'lucide-react'

// Mock data for premium calculations
const mockBanks = [
  {
    id: 1,
    name: "CBZ Bank Limited",
    code: "CBZ",
    totalDeposits: 2890400000,
    insuredDeposits: 2890400000,
    riskScore: 2.8,
    premiumRate: 0.15,
    calculatedPremium: 4335600,
    status: "Calculated",
    lastUpdated: "2024-01-15"
  },
  {
    id: 2,
    name: "Standard Chartered Bank Zimbabwe",
    code: "SCB",
    totalDeposits: 1250000000,
    insuredDeposits: 1250000000,
    riskScore: 3.2,
    premiumRate: 0.18,
    calculatedPremium: 2250000,
    status: "Calculated",
    lastUpdated: "2024-01-15"
  },
  {
    id: 3,
    name: "Nedbank Zimbabwe",
    code: "NED",
    totalDeposits: 890000000,
    insuredDeposits: 890000000,
    riskScore: 2.5,
    premiumRate: 0.12,
    calculatedPremium: 1068000,
    status: "Pending Review",
    lastUpdated: "2024-01-14"
  },
  {
    id: 4,
    name: "Ecobank Zimbabwe",
    code: "ECO",
    totalDeposits: 650000000,
    insuredDeposits: 650000000,
    riskScore: 3.8,
    premiumRate: 0.22,
    calculatedPremium: 1430000,
    status: "Override Applied",
    lastUpdated: "2024-01-15"
  }
]

const premiumStructures = [
  {
    id: 1,
    name: "Flat Rate Structure",
    description: "Uniform premium rate applied to all banks",
    baseRate: 0.15,
    isActive: true,
    effectiveDate: "2024-01-01"
  },
  {
    id: 2,
    name: "Risk-Based Structure",
    description: "Premium rates based on individual bank risk assessment",
    baseRate: 0.12,
    riskMultiplier: 1.5,
    isActive: true,
    effectiveDate: "2024-01-01"
  }
]

export default function PremiumCalculation() {
  const [selectedStructure, setSelectedStructure] = useState('risk-based')
  const [banks, setBanks] = useState(mockBanks)
  const [showOverrideModal, setShowOverrideModal] = useState(false)
  const [selectedBank, setSelectedBank] = useState(null)
  const [overrideRate, setOverrideRate] = useState('')
  const [overrideReason, setOverrideReason] = useState('')
  const [baseRate, setBaseRate] = useState(0.15)
  const [riskMultiplier, setRiskMultiplier] = useState(1.5)

  const handleOverride = (bank) => {
    setSelectedBank(bank)
    setOverrideRate(bank.premiumRate.toString())
    setShowOverrideModal(true)
  }

  const applyOverride = () => {
    if (selectedBank && overrideRate && overrideReason) {
      const updatedBanks = banks.map(bank => 
        bank.id === selectedBank.id 
          ? {
              ...bank,
              premiumRate: parseFloat(overrideRate),
              calculatedPremium: bank.insuredDeposits * (parseFloat(overrideRate) / 100),
              status: "Override Applied",
              lastUpdated: new Date().toISOString().split('T')[0]
            }
          : bank
      )
      setBanks(updatedBanks)
      setShowOverrideModal(false)
      setSelectedBank(null)
      setOverrideRate('')
      setOverrideReason('')
    }
  }

  const recalculateAll = () => {
    const updatedBanks = banks.map(bank => {
      let newPremiumRate = baseRate
      
      if (selectedStructure === 'risk-based') {
        newPremiumRate = baseRate * riskMultiplier * (bank.riskScore / 5)
      }
      
      return {
        ...bank,
        premiumRate: newPremiumRate,
        calculatedPremium: bank.insuredDeposits * (newPremiumRate / 100),
        status: "Calculated",
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    })
    setBanks(updatedBanks)
  }

  // Auto-recalculate when metrics change
  React.useEffect(() => {
    const updatedBanks = banks.map(bank => {
      let newPremiumRate = baseRate
      
      if (selectedStructure === 'risk-based') {
        newPremiumRate = baseRate * riskMultiplier * (bank.riskScore / 5)
      }
      
      return {
        ...bank,
        premiumRate: newPremiumRate,
        calculatedPremium: bank.insuredDeposits * (newPremiumRate / 100),
        status: bank.status === "Override Applied" ? "Override Applied" : "Calculated"
      }
    })
    setBanks(updatedBanks)
  }, [baseRate, riskMultiplier, selectedStructure])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Calculated': return 'bg-green-100 text-green-800 border-green-200'
      case 'Pending Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Override Applied': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const totalPremium = banks.reduce((sum, bank) => sum + bank.calculatedPremium, 0)
  const totalInsuredDeposits = banks.reduce((sum, bank) => sum + bank.insuredDeposits, 0)
  const averageRate = (totalPremium / totalInsuredDeposits) * 100

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-gray-300 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">Premium Calculation</h1>
            <p className="text-sm text-gray-600">Auto-computes premiums for all banks using uploaded deposit data</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={recalculateAll}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 text-xs font-medium flex items-center gap-1"
            >
              <RefreshCw className="h-3 w-3" />
              Recalculate All
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
              <h3 className="text-xs font-medium text-gray-600">Total Premium</h3>
              <p className="text-sm font-semibold text-blue-700">${totalPremium.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 border border-green-300">
              <Building2 className="h-4 w-4 text-green-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Banks Covered</h3>
              <p className="text-sm font-semibold text-green-700">{banks.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 border border-orange-300">
              <TrendingUp className="h-4 w-4 text-orange-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Average Rate</h3>
              <p className="text-sm font-semibold text-orange-700">{averageRate.toFixed(2)}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-300 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 border border-purple-300">
              <Shield className="h-4 w-4 text-purple-700" />
            </div>
            <div>
              <h3 className="text-xs font-medium text-gray-600">Total Insured</h3>
              <p className="text-sm font-semibold text-purple-700">${totalInsuredDeposits.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Structure Selection */}
      <div className="bg-white border border-gray-300 p-6">
        <h2 className="text-md font-semibold text-gray-800 mb-4">Premium Structure Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">Calculation Method</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="structure"
                  value="flat-rate"
                  checked={selectedStructure === 'flat-rate'}
                  onChange={(e) => setSelectedStructure(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Flat Rate Structure</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="structure"
                  value="risk-based"
                  checked={selectedStructure === 'risk-based'}
                  onChange={(e) => setSelectedStructure(e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">Risk-Based Structure</span>
              </label>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700">Base Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={baseRate}
                onChange={(e) => setBaseRate(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {selectedStructure === 'risk-based' && (
              <div>
                <label className="text-sm font-medium text-gray-700">Risk Multiplier</label>
                <input
                  type="number"
                  step="0.1"
                  value={riskMultiplier}
                  onChange={(e) => setRiskMultiplier(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bank Premium Calculations */}
      <div className="bg-white border border-gray-300">
        <div className="p-6 border-b border-gray-300">
          <h2 className="text-md font-semibold text-gray-800">Bank Premium Calculations</h2>
          <p className="text-sm text-gray-600">Individual bank premium calculations and override options</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-300">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Bank</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Insured Deposits</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Risk Score</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Premium Rate</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Calculated Premium</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {banks.map((bank) => (
                <tr key={bank.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{bank.name}</p>
                      <p className="text-xs text-gray-500">{bank.code}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-900">${bank.insuredDeposits.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${
                      bank.riskScore <= 2.5 ? 'bg-green-100 text-green-800 border-green-200' :
                      bank.riskScore <= 3.5 ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                      'bg-red-100 text-red-800 border-red-200'
                    } border rounded`}>
                      {bank.riskScore}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-gray-900">{bank.premiumRate}%</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">${bank.calculatedPremium.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${getStatusColor(bank.status)} border rounded`}>
                      {bank.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleOverride(bank)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1"
                        title="Apply Override"
                      >
                        <Settings className="h-3 w-3" />
                        Override
                      </button>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 text-xs font-medium flex items-center gap-1" title="View Details">
                        <FileText className="h-3 w-3" />
                        Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Override Modal */}
      {showOverrideModal && selectedBank && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Apply Premium Override</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Bank</label>
                <p className="text-sm text-gray-900">{selectedBank.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Current Rate (%)</label>
                <p className="text-sm text-gray-900">{selectedBank.premiumRate}%</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">New Rate (%)</label>
                <input
                  type="number"
                  step="0.01"
                  value={overrideRate}
                  onChange={(e) => setOverrideRate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Override Reason</label>
                <textarea
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Provide reason for override..."
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowOverrideModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={applyOverride}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
              >
                Apply Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
