import { describe, it, expect } from 'vitest';
import {
  NAV_ITEMS,
  getActiveNavItem,
  type NavItem,
} from './navigation';

describe('Navigation Constants', () => {
  describe('NAV_ITEMS', () => {
    it('contains all 5 required navigation items', () => {
      expect(NAV_ITEMS).toHaveLength(5);
    });

    it('has correct navigation items in order', () => {
      const ids = NAV_ITEMS.map(item => item.id);
      expect(ids).toEqual(['home', 'seguimiento', 'leasing', 'billing', 'settings']);
    });

    it('each item has required properties', () => {
      NAV_ITEMS.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('label');
        expect(item).toHaveProperty('icon');
        expect(item).toHaveProperty('path');
        expect(typeof item.id).toBe('string');
        expect(typeof item.label).toBe('string');
        expect(typeof item.path).toBe('string');
      });
    });

    it('has correct paths for each item', () => {
      const pathMap: Record<string, string> = {
        home: '/dashboard',
        seguimiento: '/seguimiento',
        leasing: '/leasing',
        billing: '/billing',
        settings: '/settings',
      };

      NAV_ITEMS.forEach(item => {
        expect(item.path).toBe(pathMap[item.id]);
      });
    });
  });


  describe('getActiveNavItem', () => {
    const items: NavItem[] = NAV_ITEMS;

    it('returns exact match for root paths', () => {
      expect(getActiveNavItem('/dashboard', items)).toBe('home');
      expect(getActiveNavItem('/seguimiento', items)).toBe('seguimiento');
      expect(getActiveNavItem('/leasing', items)).toBe('leasing');
      expect(getActiveNavItem('/billing', items)).toBe('billing');
      expect(getActiveNavItem('/settings', items)).toBe('settings');
    });

    it('returns correct item for nested paths', () => {
      expect(getActiveNavItem('/dashboard/clients', items)).toBe('home');
      expect(getActiveNavItem('/seguimiento/clientes', items)).toBe('seguimiento');
      expect(getActiveNavItem('/leasing/vehiculos', items)).toBe('leasing');
      expect(getActiveNavItem('/billing/invoices', items)).toBe('billing');
      expect(getActiveNavItem('/settings/profile', items)).toBe('settings');
    });

    it('defaults to home for unknown paths', () => {
      expect(getActiveNavItem('/unknown', items)).toBe('home');
      expect(getActiveNavItem('/random/path', items)).toBe('home');
      expect(getActiveNavItem('/', items)).toBe('home');
    });
  });
});