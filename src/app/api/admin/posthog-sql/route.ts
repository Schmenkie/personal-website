import { NextResponse } from 'next/server'

const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID || '310428'

export async function POST(request: Request) {
  const key = process.env.POSTHOG_PERSONAL_API_KEY
  if (!key) {
    return NextResponse.json(
      { error: 'POSTHOG_PERSONAL_API_KEY not set' },
      { status: 500 }
    )
  }

  const { query } = await request.json()
  if (!query) {
    return NextResponse.json({ error: 'missing query' }, { status: 400 })
  }

  const r = await fetch(
    `https://us.posthog.com/api/projects/${POSTHOG_PROJECT_ID}/query/`,
    {
      method: 'POST',
      headers: {
        authorization: `Bearer ${key}`,
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
