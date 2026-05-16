// Prepends Vite's base path so public-folder URLs work on any sub-path deploy (e.g. GitHub Pages).
const BASE = import.meta.env.BASE_URL; // '/' in dev, '/Personal-Portfolio/' in prod

export const pub = (path) => `${BASE}${path.replace(/^\//, '')}`;
