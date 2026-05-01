'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Calendar } from 'lucide-react'

interface SolarPotential {
  maxArrayPanelsCount: number
  solarPanels?: Array<{ yearlyEnergyDcKwh: number }>
}

interface CostEstimateProps {
  solarData: SolarPotential
}

export default function CostEstimate({ solarData }: CostEstimateProps) {
  const [electricityRate, setElectricityRate] = useState(0.12) // USD per kWh
  const [costPerPanel, setCostPerPanel] = useState(300) // USD per panel
  const [incentivePercent, setIncentivePercent] = useState(20) // %
  const [numPanels, setNumPanels] = useState(
    Math.min(20, solarData.maxArrayPanelsCount)
  )

  const yearlyEnergyKwh = solarData.solarPanels
    ? solarData.solarPanels.slice(0, numPanels).reduce((s, p) => s + p.yearlyEnergyDcKwh, 0)
    : numPanels * 400 // fallback: ~400 kWh/panel/year (typical 400W panel at Tunisia's irradiance)

  const grossCost = numPanels * costPerPanel
  const incentiveAmount = (grossCost * incentivePercent) / 100
  const netCost = grossCost - incentiveAmount
  const yearlySavings = yearlyEnergyKwh * electricityRate
  const paybackYears = yearlySavings > 0 ? netCost / yearlySavings : 0
  const lifetimeSavings = yearlySavings * 25 - netCost

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 border border-blue-50">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Cost &amp; ROI Estimate</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Sliders */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Number of Panels: <span className="text-blue-700 font-bold">{numPanels}</span>
            </label>
            <input
              type="range"
              min={1}
              max={solarData.maxArrayPanelsCount}
              value={numPanels}
              onChange={(e) => setNumPanels(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>1</span><span>{solarData.maxArrayPanelsCount}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Electricity Rate: <span className="text-blue-700 font-bold">${electricityRate.toFixed(2)}/kWh</span>
            </label>
            <input
              type="range"
              min={0.05}
              max={0.40}
              step={0.01}
              value={electricityRate}
              onChange={(e) => setElectricityRate(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>$0.05</span><span>$0.40</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cost per Panel: <span className="text-blue-700 font-bold">${costPerPanel}</span>
            </label>
            <input
              type="range"
              min={100}
              max={800}
              step={10}
              value={costPerPanel}
              onChange={(e) => setCostPerPanel(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>$100</span><span>$800</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Government Incentive: <span className="text-blue-700 font-bold">{incentivePercent}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={50}
              value={incentivePercent}
              onChange={(e) => setIncentivePercent(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0%</span><span>50%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="text-blue-600 w-5 h-5" />
              <span className="text-slate-600 text-sm font-medium">Net Installation Cost</span>
            </div>
            <p className="text-3xl font-bold text-blue-900">${netCost.toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">
              After ${incentiveAmount.toLocaleString()} incentive deduction
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-green-600 w-5 h-5" />
              <span className="text-slate-600 text-sm font-medium">Annual Savings</span>
            </div>
            <p className="text-3xl font-bold text-green-700">${Math.round(yearlySavings).toLocaleString()}</p>
            <p className="text-xs text-slate-500 mt-1">
              {Math.round(yearlyEnergyKwh).toLocaleString()} kWh × ${electricityRate}/kWh
            </p>
          </div>

          <div className="bg-amber-50 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="text-amber-600 w-5 h-5" />
              <span className="text-slate-600 text-sm font-medium">Payback Period</span>
            </div>
            <p className="text-3xl font-bold text-amber-700">
              {paybackYears > 0 ? `${paybackYears.toFixed(1)} yrs` : '—'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              25-yr lifetime savings: ${Math.round(lifetimeSavings).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
