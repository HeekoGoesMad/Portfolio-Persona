const rawBase = import.meta.env.BASE_URL || '/';
const normalizedBase = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export function withBase(path: string): string {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  if (normalizedBase === '/') return path;
  if (path.startsWith(normalizedBase) || path === normalizedBase.slice(0, -1)) return path;
  return `${normalizedBase}${path.slice(1)}`;
}

export function stripBase(pathname: string): string {
  if (!pathname) return '/';
  if (normalizedBase !== '/') {
    const trimmed = normalizedBase.slice(0, -1);
    if (pathname === trimmed) return '/';
    if (pathname.startsWith(normalizedBase)) {
      return `/${pathname.slice(normalizedBase.length)}`;
    }
  }
  return pathname;
}
