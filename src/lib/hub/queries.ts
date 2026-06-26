import type { Project } from './projects'

// Cloud-provider data-center cities that show up as fake "users" — scrapers,
// uptime monitors, AI crawlers, security scanners. Council Bluffs (Google),
// Boardman (AWS us-east-2), Warsaw (European VPS hub) are the persistent
// offenders. Add more if you see a city spike with identical UAs and `/`-only
// pageviews.
const BOT_CITIES = ['Council Bluffs', 'Boardman', 'Warsaw']
const BOT_CITY_FILTER = `AND (properties.$geoip_city_name IS NULL OR properties.$geoip_city_name NOT IN (${BOT_CITIES.map((c) => `'${c}'`).join(', ')}))`

// Projects on the 'shared' PostHog project are isolated by `properties.app`.
// Projects with their own PostHog project (source !== 'shared') own the whole
// project, so no app filter is applied — the route handler points the query at
// the right project id + key instead.
const appFilter = (proj: Project) =>
  (proj.source ?? 'shared') === 'shared' ? `AND properties.app = '${proj.id}'` : ''

export const projectKpiSql = (proj: Project, days: number) => `
SELECT
  uniq(distinct_id) AS active_users,
  count() AS total_events,
  countIf(event LIKE '%signup%' OR event LIKE '%signed_up%') AS signups,
  countIf(event = '$rageclick' OR event = '$exception') AS error_signals
FROM events
WHERE timestamp > now() - INTERVAL ${days} DAY
  ${appFilter(proj)}
  ${BOT_CITY_FILTER}
LIMIT 1`

export const projectDailySql = (proj: Project, days: number) => `
SELECT
  toDate(timestamp) AS day,
  uniq(distinct_id) AS users,
  count() AS events
FROM events
WHERE timestamp > now() - INTERVAL ${days} DAY
  ${appFilter(proj)}
  ${BOT_CITY_FILTER}
GROUP BY day
ORDER BY day ASC
LIMIT 100`

export const projectGeoSql = (proj: Project, days: number) => `
SELECT
  properties.$geoip_country_code AS country,
  properties.$geoip_city_name AS city,
  uniq(distinct_id) AS users,
  count() AS events
FROM events
WHERE timestamp > now() - INTERVAL ${days} DAY
  ${appFilter(proj)}
  AND properties.$geoip_country_code IS NOT NULL
  ${BOT_CITY_FILTER}
GROUP BY country, city
ORDER BY users DESC, events DESC
LIMIT 10`

export const projectEventsSql = (proj: Project, days: number, limit = 20) => `
SELECT
  event,
  timestamp,
  distinct_id,
  properties.$geoip_country_code AS country,
  properties.$geoip_city_name AS city,
  properties.$device_type AS device
FROM events
WHERE timestamp > now() - INTERVAL ${days} DAY
  ${appFilter(proj)}
  AND event NOT IN ('Application Backgrounded','Application Became Active','$set','$identify')
  ${BOT_CITY_FILTER}
ORDER BY timestamp DESC
LIMIT ${limit}`

export const breakdownSql = (days: number) => `
SELECT
  properties.app AS app,
  uniq(distinct_id) AS users,
  count() AS events,
  countIf(event LIKE '%signup%' OR event LIKE '%signed_up%') AS signups
FROM events
WHERE timestamp > now() - INTERVAL ${days} DAY
  AND properties.app IS NOT NULL
  ${BOT_CITY_FILTER}
GROUP BY app
ORDER BY events DESC
LIMIT 20`
