/**
 * Application Routes Configuration
 * Defines all navigable pages and their corresponding paths.
 */
export const routes = [
  {
    path: '/',
    name: 'Home',
    file: 'index.html'
  },
  {
    path: '/contact',
    name: 'Contact Us',
    file: 'contact.html'
  }
];

/**
 * Resolves a route object based on the given path.
 * @param {string} path - The URL path to resolve.
 * @returns {object|null} The matching route object or null.
 */
export function resolveRoute(path) {
  return routes.find(route => route.path === path) || null;
}

/**
 * Generates the full URL for a given route path.
 * @param {string} path - The route path.
 * @returns {string} The full URL.
 */
export function getRouteUrl(path) {
  return `/${path.replace(/^\//, '')}`;
}