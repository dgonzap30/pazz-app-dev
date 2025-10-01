import { useState, useEffect } from 'react';
import { MessageCircle, Globe, type LucideIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { NAV_ITEMS, getActiveNavItem, type NavItem } from '@/core/constants/navigation';
import { UserMenu } from './UserMenu';
import { NotificationDropdown } from './NotificationDropdown';
import { PazzLogo } from '@/ui/pazz-logo';
import { cn } from '@/core/utils/cn';

// Use navigation items from centralized constants
const navItems = NAV_ITEMS;

// Navigation button component - clean, professional design
const NavButton = ({ 
  label, 
  icon: Icon, 
  isActive, 
  onClick 
}: Omit<NavItem, 'id' | 'path'> & { 
  isActive: boolean; 
  onClick: () => void;
}) => (
  <button
    aria-current={isActive ? 'page' : undefined}
    aria-label={label}
    onClick={onClick}
    className={cn(
      "relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-150",
      "focus-visible:ring-2 focus-visible:ring-[#FF7A00]/40 focus-visible:ring-offset-2 outline-none",
      "min-h-[44px] min-w-[44px]", // Ensure minimum touch target
      isActive
        ? "bg-white text-[#FF7A00] font-semibold shadow-sm"
        : "text-slate-600 hover:text-slate-800 hover:bg-white/50"
    )}
  >
    <Icon className="w-6 h-6 transition-all duration-150" />
    <span className="hidden sm:block text-sm">{label}</span>
    {/* Mobile: Show label on active state only */}
    <span className={cn(
      "sm:hidden text-xs",
      isActive ? "block" : "hidden"
    )}>{label}</span>
  </button>
);

// Utility icon component - larger and more accessible
const UtilityIcon = ({ 
  icon: Icon, 
  ariaLabel,
  onClick 
}: { 
  icon: LucideIcon; 
  ariaLabel: string;
  onClick?: () => void;
}) => (
  <button
    aria-label={ariaLabel}
    onClick={onClick}
    className={cn(
      "flex items-center justify-center w-11 h-11 rounded-lg",
      "text-slate-600 hover:text-slate-800 hover:bg-white/50",
      "transition-all duration-150",
      "focus-visible:ring-2 focus-visible:ring-[#FF7A00]/40 focus-visible:ring-offset-2 outline-none"
    )}
  >
    <Icon className="w-6 h-6" />
  </button>
);

interface MainNavbarProps {
  leftElement?: React.ReactNode;
}

export const MainNavbar = ({ leftElement }: MainNavbarProps = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll visibility handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Get active nav item based on current route
  const getActiveNav = () => {
    return getActiveNavItem(location.pathname, navItems);
  };

  return (
    <nav 
      className={cn(
        "relative flex items-center h-20 px-4 sm:px-6 bg-[#F6F1ED]",
        "border-b border-[#E2E0DD] transition-transform duration-250 shrink-0",
        isVisible ? "translate-y-0" : "-translate-y-full"
      )}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Left side - Logo with optional left element */}
      <div className="flex items-center gap-3 min-w-0">
        {leftElement}
        <button
          onClick={() => navigate('/dashboard')}
          className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8553] focus-visible:ring-offset-2 rounded-lg transition-transform hover:scale-105 active:scale-95"
          aria-label="Ir al dashboard principal"
        >
          <PazzLogo size="md" />
        </button>
      </div>
      
      {/* Navigation buttons - Centered */}
      <div className="flex-1 flex justify-center">
        <div className="flex items-center gap-1 sm:gap-2 bg-white/30 rounded-xl p-1">
          {navItems.map(item => (
            <NavButton 
              key={item.id} 
              {...item} 
              isActive={getActiveNav() === item.id}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      </div>
      
      {/* Utility icons and user menu */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="hidden sm:flex items-center gap-2">
          <UtilityIcon icon={MessageCircle} ariaLabel="Mensajes" />
          <UtilityIcon icon={Globe} ariaLabel="Idioma" />
        </div>
        <NotificationDropdown />
        <UserMenu />
      </div>
    </nav>
  );
};