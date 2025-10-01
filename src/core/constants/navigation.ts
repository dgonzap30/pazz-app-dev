import type { LucideIcon } from 'lucide-react';
import {
  Home,
  ClipboardList,
  Car,
  FileText,
  Settings,
} from 'lucide-react';

/**
 * Navigation item interface for consistent typing across components
 */
export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: number | string;
}

/**
 * Main navigation items used for both desktop and mobile navigation
 */
export const NAV_ITEMS: NavItem[] = [
  {
    id: 'home',
    label: 'Inicio',
    icon: Home,
    path: '/dashboard'
  },
  {
    id: 'seguimiento',
    label: 'Seguimiento',
    icon: ClipboardList,
    path: '/seguimiento'
  },
  {
    id: 'leasing',
    label: 'Leasing',
    icon: Car,
    path: '/leasing'
  },
  {
    id: 'billing',
    label: 'Facturación',
    icon: FileText,
    path: '/billing'
  },
  {
    id: 'settings',
    label: 'Ajustes',
    icon: Settings,
    path: '/settings'
  },
];

/**
 * Sub-routes mapping for nested navigation
 */
export const SUB_ROUTES_MAP: Record<string, { [key: string]: string }> = {
  home: {
    '/dashboard': 'dashboard',
  },
  billing: {
    '/billing': 'facturas',
    '/billing/facturas': 'facturas',
    '/billing/pagos': 'pagos',
    '/billing/historial': 'historial',
    '/billing/gestion': 'gestion',
    '/billing/reportes': 'reportes',
  }
};

/**
 * Get active navigation item based on current path
 */
export function getActiveNavItem(pathname: string, items: NavItem[]): string {
  // Account is a separate feature - no nav item should be active
  if (pathname.startsWith('/account')) return '';

  // Check for exact matches first
  const exactMatch = items.find(item => item.path === pathname);
  if (exactMatch) return exactMatch.id;

  // Check for partial matches (for nested routes)
  if (pathname.startsWith('/dashboard')) return 'home';
  if (pathname.startsWith('/seguimiento')) return 'seguimiento';
  if (pathname.startsWith('/leasing')) return 'leasing';
  if (pathname.startsWith('/billing')) return 'billing';
  if (pathname.startsWith('/settings')) return 'settings';

  return 'home';
}