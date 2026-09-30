export const APP_CONFIG = {
  appName: 'AI Music Studio',
  appVersion: 'v1.0-mv',
  defaultPreset: 'general-mv',
  supportedProviders: {
    llm: ['ollama', 'openai', 'gemini', 'claude'],
    music: ['local-music', 'ace-step', 'musicgen', 'external-api'],
    image: ['comfyui', 'flux', 'local-image'],
    video: ['local-shot', 'pixverse'],
    export: ['ffmpeg']
  },
  storageKey: 'ai-music-studio-projects',
  defaultAspectRatio: '9:16'
};
