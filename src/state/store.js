import { APP_CONFIG } from '../config/app-config.js';

export function loadProjects() {
  try {
    const raw = localStorage.getItem(APP_CONFIG.storageKey);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.warn('Failed to parse stored projects', error);
    return [];
  }
}

export function saveProjects(projects) {
  localStorage.setItem(APP_CONFIG.storageKey, JSON.stringify(projects));
}
