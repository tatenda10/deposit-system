import React from 'react'
import { Card } from 'flowbite-react'

export default function ComplianceTracker() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">Compliance Tracker</h1>
        <p className="text-gray-600">Displays compliance history for each institution</p>
      </Card>
    </div>
  )
}
