/**
 * Matches a path to a sub-route value based on route configuration
 * Uses generic matching for all routes
 */
export const matchSubRoute = (
  path: string,
  routes: Record<string, string>
): string => {
  // Generic route matching for all paths
  const sortedRoutes = Object.entries(routes)
    .sort(([a], [b]) => b.length - a.length);
  
  for (const [route, value] of sortedRoutes) {
    if (path.startsWith(route)) {
      return value;
    }
  }
  
  return '';
};