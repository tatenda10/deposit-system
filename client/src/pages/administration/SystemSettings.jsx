import React from 'react'
import { Card } from 'flowbite-react'

export default function SystemSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600">Configure cover levels, reporting deadlines, and premium rates</p>
      </Card>
    </div>
  )
}
