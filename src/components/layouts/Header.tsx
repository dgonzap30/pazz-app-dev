import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { cn } from '@/core/utils/cn';
import { PazzLogo } from '@/ui/pazz-logo';
import { UserMenu } from './UserMenu';

interface HeaderProps {
  className?: string;
  showLogo?: boolean;
  sticky?: boolean;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  className,
  showLogo = true,
  sticky = true,
  leftElement,
  rightElement,
}) => {
  const navigate = useNavigate();
  const [hasNotifications, setHasNotifications] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotificationClick = () => {
    // TODO: Navigate to notifications or open notification panel
    setHasNotifications(false);
  };

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <header
      className={cn(
        'app-header',
        'bg-white border-b border-[#E7EBEF] transition-shadow duration-200',
        sticky && 'sticky top-0 z-[1020]',
        isScrolled && 'shadow-sm',
        className
      )}
      style={{
        height: 'var(--nav-header-height)',
      }}
    >
      <div className="app-header-content flex items-center justify-between w-full px-4 md:px-6">
        {/* Left section */}
        <div className="app-header-left flex items-center gap-3">
          {leftElement}
          {showLogo && (
            <button
              onClick={handleLogoClick}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF7A30] focus-visible:ring-offset-2 rounded-lg transition-transform hover:scale-105 active:scale-95"
              aria-label="Ir al inicio"
            >
              <PazzLogo size="md" className="h-8 w-auto" />
            </button>
          )}
        </div>

        {/* Right section */}
        <div className="app-header-right flex items-center gap-2">
          {rightElement}
          
          {/* Notification Bell */}
          <button
            onClick={handleNotificationClick}
            className={cn(
              'relative flex items-center justify-center w-10 h-10 rounded-lg',
              'text-slate-600 hover:text-slate-800 hover:bg-gray-50',
              'transition-all duration-150',
              'focus-visible:ring-2 focus-visible:ring-[#FF7A30]/40 focus-visible:ring-offset-2 outline-none'
            )}
            aria-label="Notificaciones"
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* User Menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

