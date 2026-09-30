export const VOICE_PRESETS = {
  female: {
    tone: 'clear',
    pitch: 1.1,
    clarity: 0.85
  },
  male: {
    tone: 'deep',
    pitch: 0.9,
    clarity: 0.8
  }
};

export function buildVoiceProfile({ gender = 'female', tone, language = 'zh-tw', pitch, clarity }) {
  const base = VOICE_PRESETS[gender] || VOICE_PRESETS.female;
  return {
    gender,
    tone: tone || base.tone,
    language,
    pitch: pitch || base.pitch,
    clarity: clarity || base.clarity
  };
}
