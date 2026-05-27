'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';

// Initializes PostHog once on the client. The shared LinkUp Golf project key
// is read from NEXT_PUBLIC_POSTHOG_KEY; every event is tagged with
// `app: 'personal_website'` so the multi-project data hub can filter by app.
if (typeof window !== 'undefined' && !posthog.__loaded) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (key) {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: false, // we send these manually below so SPA navigation is tracked
      capture_pageleave: true,
      loaded: (ph) => {
        if (navigator.doNotTrack === '1') ph.opt_out_capturing();
      },
    });
    posthog.register({ app: 'personal_website' });
  }
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname) return;
    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    posthog.capture('$pageview', { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PageviewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
