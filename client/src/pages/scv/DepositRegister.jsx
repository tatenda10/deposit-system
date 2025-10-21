import React from 'react'
import { Card } from 'flowbite-react'

export default function DepositRegister() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">Deposit Register</h1>
        <p className="text-gray-600">Shows consolidated depositor data: name, ID, total balances, insured/uninsured split</p>
      </Card>
    </div>
  )
}
