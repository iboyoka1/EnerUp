'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'
import SolarReport from '@/components/SolarReport'
import CostEstimate from '@/components/CostEstimate'
import SolarMap from '@/components/SolarMap'
import { Sun, MapPin, ArrowRight } from 'lucide-react'

interface SolarData {
  solarPotential?: {
    maxArrayPanelsCount: number
    maxArrayAreaMeters2: number
    maxSunshineHoursPerYear: number
    carbonOffsetFactorKgPerMwh: number
    wholeRoofStats: {
      areaMeters2: number
      sunshineQuantiles: number[]
    }
    roofSegmentStats: Array<{
      pitchDegrees: number
      azimuthDegrees: number
      stats: {
        areaMeters2: number
        sunshineQuantiles: number[]
      }
    }>
    solarPanels: Array<{
      center: { latitude: number; longitude: number }
      orientation: string
      yearlyEnergyDcKwh: number
    }>
  }
  name?: string
  error?: string
}

function ReportContent() {
  const searchParams = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  const address = searchParams.get('address') ?? ''

  const [solarData, setSolarData] = useState<SolarData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!lat || !lng) {
      setError('No location provided. Please search for an address first.')
      setLoading(false)
      return
    }

    fetch(`/api/solar?lat=${lat}&lng=${lng}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setSolarData(data)
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch solar data. Please try again.')
        setLoading(false)
      })
  }, [lat, lng])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-700 mx-auto mb-6" />
          <p className="text-xl text-blue-800 font-medium">Analyzing solar potential...</p>
          <p className="text-slate-500 mt-2">This may take a few seconds</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <Sun className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-800 mb-2">Analysis Unavailable</h2>
          <p className="text-red-600 mb-6">{error}</p>
          <Link
            href="/"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Back to Search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-blue-600 mb-2">
          <MapPin className="w-5 h-5" />
          <span className="font-medium">{address || 'Selected Location'}</span>
        </div>
        <h1 className="text-4xl font-bold text-blue-900">Solar Potential Report</h1>
        <p className="text-slate-600 mt-2">
          Based on satellite imagery and Google Solar API data for your rooftop.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        {/* Map */}
        <div className="rounded-2xl overflow-hidden shadow-md h-80">
          {lat && lng && (
            <SolarMap lat={parseFloat(lat)} lng={parseFloat(lng)} />
          )}
        </div>

        {/* Solar Stats */}
        {solarData?.solarPotential && (
          <SolarReport data={solarData.solarPotential} />
        )}
      </div>

      {/* Cost Estimate */}
      {solarData?.solarPotential && (
        <CostEstimate solarData={solarData.solarPotential} />
      )}

      {/* CTA */}
      <div className="mt-10 bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Install Solar Panels?</h2>
        <p className="text-blue-100 mb-6">
          Get matched with certified solar installers in Tunisia and receive a personalized quote.
        </p>
        <Link
          href={`/leads?address=${encodeURIComponent(address)}`}
          className="bg-amber-400 hover:bg-amber-500 text-blue-900 font-bold py-3 px-8 rounded-full inline-flex items-center gap-2 transition-colors"
        >
          Get a Free Quote <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-700" />
      </div>
    }>
      <ReportContent />
    </Suspense>
  )
}
