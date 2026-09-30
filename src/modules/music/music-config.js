export const MUSIC_PRESETS = {
  cinematic: {
    bpm: 110,
    key: 'D',
    instrumentMix: {
      drums: 0.28,
      bass: 0.2,
      piano: 0.2,
      strings: 0.17,
      synth: 0.15
    }
  },
  pop: {
    bpm: 120,
    key: 'C',
    instrumentMix: {
      drums: 0.3,
      bass: 0.2,
      piano: 0.17,
      strings: 0.15,
      synth: 0.18
    }
  }
};

export function buildMusicConfig(style, bpm, key) {
  const preset = MUSIC_PRESETS[style] || MUSIC_PRESETS.cinematic;
  return {
    bpm: bpm || preset.bpm,
    key: key || preset.key,
    instrumentMix: preset.instrumentMix
  };
}
