import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SUB_ROUTES_MAP } from '@/core/constants/navigation';
import { matchSubRoute } from '@/core/utils';

/**
 * Custom hook to manage navigation state based on current route
 */
export function useNavigation() {
  const location = useLocation();
  
  // Initialize state based on current path
  const getInitialActiveMain = () => {
    const path = location.pathname;

    if (path.startsWith('/seguimiento')) return 'seguimiento';
    if (path.startsWith('/leasing')) return 'leasing';
    if (path.startsWith('/billing')) return 'billing';
    if (path.startsWith('/settings')) return 'settings';
    if (path.startsWith('/dashboard')) return 'home';

    // Standalone pages (account, onboarding, etc.) have no activeMain
    return '';
  };
  
  const [activeMain, setActiveMain] = useState(getInitialActiveMain);
  const [activeSub, setActiveSub] = useState('');

  useEffect(() => {
    const path = location.pathname;

    // Determine active main navigation item
    let newActiveMain = '';

    // Routes with sub-navigation
    if (path.startsWith('/seguimiento')) {
      newActiveMain = 'seguimiento';
    } else if (path.startsWith('/leasing')) {
      newActiveMain = 'leasing';
    } else if (path.startsWith('/billing')) {
      newActiveMain = 'billing';
    } else if (path.startsWith('/settings')) {
      newActiveMain = 'settings';
    } else if (path.startsWith('/dashboard')) {
      newActiveMain = 'home';
    }
    // Standalone pages (account, onboarding, etc.) should have no activeMain
    // This prevents sub-navigation from showing on these pages

    setActiveMain(newActiveMain);

    // Determine active sub-navigation item using the new utility
    if (newActiveMain && SUB_ROUTES_MAP[newActiveMain]) {
      const subRoutes = SUB_ROUTES_MAP[newActiveMain];
      const newActiveSub = matchSubRoute(path, subRoutes);
      setActiveSub(newActiveSub);
    } else {
      setActiveSub('');
    }
  }, [location.pathname]);

  return {
    activeMain,
    activeSub,
    setActiveMain,
    setActiveSub,
  };
}