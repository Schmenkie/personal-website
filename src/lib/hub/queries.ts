import type { ProjectId } from './projects'

export const projectKpiSql = (appId: ProjectId, days: number) => `
SELECT
  uniq(distinct_id) AS active_users,
  count() AS total_events,
  countIf(event LIKE '%signup%' OR event LIKE '%signed_up%') AS signups,
  countIf(event = '$rageclick' OR event = '$exception') AS error_signals
FROM events
WHERE timestamp > now() - INTERVAL ${days} DAY
  AND properties.app = '${appId}'
LIMIT 1`

export const projectDailySql = (appId: ProjectId, days: number) => `
SELECT
  toDate(timestamp) AS day,
  uniq(distinct_id) AS users,
  count() AS events
FROM events
WHERE timestamp > now() - INTERVAL ${days} DAY
  AND properties.app = '${appId}'
GROUP BY day
ORDER BY day ASC
LIMIT 100`

export const projectGeoSql = (appId: ProjectId, days: number) => `
SELECT
  properties.$geoip_country_code AS country,
  properties.$geoip_city_name AS city,
  uniq(distinct_id) AS users,
  count() AS events
FROM events
WHERE timestamp > now() - INTERVAL ${days} DAY
  AND properties.app = '${appId}'
  AND properties.$geoip_country_code IS NOT NULL
GROUP BY country, city
ORDER BY users DESC, events DESC
LIMIT 10`

export const projectEventsSql = (appId: ProjectId, days: number, limit = 20) => `
SELECT
  event,
  timestamp,
  distinct_id,
  properties.$geoip_country_code AS country,
  properties.$geoip_city_name AS city,
  properties.$device_type AS device
FROM events
WHERE timestamp > now() - INTERVAL ${days} DAY
  AND properties.app = '${appId}'
  AND event NOT IN ('Application Backgrounded','Application Became Active','$set','$identify')
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
GROUP BY app
ORDER BY events DESC
LIMIT 20`
