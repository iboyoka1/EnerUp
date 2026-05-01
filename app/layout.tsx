import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'EnerUp – Solar Potential for Tunisia',
  description: 'Discover your rooftop solar potential with AI-powered analysis. Built for Tunisia solar companies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-blue-900 text-white py-8 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-blue-200">© 2024 EnerUp – Solar Potential for Tunisia. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
