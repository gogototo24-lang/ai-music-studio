export function readProjectStorage(key, fallback = []) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn('readProjectStorage failed:', error);
    return fallback;
  }
}

export function writeProjectStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
