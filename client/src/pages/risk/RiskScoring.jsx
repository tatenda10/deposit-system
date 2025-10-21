import React from 'react'
import { Card } from 'flowbite-react'

export default function RiskScoring() {
  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-gray-900">Risk Scoring</h1>
        <p className="text-gray-600">Displays PD (Probability of Default), LGD, EAD for all banks</p>
      </Card>
    </div>
  )
}
