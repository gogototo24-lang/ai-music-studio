export function generateProjectId(prefix = 'proj') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function safeJsonParse(value, fallback = []) {
  try {
    return JSON.parse(value || 'null') || fallback;
  } catch (error) {
    return fallback;
  }
}
