import { NextResponse } from 'next/server'

// Each `source` maps to a PostHog project + the personal API key that can query
// it. 'shared' is the cross-product project (LinkUp / SoundSauce / site / …);
// 'sleeve' is Sleeve's own project (org "Sleeve Inc."), which needs its own
// project-scoped key. Add a source here to fold in another standalone project.
const SOURCES = {
  shared: {
    projectId: process.env.POSTHOG_PROJECT_ID || '310428',
    key: process.env.POSTHOG_PERSONAL_API_KEY,
    keyEnv: 'POSTHOG_PERSONAL_API_KEY',
  },
  sleeve: {
    projectId: process.env.POSTHOG_SLEEVE_PROJECT_ID || '473290',
    key: process.env.POSTHOG_SLEEVE_PERSONAL_API_KEY,
    keyEnv: 'POSTHOG_SLEEVE_PERSONAL_API_KEY',
  },
} as const

type Source = keyof typeof SOURCES

export async function POST(request: Request) {
  const { query, source = 'shared' } = await request.json()
  if (!query) {
    return NextResponse.json({ error: 'missing query' }, { status: 400 })
  }

  const cfg = SOURCES[(source as Source)] ?? SOURCES.shared
  if (!cfg.key) {
    return NextResponse.json(
      { error: `${cfg.keyEnv} not set` },
      { status: 500 }
    )
  }

  const r = await fetch(
    `https://us.posthog.com/api/projects/${cfg.projectId}/query/`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${cfg.key}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ query: { kind: 'HogQLQuery', query } }),
    }
  )

  const data = await r.json()
  if (!r.ok) {
    return NextResponse.json({ error: data?.detail || data }, { status: r.status })
  }

  const columns: string[] = data.columns || []
  const results: unknown[][] = data.results || []
  const rows = results.map((row) => {
    const obj: Record<string, string> = {}
    columns.forEach((col, i) => {
      const cell = row[i]
      if (cell == null) obj[col] = ''
      else if (cell instanceof Date) obj[col] = cell.toISOString()
      else if (typeof cell === 'object') obj[col] = JSON.stringify(cell)
      else obj[col] = String(cell)
    })
    return obj
  })

  return NextResponse.json({ columns, rows })
}
