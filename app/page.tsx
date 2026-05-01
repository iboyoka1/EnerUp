import Link from 'next/link'
import { Sun, BarChart2, Users } from 'lucide-react'
import AddressSearch from '@/components/AddressSearch'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <span className="bg-amber-400 text-blue-900 text-sm font-semibold px-4 py-1 rounded-full">
              ☀️ Powered by Google Solar API
            </span>
          </div>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Discover Your <span className="text-amber-400">Solar Potential</span>
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Tunisia receives over 3,000 hours of sunshine per year. Find out how much energy your rooftop can generate and start saving today.
          </p>
          <AddressSearch />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Everything You Need for Solar Analysis
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sun className="text-blue-700 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Solar Analysis</h3>
              <p className="text-slate-600">
                Get precise rooftop solar potential data including panel capacity, yearly energy output, and sunshine hours.
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="text-amber-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Cost Estimate</h3>
              <p className="text-slate-600">
                Interactive cost and ROI calculator. Adjust electricity rates, panel costs, and incentives to see your savings.
              </p>
            </div>
            <div className="bg-green-50 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Expert Leads</h3>
              <p className="text-slate-600">
                Connect homeowners with qualified solar installers across Tunisia. Streamlined lead management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Go Solar?</h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join hundreds of Tunisian homeowners already saving with solar energy.
          </p>
          <Link
            href="/leads"
            className="bg-amber-400 hover:bg-amber-500 text-blue-900 font-bold py-4 px-10 rounded-full text-lg transition-colors inline-block"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  )
}
