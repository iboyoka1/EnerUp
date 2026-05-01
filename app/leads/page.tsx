import { Suspense } from 'react'
import LeadForm from '@/components/LeadForm'
import { Users, CheckCircle, Shield } from 'lucide-react'

export default function LeadsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Column */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            Free Solar Consultation
          </div>
          <h1 className="text-4xl font-bold text-blue-900 mb-4">
            Get Your Free <span className="text-amber-500">Solar Quote</span>
          </h1>
          <p className="text-slate-600 text-lg mb-8">
            Connect with certified solar installers across Tunisia. Fill out the form and we&apos;ll match you with the best providers for your needs.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">No Obligation</p>
                <p className="text-slate-500 text-sm">Receive quotes with zero commitment required</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">Certified Installers</p>
                <p className="text-slate-500 text-sm">All our partners are verified and certified</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-blue-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-slate-800">Data Privacy</p>
                <p className="text-slate-500 text-sm">Your information is protected and never sold</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-50">
          <Suspense fallback={<div>Loading form...</div>}>
            <LeadForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
