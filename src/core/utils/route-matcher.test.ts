import { describe, it, expect } from 'vitest';
import { matchSubRoute } from './route-matcher';

describe('matchSubRoute', () => {
  describe('learn route special case', () => {
    const routes = {
      '/dashboard/resources/cursos': 'cursos',
      '/dashboard/resources/webinars': 'webinars',
      '/dashboard/resources/shorts': 'shorts',
      '/dashboard/resources': 'recursos',
    };

    it('returns recursos for exact /dashboard/resources path', () => {
      expect(matchSubRoute('/dashboard/resources', routes)).toBe('recursos');
    });

    it('returns cursos for curso paths', () => {
      expect(matchSubRoute('/dashboard/resources/cursos', routes)).toBe('cursos');
      expect(matchSubRoute('/dashboard/resources/cursos/123', routes)).toBe('cursos');
    });

    it('returns webinars for webinar paths', () => {
      expect(matchSubRoute('/dashboard/resources/webinars', routes)).toBe('webinars');
      expect(matchSubRoute('/dashboard/resources/webinars/456', routes)).toBe('webinars');
    });

    it('returns shorts for shorts paths', () => {
      expect(matchSubRoute('/dashboard/resources/shorts', routes)).toBe('shorts');
      expect(matchSubRoute('/dashboard/resources/shorts/789', routes)).toBe('shorts');
    });

    it('returns empty string for non-matching paths', () => {
      expect(matchSubRoute('/dashboard/resources/unknown', routes)).toBe('recursos'); // matches /dashboard/resources
      expect(matchSubRoute('/dashboard/something', routes)).toBe(''); // no match
    });
  });

  describe('generic route matching', () => {
    const routes = {
      '/dashboard/clients/details': 'details',
      '/dashboard/clients/add': 'add',
      '/dashboard/clients': 'list',
    };

    it('matches exact paths', () => {
      expect(matchSubRoute('/dashboard/clients', routes)).toBe('list');
      expect(matchSubRoute('/dashboard/clients/add', routes)).toBe('add');
    });

    it('matches nested paths to longest prefix', () => {
      expect(matchSubRoute('/dashboard/clients/details/123', routes)).toBe('details');
      expect(matchSubRoute('/dashboard/clients/add/form', routes)).toBe('add');
    });

    it('returns empty string when no match found', () => {
      expect(matchSubRoute('/other/path', routes)).toBe('');
      expect(matchSubRoute('/dashboard', routes)).toBe('');
    });

    it('prioritizes longer paths over shorter ones', () => {
      const priorityRoutes = {
        '/a': 'short',
        '/a/b': 'medium',
        '/a/b/c': 'long',
      };
      
      expect(matchSubRoute('/a/b/c/d', priorityRoutes)).toBe('long');
      expect(matchSubRoute('/a/b/d', priorityRoutes)).toBe('medium');
      expect(matchSubRoute('/a/d', priorityRoutes)).toBe('short');
    });
  });

  describe('edge cases', () => {
    it('handles empty routes object', () => {
      expect(matchSubRoute('/any/path', {})).toBe('');
    });

    it('handles trailing slashes consistently', () => {
      const routes = {
        '/dashboard/test': 'test',
      };
      
      expect(matchSubRoute('/dashboard/test/', routes)).toBe('test');
      expect(matchSubRoute('/dashboard/test/sub', routes)).toBe('test');
    });
  });
});