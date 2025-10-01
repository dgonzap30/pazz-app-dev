import React, { useEffect, useState } from 'react';
import { MainNavbar } from './MainNavbar';
import { Header } from './Header';
import { BottomNavBar } from './BottomNavBar';
import { cn } from '@/core';
import { Outlet } from 'react-router-dom';
import { PazzLogo } from '@/ui/pazz-logo';
import { useIsMobile } from '@/core/hooks';

interface AppLayoutProps {
  title?: string;
  description?: string;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  title = 'Panel Partner+ PAZZ',
  description = 'Gestiona tu negocio como Partner de PAZZ',
  className = '',
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [headerRightElement, setHeaderRightElement] = useState<React.ReactNode>(null);
  const isMobile = useIsMobile();

  // Set mounted state for client-side only components
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }
  }, [title, description]);

  // Show loading skeleton during initial hydration
  if (!isMounted) {
    return (
      <div className="h-screen flex flex-col bg-white overflow-hidden">
        <div className="relative z-20 shadow-sm">
          <div className="relative flex items-center h-20 px-6 bg-[#F6F1ED] border-b border-slate-200/50">
            <div className="flex items-center gap-3 min-w-0">
              <PazzLogo size="md" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex gap-2">
                <div className="w-24 h-12 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="w-24 h-12 bg-slate-200 rounded-lg animate-pulse"></div>
                <div className="w-24 h-12 bg-slate-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-10 h-10 bg-slate-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto pt-8 px-6 bg-white">
            <div className="space-y-4">
              <div className="h-8 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-64 bg-slate-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Navigation - Responsive */}
      {isMobile ? (
        <Header sticky={true} rightElement={headerRightElement} />
      ) : (
        <div className="relative z-20 shadow-sm">
          <MainNavbar />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        <main className={cn(
          'flex-1 transition-all duration-200 ease-in-out',
          'overflow-y-auto overflow-x-hidden scroll-smooth',
          isMobile ? 'touch-scroll' : '',
          !isMobile ? 'pt-4 px-6 bg-white' : 'px-4',
          className
        )}>
          <div className={cn(
            isMobile ? 'min-h-0 pb-[var(--nav-bottom-height-safe)]' : 'h-full'
          )}>
            <Outlet context={{ setHeaderRightElement }} />
          </div>
        </main>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      {isMobile && (
        <BottomNavBar hideOnScroll={false} />
      )}
    </div>
  );
};
