import { Sun, Zap, Maximize2, Leaf } from 'lucide-react'

interface SolarPotential {
  maxArrayPanelsCount: number
  maxArrayAreaMeters2: number
  maxSunshineHoursPerYear: number
  carbonOffsetFactorKgPerMwh: number
  solarPanels?: Array<{ yearlyEnergyDcKwh: number }>
}

interface SolarReportProps {
  data: SolarPotential
}

export default function SolarReport({ data }: SolarReportProps) {
  const totalYearlyEnergy = data.solarPanels
    ? data.solarPanels.reduce((sum, p) => sum + p.yearlyEnergyDcKwh, 0)
    : data.maxArrayPanelsCount * 400 // fallback: ~400 kWh/panel/year (typical 400W panel at Tunisia's irradiance)

  const stats = [
    {
      icon: <Sun className="w-7 h-7 text-amber-500" />,
      label: 'Sunshine Hours/Year',
      value: Math.round(data.maxSunshineHoursPerYear).toLocaleString(),
      unit: 'hrs',
      bg: 'bg-amber-50',
    },
    {
      icon: <Zap className="w-7 h-7 text-blue-500" />,
      label: 'Max Solar Panels',
      value: data.maxArrayPanelsCount.toLocaleString(),
      unit: 'panels',
      bg: 'bg-blue-50',
    },
    {
      icon: <Maximize2 className="w-7 h-7 text-green-500" />,
      label: 'Usable Roof Area',
      value: Math.round(data.maxArrayAreaMeters2).toLocaleString(),
      unit: 'm²',
      bg: 'bg-green-50',
    },
    {
      icon: <Leaf className="w-7 h-7 text-emerald-500" />,
      label: 'Yearly Energy Output',
      value: Math.round(totalYearlyEnergy / 1000).toLocaleString(),
      unit: 'MWh/yr',
      bg: 'bg-emerald-50',
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className={`${stat.bg} rounded-2xl p-5 shadow-sm`}>
          <div className="mb-3">{stat.icon}</div>
          <p className="text-2xl font-bold text-slate-800">
            {stat.value}
            <span className="text-sm font-normal text-slate-500 ml-1">{stat.unit}</span>
          </p>
          <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
