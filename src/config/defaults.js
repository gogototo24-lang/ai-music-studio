export const DEFAULT_PROJECT = {
  projectId: '',
  title: '未命名歌曲',
  lyrics: '',
  style: '電影級武俠',
  language: 'zh-tw',
  voice: {
    gender: 'female',
    tone: 'clear',
    language: 'zh-tw',
    pitch: 1.0,
    clarity: 0.8
  },
  music: {
    bpm: 110,
    key: 'D',
    instrumentMix: {
      drums: 0.25,
      bass: 0.2,
      piano: 0.2,
      strings: 0.2,
      synth: 0.15
    },
    songSections: ['intro', 'verse', 'chorus', 'bridge', 'outro'],
    regenerateSection: 'chorus'
  },
  storyboard: {
    enabled: true,
    mode: 'auto',
    shots: []
  },
  video: {
    aspectRatio: '9:16',
    provider: 'local-comfyui',
    characterConsistency: true,
    preset: 'general-mv'
  },
  timeline: {
    tracks: [
      { type: 'music', label: '伴奏軌' },
      { type: 'voice', label: '人聲軌' },
      { type: 'subtitle', label: '字幕軌' },
      { type: 'video', label: '影片軌' }
    ]
  }
};
