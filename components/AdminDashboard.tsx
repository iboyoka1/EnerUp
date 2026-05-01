'use client'

import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Users, TrendingUp, Mail, RefreshCw } from 'lucide-react'

interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  message: string
  createdAt: string
}

function getLeadsThisWeek(leads: Lead[]): number {
  const oneWeekAgo = new Date()
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
  return leads.filter((l) => new Date(l.createdAt) > oneWeekAgo).length
}

function getLeadsPerDay(leads: Lead[]): Array<{ date: string; count: number }> {
  const counts: Record<string, number> = {}
  leads.forEach((lead) => {
    const date = new Date(lead.createdAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
    counts[date] = (counts[date] ?? 0) + 1
  })
  return Object.entries(counts)
    .map(([date, count]) => ({ date, count }))
    .slice(-7)
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchLeads = () => {
    setLoading(true)
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        setLeads(data.leads ?? [])
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load leads')
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchLeads()
  }, [])

  const leadsThisWeek = getLeadsThisWeek(leads)
  const chartData = getLeadsPerDay(leads)

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-700" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-16 text-red-500">{error}</div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6 flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-xl">
            <Users className="w-6 h-6 text-blue-700" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Total Leads</p>
            <p className="text-3xl font-bold text-blue-900">{leads.length}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6 flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-xl">
            <TrendingUp className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Leads This Week</p>
            <p className="text-3xl font-bold text-green-700">{leadsThisWeek}</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6 flex items-center gap-4">
          <div className="bg-amber-100 p-3 rounded-xl">
            <Mail className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-sm text-slate-500">Latest Lead</p>
            <p className="text-lg font-bold text-amber-700">
              {leads.length > 0
                ? new Date(
                    leads.reduce((latest, l) =>
                      l.createdAt > latest.createdAt ? l : latest
                    ).createdAt
                  ).toLocaleDateString()
                : '—'}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      {chartData.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-blue-50 p-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-4">Leads Per Day</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-blue-50">
          <h2 className="text-lg font-semibold text-blue-900">All Leads</h2>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {leads.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No leads yet. Share your quote page to start collecting leads.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-blue-50 text-blue-900">
                <tr>
                  {['Name', 'Company', 'Email', 'Phone', 'Address', 'Date'].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-blue-50/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{lead.name}</td>
                    <td className="px-4 py-3 text-slate-600">{lead.company || '—'}</td>
                    <td className="px-4 py-3 text-blue-600">
                      <a href={`mailto:${lead.email}`}>{lead.email}</a>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{lead.phone || '—'}</td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{lead.address || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
