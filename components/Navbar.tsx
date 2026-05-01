'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Zap } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/report', label: 'Report' },
  { href: '/leads', label: 'Get Quote' },
  { href: '/admin', label: 'Admin' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-800">
          <span className="bg-amber-400 text-blue-900 p-1 rounded">
            <Zap className="w-5 h-5" />
          </span>
          EnerUp
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? 'text-blue-700 border-b-2 border-blue-700 pb-0.5'
                  : 'text-slate-600 hover:text-blue-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link
          href="/leads"
          className="bg-amber-400 hover:bg-amber-500 text-blue-900 font-semibold px-5 py-2 rounded-full text-sm transition-colors"
        >
          Free Quote
        </Link>
      </div>
    </nav>
  )
}
