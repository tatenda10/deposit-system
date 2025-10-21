import React from 'react'
import { Card } from 'flowbite-react'

export default function StressTesting() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">Stress Testing</h1>
        <p className="text-gray-600">Allows scenario simulation (e.g., exchange-rate shocks, liquidity crunch)</p>
      </Card>
    </div>
  )
}
