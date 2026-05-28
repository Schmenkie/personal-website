import { NextResponse } from 'next/server'
import type { SentryIssue } from '@/lib/hub/types'

export async function POST(request: Request) {
  const token = process.env.SENTRY_API_TOKEN
  if (!token) return NextResponse.json({ issues: [] })

  const body = await request.json().catch(() => ({}))
  const org = body.organizationSlug || 'linkup-golf'
  const query = body.query || 'is:unresolved firstSeen:-7d'
  const limit = body.limit || 10

  const url = `https://us.sentry.io/api/0/organizations/${org}/issues/?query=${encodeURIComponent(query)}&limit=${limit}&sort=date`
  const r = await fetch(url, {
    headers: { authorization: `Bearer ${token}` },
  })
  const data = await r.json()
  if (!r.ok) return NextResponse.json({ error: data }, { status: r.status })

  const issues: SentryIssue[] = (Array.isArray(data) ? data : []).map(
    (i: Record<string, unknown>) => {
      const project = (i.project ?? {}) as { slug?: string }
      const metadata = (i.metadata ?? {}) as { title?: string }
      return {
        id: (i.shortId as string) || (i.id as string) || '',
        url:
          (i.permalink as string) ||
          `https://${project.slug || 'linkup-golf'}.sentry.io/issues/${i.id}/`,
        title: (i.title as string) || metadata.title || (i.id as string) || '',
        events: String(i.count ?? ''),
        users: String(i.userCount ?? ''),
        lastSeen: (i.lastSeen as string) || '',
        culprit: (i.culprit as string) || '',
      }
    }
  )

  return NextResponse.json({ issues })
}
