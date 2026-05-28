import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const token = process.env.SENTRY_API_TOKEN
  if (!token) return NextResponse.json({ count: 0 })

  const body = await request.json().catch(() => ({}))
  const org = body.organizationSlug || 'linkup-golf'
  const statsPeriod = body.statsPeriod || '7d'
  const dataset = body.dataset || 'errors'

  const url = `https://us.sentry.io/api/0/organizations/${org}/events/?field=count()&statsPeriod=${statsPeriod}&dataset=${dataset}`
  const r = await fetch(url, {
    headers: { authorization: `Bearer ${token}` },
  })
  const data = await r.json()
  if (!r.ok) return NextResponse.json({ error: data }, { status: r.status })

  const count = data?.data?.[0]?.['count()'] ?? 0
  return NextResponse.json({ count })
}
