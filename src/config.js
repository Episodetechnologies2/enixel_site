const API_URL = import.meta.env.VITE_API_URL || '';
const MEDIA_URL = import.meta.env.VITE_MEDIA_URL || import.meta.env.VITE_API_URL || '';


export const getApiUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (API_URL) {
    const base = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
    return `${base}${cleanPath}`;
  }
  return `/${cleanPath}`;
};

export const getMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  if (MEDIA_URL) {
    const base = MEDIA_URL.endsWith('/') ? MEDIA_URL : `${MEDIA_URL}/`;
    return `${base}${cleanPath}`;
  }
  return `${window.location.origin}/${cleanPath}`;
};
