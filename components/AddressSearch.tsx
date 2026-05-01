'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Search, MapPin } from 'lucide-react'
import { Loader } from '@googlemaps/js-api-loader'

export default function AddressSearch() {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const router = useRouter()

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey || !inputRef.current) return

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['places'],
    })

    loader.load().then(() => {
      if (!inputRef.current) return
      autocompleteRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        types: ['address'],
        componentRestrictions: { country: 'tn' },
      })
      autocompleteRef.current.addListener('place_changed', () => {
        const place = autocompleteRef.current?.getPlace()
        if (place?.formatted_address) {
          setAddress(place.formatted_address)
        }
      })
    }).catch(() => {
      // API not configured, fallback to manual geocoding
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) {
      setError('Please enter an address')
      return
    }
    setError('')
    setLoading(true)

    try {
      const res = await fetch(`/api/geocode?address=${encodeURIComponent(address)}`)
      const data = await res.json()

      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location
        router.push(`/report?lat=${lat}&lng=${lng}&address=${encodeURIComponent(address)}`)
      } else {
        setError('Address not found. Please try a more specific address.')
        setLoading(false)
      }
    } catch {
      setError('Failed to search address. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center bg-white rounded-full shadow-xl overflow-hidden border-2 border-blue-200 focus-within:border-amber-400 transition-colors">
          <MapPin className="text-blue-400 w-6 h-6 ml-5 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address in Tunisia..."
            className="flex-1 py-4 px-4 text-slate-800 text-lg outline-none bg-transparent"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-amber-400 hover:bg-amber-500 text-blue-900 font-bold py-4 px-8 text-lg transition-colors disabled:opacity-60 flex items-center gap-2"
          >
            {loading ? (
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-900" />
            ) : (
              <Search className="w-5 h-5" />
            )}
            Analyze
          </button>
        </div>
      </form>
      {error && (
        <p className="mt-3 text-red-300 text-sm text-center">{error}</p>
      )}
      <p className="mt-3 text-blue-300 text-sm text-center">
        Example: &quot;12 Avenue Habib Bourguiba, Tunis&quot;
      </p>
    </div>
  )
}
