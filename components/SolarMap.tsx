'use client'

import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface SolarMapProps {
  lat: number
  lng: number
  zoom?: number
}

export default function SolarMap({ lat, lng, zoom = 18 }: SolarMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    if (!apiKey || !mapRef.current) return

    const loader = new Loader({
      apiKey,
      version: 'weekly',
      libraries: ['maps', 'marker'],
    })

    loader.load().then(() => {
      if (!mapRef.current) return

      const map = new google.maps.Map(mapRef.current, {
        center: { lat, lng },
        zoom,
        mapTypeId: 'satellite',
        disableDefaultUI: false,
        mapTypeControl: false,
        streetViewControl: false,
      })

      new google.maps.Marker({
        position: { lat, lng },
        map,
        title: 'Selected Location',
        animation: google.maps.Animation.DROP,
      })

      mapInstanceRef.current = map
    }).catch(() => {
      if (mapRef.current) {
        mapRef.current.innerHTML = `
          <div class="flex items-center justify-center h-full bg-blue-50 text-blue-500 text-sm">
            Map unavailable (API key not configured)
          </div>
        `
      }
    })
  }, [lat, lng, zoom])

  return (
    <div
      ref={mapRef}
      className="w-full h-full rounded-2xl bg-blue-50"
      style={{ minHeight: '320px' }}
    />
  )
}
