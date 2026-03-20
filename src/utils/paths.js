// Prepend Vite base URL to public asset paths
// This ensures images work on both localhost and GitHub Pages
const base = import.meta.env.BASE_URL;

export function asset(path) {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
}
