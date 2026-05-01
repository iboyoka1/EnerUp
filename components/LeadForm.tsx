'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { CheckCircle, Send } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

interface LeadFormData {
  name: string
  company: string
  email: string
  phone: string
  address: string
  message: string
}

export default function LeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState('')
  const searchParams = useSearchParams()
  const defaultAddress = searchParams.get('address') ?? ''

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    defaultValues: { address: defaultAddress },
  })

  const onSubmit = async (data: LeadFormData) => {
    setSubmitting(true)
    setServerError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setSubmitted(true)
      } else {
        const err = await res.json()
        setServerError(err.error ?? 'Submission failed. Please try again.')
      }
    } catch {
      setServerError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-10">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-blue-900 mb-2">Request Submitted!</h3>
        <p className="text-slate-600">
          Thank you! A solar expert will contact you within 24 hours.
        </p>
      </div>
    )
  }

  const inputClass = (error?: { message?: string }) =>
    `w-full px-4 py-3 rounded-lg border ${
      error ? 'border-red-400 bg-red-50' : 'border-blue-100 bg-blue-50/30'
    } text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition`

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name', { required: 'Name is required' })}
            placeholder="Ahmed Ben Ali"
            className={inputClass(errors.name)}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
          <input
            {...register('company')}
            placeholder="Solar Corp"
            className={inputClass()}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' },
            })}
            type="email"
            placeholder="ahmed@example.com"
            className={inputClass(errors.email)}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
          <input
            {...register('phone')}
            type="tel"
            placeholder="+216 XX XXX XXX"
            className={inputClass()}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
        <input
          {...register('address')}
          placeholder="12 Avenue Habib Bourguiba, Tunis"
          className={inputClass()}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
        <textarea
          {...register('message')}
          rows={4}
          placeholder="Tell us about your energy needs..."
          className={inputClass()}
        />
      </div>

      {serverError && (
        <p className="text-red-500 text-sm">{serverError}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
      >
        {submitting ? (
          <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
        ) : (
          <>
            <Send className="w-5 h-5" />
            Submit Request
          </>
        )}
      </button>
    </form>
  )
}
