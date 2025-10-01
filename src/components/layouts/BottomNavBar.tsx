import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/core/utils/cn';
import { useIsMobile } from '@/core/hooks/useIsMobile';
import { NAV_ITEMS, getActiveNavItem, type NavItem } from '@/core/constants/navigation';

// Use navigation items from centralized constants
const navItems = NAV_ITEMS;

interface BottomNavBarProps {
  className?: string;
  hideOnScroll?: boolean;
  showOnDesktop?: boolean;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  className,
  hideOnScroll = false,
  showOnDesktop = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll visibility
  useEffect(() => {
    if (!hideOnScroll) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Hide when scrolling down
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, hideOnScroll]);

  // Don't render on desktop unless explicitly requested
  if (!isMobile && !showOnDesktop) {
    return null;
  }

  // Determine active nav item based on current route
  const getActiveNav = () => {
    return getActiveNavItem(location.pathname, navItems);
  };

  const activeNavId = getActiveNav();

  const navItemsRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleNavClick = (item: NavItem) => {
    // Add haptic feedback if available (for native mobile apps)
    if ('vibrate' in navigator && isMobile) {
      navigator.vibrate(10);
    }
    
    navigate(item.path);
  };

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      let targetIndex: number | null = null;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          targetIndex = currentIndex === 0 ? navItems.length - 1 : currentIndex - 1;
          break;
        case 'ArrowRight':
          e.preventDefault();
          targetIndex = currentIndex === navItems.length - 1 ? 0 : currentIndex + 1;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleNavClick(navItems[currentIndex]);
          return;
        default:
          return;
      }

      if (targetIndex !== null && navItemsRefs.current[targetIndex]) {
        navItemsRefs.current[targetIndex]?.focus();
      }
    },
    [navItems]
  );

  return (
    <nav
      className={cn(
        'bottom-nav',
        'fixed bottom-0 left-0 right-0',
        'bg-white border-t border-gray-200',
        'transition-transform duration-200',
        !isVisible && 'translate-y-full',
        !showOnDesktop && 'md:hidden',
        className
      )}
      style={{
        height: 'var(--nav-bottom-height-safe)',
        zIndex: 'var(--z-index-bottom-nav)',
      }}
      role="navigation"
      aria-label="Navegación principal"
    >
      <ul className="bottom-nav-list flex items-center justify-around w-full h-[var(--nav-bottom-height)] px-2">
        {navItems.map((item, index) => (
          <li key={item.id} className="bottom-nav-item flex-1 flex items-center justify-center">
            <button
              ref={(el) => navItemsRefs.current[index] = el}
              onClick={() => handleNavClick(item)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={activeNavId === item.id ? 0 : -1}
              className={cn(
                'bottom-nav-button',
                'flex flex-col items-center justify-center gap-1',
                'px-3 py-2',
                'min-h-[var(--nav-tap-target)]',
                'transition-all duration-[180ms] ease-out',
                'relative group',
                'motion-reduce:transition-none',
                'active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/40',
                'bottom-nav-button--underline',
                activeNavId === item.id ? [
                  'text-primary',
                ] : [
                  'text-slate-600',
                  'hover:text-slate-700',
                ]
              )}
              aria-current={activeNavId === item.id ? 'page' : undefined}
              aria-label={item.label}
            >
              <item.icon 
                className={cn(
                  'bottom-nav-icon w-6 h-6 transition-transform duration-[180ms]',
                  'motion-reduce:transition-none',
                  activeNavId === item.id && 'transform -translate-y-[2px]'
                )}
              />
              <span 
                className={cn(
                  'bottom-nav-label text-xs transition-all duration-[180ms]',
                  'motion-reduce:transition-none',
                  activeNavId === item.id ? 'font-bold' : 'font-medium'
                )}
              >
                {item.label}
              </span>
              
              {/* Badge/Notification */}
              {item.badge && (
                <span className="bottom-nav-badge absolute top-2 right-[calc(50%-0.75rem)]">
                  {item.badge}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};


