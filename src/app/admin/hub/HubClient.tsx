'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { PROJECTS, SENTRY_ORG, type Project, type ProjectId, type PosthogSource } from '@/lib/hub/projects'
import {
  breakdownSql,
  projectDailySql,
  projectEventsSql,
  projectGeoSql,
  projectKpiSql,
} from '@/lib/hub/queries'
import { eventKind, flagEmoji, pluralize, timeAgo } from '@/lib/hub/format'
import type {
  BreakdownRow,
  DailyRow,
  EventRow,
  GeoRow,
  KpiRow,
  SentryIssue,
} from '@/lib/hub/types'

type TabId = 'overview' | ProjectId

type ProjectData = {
  proj: Project
  kpi: KpiRow
  daily: DailyRow[]
  geo: GeoRow[]
  events: EventRow[]
  sentry?: SentryIssue[]
}

async function runSql<T = Record<string, string>>(
  query: string,
  source: PosthogSource = 'shared'
): Promise<T[]> {
  const r = await fetch('/api/admin/posthog-sql', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, source }),
  })
  if (!r.ok) throw new Error(`posthog ${r.status}`)
  const data = await r.json()
  return (data.rows || []) as T[]
}

async function fetchSentryIssues(days: number): Promise<SentryIssue[]> {
  const r = await fetch('/api/admin/sentry-issues', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      organizationSlug: SENTRY_ORG,
      query: `is:unresolved firstSeen:-${days}d`,
      limit: 10,
    }),
  })
  if (!r.ok) return []
  const data = await r.json()
  return data.issues || []
}

async function fetchSentryCount(days: number): Promise<number> {
  const r = await fetch('/api/admin/sentry-events', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      organizationSlug: SENTRY_ORG,
      statsPeriod: `${days}d`,
      dataset: 'errors',
    }),
  })
  if (!r.ok) return 0
  const data = await r.json()
  return Number(data.count) || 0
}

function rangeLabel(d: number) {
  return d === 1 ? '24 hours' : `${d} days`
}

export default function HubClient() {
  const [days, setDays] = useState(7)
  const [tab, setTab] = useState<TabId>('overview')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [perProject, setPerProject] = useState<ProjectData[]>([])
  const [breakdown, setBreakdown] = useState<BreakdownRow[]>([])
  const [sentryCount, setSentryCount] = useState(0)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const projectResults = await Promise.all(
        PROJECTS.map(async (proj): Promise<ProjectData> => {
          const src = proj.source ?? 'shared'
          const [kpi, daily, geo, events] = await Promise.all([
            runSql<KpiRow>(projectKpiSql(proj, days), src).then((r) => r[0] || {}).catch(() => ({})),
            runSql<DailyRow>(projectDailySql(proj, days), src).catch(() => []),
            runSql<GeoRow>(projectGeoSql(proj, days), src).catch(() => []),
            runSql<EventRow>(projectEventsSql(proj, days, 20), src).catch(() => []),
          ])
          let sentry: SentryIssue[] | undefined
          if (proj.sentryProject) {
            sentry = await fetchSentryIssues(days).catch(() => [])
          }
          return { proj, kpi, daily, geo, events, sentry }
        })
      )
      const [breakdownRows, sCount] = await Promise.all([
        runSql<BreakdownRow>(breakdownSql(days)).catch(() => []),
        fetchSentryCount(days).catch(() => 0),
      ])
      setPerProject(projectResults)
      setBreakdown(breakdownRows)
      setSentryCount(sCount)
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
    } finally {
      setLoading(false)
    }
  }, [days])

  useEffect(() => {
    void load()
  }, [load])

  const totals = useMemo(() => {
    const totalEvents = perProject.reduce((s, p) => s + (Number(p.kpi.total_events) || 0), 0)
    const totalUsers = perProject.reduce((s, p) => s + (Number(p.kpi.active_users) || 0), 0)
    const totalSignups = perProject.reduce((s, p) => s + (Number(p.kpi.signups) || 0), 0)
    const liveCount = perProject.filter((p) => (Number(p.kpi.total_events) || 0) > 0).length
    const countries = new Set<string>()
    perProject.forEach((p) =>
      p.geo.forEach((g) => g.country && countries.add(g.country))
    )
    return {
      totalEvents,
      totalUsers,
      totalSignups,
      liveCount,
      countries: countries.size,
    }
  }, [perProject])

  const livePerProject = useMemo(() => {
    const live = new Set<ProjectId>()
    perProject.forEach((p) => {
      if ((Number(p.kpi.total_events) || 0) > 0) live.add(p.proj.id)
    })
    return live
  }, [perProject])

  return (
    <main className="min-h-screen bg-obsidian text-text-primary">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:py-8">
        <header className="mb-6 flex flex-wrap items-baseline justify-between gap-3 border-b border-border pb-4">
          <div>
            <h1 className="font-serif text-2xl text-text-primary">Project Data Hub</h1>
            <p className="mt-0.5 text-sm text-text-muted">
              PostHog + Sentry across {PROJECTS.length} projects · last {rangeLabel(days)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-mono text-[11px] uppercase tracking-widest text-text-muted">
              Range
            </label>
            <select
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value, 10))}
              className="min-h-9 rounded-md border border-border bg-surface px-2 py-1 text-sm text-text-primary focus:border-accent focus:outline-none"
            >
              <option value={1}>24 hours</option>
              <option value={7}>7 days</option>
              <option value={30}>30 days</option>
            </select>
            <button
              onClick={() => void load()}
              disabled={loading}
              className="min-h-9 rounded-md border border-border bg-surface px-3 py-1 text-sm text-text-primary hover:border-accent disabled:opacity-50"
            >
              {loading ? 'Loading…' : 'Refresh'}
            </button>
          </div>
        </header>

        <nav className="mb-5 flex gap-1 overflow-x-auto border-b border-border">
          <TabButton active={tab === 'overview'} onClick={() => setTab('overview')}>
            Overview
          </TabButton>
          {PROJECTS.map((p) => (
            <TabButton
              key={p.id}
              active={tab === p.id}
              onClick={() => setTab(p.id)}
              dot={livePerProject.has(p.id) ? 'live' : 'pending'}
            >
              {p.label}
            </TabButton>
          ))}
        </nav>

        {error && (
          <div className="mb-4 rounded-md border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
            Failed to load: {error}
          </div>
        )}

        {tab === 'overview' && (
          <Overview
            loading={loading}
            days={days}
            totals={totals}
            sentryCount={sentryCount}
            breakdown={breakdown}
            perProject={perProject}
          />
        )}

        {PROJECTS.map((p) => {
          if (tab !== p.id) return null
          const data = perProject.find((x) => x.proj.id === p.id)
          return (
            <ProjectPanel
              key={p.id}
              project={p}
              data={data}
              days={days}
              loading={loading}
            />
          )
        })}
      </div>
    </main>
  )
}

function TabButton({
  active,
  onClick,
  dot,
  children,
}: {
  active: boolean
  onClick: () => void
  dot?: 'live' | 'pending'
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`min-h-10 whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? 'border-accent text-text-primary'
          : 'border-transparent text-text-secondary hover:text-text-primary'
      }`}
    >
      {dot && (
        <span
          className={`mr-2 inline-block h-1.5 w-1.5 rounded-full align-middle ${
            dot === 'live' ? 'bg-accent' : 'bg-border-strong'
          }`}
        />
      )}
      {children}
    </button>
  )
}

function Overview({
  loading,
  days,
  totals,
  sentryCount,
  breakdown,
  perProject,
}: {
  loading: boolean
  days: number
  totals: {
    totalEvents: number
    totalUsers: number
    totalSignups: number
    liveCount: number
    countries: number
  }
  sentryCount: number
  breakdown: BreakdownRow[]
  perProject: ProjectData[]
}) {
  const unifiedFeed = useMemo(() => {
    const items: Array<EventRow & { project: string }> = []
    perProject.forEach((p) =>
      p.events.forEach((e) => items.push({ ...e, project: p.proj.label }))
    )
    return items.sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)).slice(0, 40)
  }, [perProject])

  const live = perProject.filter((p) => Number(p.kpi.total_events) > 0).map((p) => p.proj.label)
  const pending = perProject.filter((p) => Number(p.kpi.total_events) === 0).map((p) => p.proj.label)

  return (
    <div>
      <p className="mb-4 rounded-md border border-border bg-surface px-3 py-2 text-sm text-text-secondary">
        {loading
          ? 'Loading…'
          : `Tracking ${perProject.length} projects across PostHog (shared project + Sleeve's own). ` +
            (live.length ? `Live: ${live.join(', ')}. ` : '') +
            (pending.length ? `Pending: ${pending.join(', ')}. ` : '') +
            `Last ${days}d: ${pluralize(totals.totalUsers, 'user')}, ${pluralize(totals.totalEvents, 'event')}, ${pluralize(totals.totalSignups, 'signup')}.`}
      </p>

      <CardGrid>
        <Card label="Live projects" value={`${totals.liveCount} / ${perProject.length}`} sub="sending events" />
        <Card label="Active users" value={totals.totalUsers} sub={`across all apps · ${days}d`} />
        <Card label="Total events" value={totals.totalEvents} sub="all sources" />
        <Card label="Signups" value={totals.totalSignups} sub="across all apps" />
        <Card label="Sentry errors" value={sentryCount} sub="Dogleg" />
        <Card label="Countries" value={totals.countries} sub="with traffic" />
      </CardGrid>

      <div className="grid gap-4 md:grid-cols-2">
        <Section title="Per-app breakdown">
          {breakdown.length === 0 ? (
            <Muted>No tagged events yet.</Muted>
          ) : (
            <>
            <p className="mb-2 text-xs text-text-muted">
              Shared-project apps, split by <code className="rounded bg-surface-light px-1">app</code> tag. Sleeve runs in its own project, so it has a tab but isn&apos;t in this split.
            </p>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  <th className="pb-2">App</th>
                  <th className="pb-2">Users</th>
                  <th className="pb-2">Events</th>
                  <th className="pb-2">Signups</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((r) => {
                  const proj = PROJECTS.find((p) => p.id === r.app)
                  return (
                    <tr key={r.app} className="border-t border-border">
                      <td className="py-2">
                        <Pill tone="app">{r.app}</Pill>
                        <span className="ml-2 text-text-secondary">{proj?.label || r.app}</span>
                      </td>
                      <td className="py-2">{r.users}</td>
                      <td className="py-2">{r.events}</td>
                      <td className="py-2">{r.signups}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </>
          )}
        </Section>

        <Section title="Unified activity feed">
          {unifiedFeed.length === 0 ? (
            <Muted>No activity in this window.</Muted>
          ) : (
            <div className="max-h-[420px] overflow-y-auto">
              {unifiedFeed.map((it, idx) => (
                <FeedItem
                  key={idx}
                  event={it.event}
                  timestamp={it.timestamp}
                  country={it.country}
                  city={it.city}
                  device={it.device}
                  projectLabel={it.project}
                />
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}

function ProjectPanel({
  project,
  data,
  days,
  loading,
}: {
  project: Project
  data: ProjectData | undefined
  days: number
  loading: boolean
}) {
  if (loading && !data) {
    return <Muted>Loading {project.label}…</Muted>
  }
  if (!data) return null

  const total = Number(data.kpi.total_events) || 0
  const noData = total === 0

  return (
    <div>
      {noData ? (
        <div className="mb-4 rounded-md border border-border bg-surface px-4 py-3 text-sm text-text-secondary">
          <strong className="text-text-primary">{project.label}</strong> isn&apos;t
          sending events yet. Wired up in code; set the PostHog env var in
          deployment and this tab populates within a few minutes.
        </div>
      ) : (
        <CardGrid>
          <Card label="Active users" value={data.kpi.active_users || '0'} sub={`last ${days}d`} />
          <Card label="Total events" value={data.kpi.total_events || '0'} sub={project.stack} />
          <Card label="Signups" value={data.kpi.signups || '0'} sub="signup events" />
          <Card label="Error signals" value={data.kpi.error_signals || '0'} sub="rage + exceptions" />
          <Card label="Countries" value={data.geo.length} sub="with traffic" />
        </CardGrid>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Section title={`${project.label} — daily activity`}>
          {data.daily.length === 0 ? (
            <Muted>No daily data.</Muted>
          ) : (
            <Sparkline daily={data.daily} />
          )}
        </Section>

        <Section title="Top locations">
          {data.geo.length === 0 ? (
            <Muted>No location data yet.</Muted>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-mono text-[11px] uppercase tracking-widest text-text-muted">
                  <th className="pb-2"></th>
                  <th className="pb-2">Country</th>
                  <th className="pb-2">City</th>
                  <th className="pb-2">Users</th>
                  <th className="pb-2">Events</th>
                </tr>
              </thead>
              <tbody>
                {data.geo.map((r, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="py-2">{flagEmoji(r.country)}</td>
                    <td className="py-2">{r.country || '—'}</td>
                    <td className="py-2">{r.city && r.city !== 'None' ? r.city : '—'}</td>
                    <td className="py-2">{r.users}</td>
                    <td className="py-2 text-text-muted">{r.events}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Section>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Section title="Recent events">
          {data.events.length === 0 ? (
            <Muted>No events in this window yet.</Muted>
          ) : (
            <div className="max-h-[420px] overflow-y-auto">
              {data.events.map((e, i) => (
                <FeedItem
                  key={i}
                  event={e.event}
                  timestamp={e.timestamp}
                  country={e.country}
                  city={e.city}
                  device={e.device}
                  distinctId={e.distinct_id}
                />
              ))}
            </div>
          )}
        </Section>

        <Section
          title={project.sentryProject ? 'Sentry — recent issues' : 'Error tracking'}
        >
          {!project.sentryProject ? (
            <Muted>
              No Sentry project for {project.label}. PostHog{' '}
              <code className="rounded bg-surface-light px-1 text-xs">$exception</code> autocapture handles errors here.
            </Muted>
          ) : !data.sentry || data.sentry.length === 0 ? (
            <Muted>No unresolved issues in this window.</Muted>
          ) : (
            <div className="space-y-3">
              {data.sentry.map((i) => (
                <div key={i.id} className="border-b border-border pb-3 last:border-b-0">
                  <a
                    href={i.url}
                    target="_blank"
                    rel="noopener"
                    className="font-medium text-text-primary underline decoration-border underline-offset-4 hover:decoration-accent"
                  >
                    {i.title}
                  </a>
                  <div className="mt-1 text-xs text-text-muted">
                    <Pill tone="error">{i.id}</Pill>
                    {i.events && <> · {i.events} events</>}
                    {i.users && <> · {i.users} users</>}
                    {i.lastSeen && <> · last seen {i.lastSeen}</>}
                  </div>
                  {i.culprit && (
                    <div className="mt-1 text-xs text-text-muted">{i.culprit}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Section>
      </div>
    </div>
  )
}

function Sparkline({ daily }: { daily: DailyRow[] }) {
  const w = 600
  const h = 160
  const pad = 20
  const points = daily.map((r) => Number(r.users) || 0)
  const eventPoints = daily.map((r) => Number(r.events) || 0)
  const max = Math.max(1, ...points)
  const eventMax = Math.max(1, ...eventPoints)
  const x = (i: number) => pad + (i * (w - pad * 2)) / Math.max(1, points.length - 1)
  const yUsers = (v: number) => h - pad - (v / max) * (h - pad * 2)
  const yEvents = (v: number) => h - pad - (v / eventMax) * (h - pad * 2)
  const usersPath = points.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${yUsers(v)}`).join(' ')
  const eventsPath = eventPoints.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${yEvents(v)}`).join(' ')
  const fillPath = `${usersPath} L${x(points.length - 1)},${h - pad} L${x(0)},${h - pad} Z`

  return (
    <div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full">
        <path d={fillPath} fill="var(--accent)" fillOpacity={0.1} />
        <path d={usersPath} fill="none" stroke="var(--accent)" strokeWidth={1.5} />
        <path
          d={eventsPath}
          fill="none"
          stroke="var(--text-secondary)"
          strokeWidth={1}
          strokeDasharray="3 3"
        />
        {points.map((v, i) => (
          <circle key={i} cx={x(i)} cy={yUsers(v)} r={2} fill="var(--accent)" />
        ))}
      </svg>
      <div className="mt-2 flex gap-4 text-xs text-text-muted">
        <span>
          <span className="mr-1 inline-block h-0.5 w-3 align-middle" style={{ background: 'var(--accent)' }} />
          Users
        </span>
        <span>
          <span className="mr-1 inline-block h-0.5 w-3 align-middle" style={{ background: 'var(--text-secondary)' }} />
          Events
        </span>
      </div>
    </div>
  )
}

function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{children}</div>
  )
}

function Card({
  label,
  value,
  sub,
}: {
  label: string
  value: string | number
  sub?: string
}) {
  return (
    <div className="rounded-lg border border-border bg-surface p-3">
      <div className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
        {label}
      </div>
      <div className="mt-1 font-serif text-xl text-text-primary">{value}</div>
      {sub && <div className="mt-0.5 text-xs text-text-muted">{sub}</div>}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-surface p-4">
      <h2 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-text-muted">
        {title}
      </h2>
      {children}
    </div>
  )
}

function Muted({ children }: { children: React.ReactNode }) {
  return <div className="text-sm text-text-muted">{children}</div>
}

function Pill({
  tone,
  children,
}: {
  tone: 'app' | 'error' | 'signup' | 'event'
  children: React.ReactNode
}) {
  const styles =
    tone === 'app'
      ? 'border-border-strong text-text-secondary'
      : tone === 'error'
        ? 'border-danger/40 text-danger'
        : tone === 'signup'
          ? 'border-accent/40 text-accent-light'
          : 'border-border text-text-secondary'
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${styles}`}
    >
      {children}
    </span>
  )
}

function FeedItem({
  event,
  timestamp,
  country,
  city,
  device,
  distinctId,
  projectLabel,
}: {
  event: string
  timestamp: string
  country?: string
  city?: string
  device?: string
  distinctId?: string
  projectLabel?: string
}) {
  const kind = eventKind(event)
  const tone = kind === 'signup' ? 'signup' : kind === 'error' ? 'error' : 'event'
  return (
    <div className="flex gap-3 border-b border-border py-2 last:border-b-0">
      <div className="w-16 shrink-0 text-xs text-text-muted">{timeAgo(timestamp)}</div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-1.5">
          <Pill tone={tone}>{event}</Pill>
          {projectLabel && <Pill tone="app">{projectLabel}</Pill>}
        </div>
        <div className="mt-0.5 text-xs text-text-muted">
          {country && `${flagEmoji(country)} `}
          {city && city !== 'None' ? `${city}, ` : ''}
          {country || ''}
          {device ? ` · ${device}` : ''}
          {distinctId ? ` · ${distinctId.slice(0, 8)}` : ''}
        </div>
      </div>
    </div>
  )
}
