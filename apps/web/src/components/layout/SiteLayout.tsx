import { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { AnnouncementBar } from './AnnouncementBar';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';

export function SiteLayout() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }
    const target = document.getElementById(hash.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <div className="flex min-h-screen flex-col bg-cream text-espresso">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-espresso focus:px-4 focus:py-2 focus:text-sm focus:text-cream"
      >
        Skip to main content
      </a>
      <AnnouncementBar />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <ScrollRestoration />
    </div>
  );
}
