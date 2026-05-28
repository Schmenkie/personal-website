export type KpiRow = {
  active_users?: string
  total_events?: string
  signups?: string
  error_signals?: string
}

export type DailyRow = { day: string; users: string; events: string }

export type GeoRow = { country: string; city: string; users: string; events: string }

export type EventRow = {
  event: string
  timestamp: string
  distinct_id: string
  country?: string
  city?: string
  device?: string
}

export type BreakdownRow = {
  app: string
  users: string
  events: string
  signups: string
}

export type SentryIssue = {
  id: string
  url: string
  title: string
  events: string
  users: string
  lastSeen: string
  culprit: string
}
