import HubClient from './HubClient'

export const metadata = {
  title: 'Project Data Hub',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <HubClient />
}
