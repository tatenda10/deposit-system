import React from 'react'
import { Card } from 'flowbite-react'

export default function SCVSummary() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">SCV Summary</h1>
        <p className="text-gray-600">Lists all institutions and their SCV submission status</p>
      </Card>
    </div>
  )
}
