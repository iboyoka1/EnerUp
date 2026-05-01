import { NextRequest, NextResponse } from 'next/server'

export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  address: string
  message: string
  createdAt: string
}

declare global {
  // eslint-disable-next-line no-var
  var leadsStore: Lead[] | undefined
}

function getLeadsStore(): Lead[] {
  if (!global.leadsStore) {
    global.leadsStore = []
  }
  return global.leadsStore
}

export async function GET() {
  const leads = getLeadsStore()
  return NextResponse.json({ leads })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, company, email, phone, address, message } = body

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    const lead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      name,
      company: company ?? '',
      email,
      phone: phone ?? '',
      address: address ?? '',
      message: message ?? '',
      createdAt: new Date().toISOString(),
    }

    getLeadsStore().push(lead)

    return NextResponse.json({ success: true, lead }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
