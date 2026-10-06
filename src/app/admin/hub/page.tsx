import HubClient from './HubClient'
import { SiteHeader } from '@/components/minimal/site-header'

export const metadata = {
  title: 'Data hub · Spencer Curnow',
  robots: { index: false, follow: false },
}

export default function Page() {
  return (
    <div className="minimal hub flex min-h-dvh flex-col px-4 py-3.5">
      <SiteHeader />
      <HubClient />
    </div>
  )
}
