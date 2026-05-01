import AdminDashboard from '@/components/AdminDashboard'
import { LayoutDashboard } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-100 p-2 rounded-lg">
          <LayoutDashboard className="w-6 h-6 text-blue-700" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm">Manage leads and track solar inquiries</p>
        </div>
      </div>
      <AdminDashboard />
    </div>
  )
}
