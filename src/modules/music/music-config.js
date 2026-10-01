/**
 * Music Config Module
 * 音樂設定與預設
 */

export const MUSIC_STYLES = [
  '電影級武俠', '台語流行', '史詩搖滾', '電子國風', '抒情古風',
  '暗黑交響', '電影配樂', '民族風', '爵士藍調', '古典管弦樂'
];

export const MUSIC_LANGUAGES = [
  '繁體中文', '台語', '中文＋台語混合'
];

export const VOICE_TONES = [
  '女聲・霸氣', '女聲・清亮', '女聲・溫柔', '女聲・低沉', '女聲・戲劇'
];

export const MOODS = [
  '氣勢磅礡', '熱血', '神秘', '悲壯', '溫柔', '空靈', '詼諧', '深沉'
];

export const TEMPOS = [
  '慢板', '中板', '快板', '自由速度'
];

export const DURATIONS = [
  { label: '30 秒', value: '30' },
  { label: '60 秒', value: '60' },
  { label: '90 秒', value: '90' },
  { label: '2 分鐘', value: '120' },
  { label: '3 分鐘', value: '180' }
];

export const INSTRUMENT_MIX = {
  cinematic: { drums: 0.25, bass: 0.2, piano: 0.2, strings: 0.2, synth: 0.15 },
  pop: { drums: 0.3, bass: 0.2, piano: 0.17, strings: 0.15, synth: 0.18 },
  acoustic: { drums: 0.15, bass: 0.15, piano: 0.3, strings: 0.25, synth: 0.15 }
};
