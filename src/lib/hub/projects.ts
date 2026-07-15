export type ProjectId =
  | 'linkup_golf'
  | 'sleeve'
  | 'soundsauce'
  | 'leadhawk'
  | 'personal_website'
  | 'job_scout'

// Which PostHog project a project's events live in.
// 'shared' = the cross-product project (310428) where every event is tagged
//   `properties.app = '<ProjectId>'`. Most projects live here.
// 'sleeve' = Sleeve's own dedicated project (473290, org "Sleeve Inc."). It is
//   queried whole — Sleeve does NOT tag `properties.app`, so its queries drop the
//   app filter and hit a different project id + personal API key (see route.ts).
export type PosthogSource = 'shared' | 'sleeve'

export type Project = {
  id: ProjectId
  label: string
  stack: string
  /** Defaults to 'shared' when omitted. */
  source?: PosthogSource
  sentryProject?: string
  keyEvents: string[]
}

export const PROJECTS: Project[] = [
  {
    // `id` and `sentryProject` are the live telemetry join keys — the app still
    // tags `properties.app = 'linkup_golf'` and reports to the `linkup-golf`
    // Sentry org, even after the Dogleg rebrand. Only the display `label` moves.
    id: 'linkup_golf',
    label: 'Dogleg',
    stack: 'React Native',
    sentryProject: 'react-native',
    keyEvents: ['signup_completed', 'round_completed', 'round_card_shared'],
  },
  {
    id: 'sleeve',
    label: 'Sleeve',
    stack: 'Expo / RN',
    source: 'sleeve',
    keyEvents: ['signup_completed', 'album_rated', 'spins_opened', 'list_created', 'user_followed'],
  },
  {
    id: 'soundsauce',
    label: 'SoundSauce',
    stack: 'Vite + React',
    keyEvents: ['user_signed_up', 'audio_uploaded', 'analysis_completed', 'recipe_published', 'checkout_started'],
  },
  {
    id: 'leadhawk',
    label: 'LeadHawk',
    stack: 'Cloudflare Workers',
    keyEvents: ['$pageview', '$autocapture'],
  },
  {
    id: 'personal_website',
    label: 'Personal Site',
    stack: 'Next.js',
    keyEvents: ['$pageview'],
  },
  {
    id: 'job_scout',
    label: 'JobSearch',
    stack: 'Node CLI',
    keyEvents: ['scout_run_started', 'jobs_found', 'digest_sent'],
  },
]

export const SENTRY_ORG = 'linkup-golf'
