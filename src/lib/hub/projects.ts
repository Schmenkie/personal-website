export type ProjectId =
  | 'linkup_golf'
  | 'soundsauce'
  | 'leadhawk'
  | 'personal_website'
  | 'job_scout'

export type Project = {
  id: ProjectId
  label: string
  stack: string
  sentryProject?: string
  keyEvents: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'linkup_golf',
    label: 'LinkUp Golf',
    stack: 'React Native',
    sentryProject: 'react-native',
    keyEvents: ['signup_completed', 'round_completed', 'tee_time_posted', 'trip_created', 'message_sent'],
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
