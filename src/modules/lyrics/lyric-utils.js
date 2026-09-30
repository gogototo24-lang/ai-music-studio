export function estimateSectionCount(lyrics) {
  const paragraphs = lyrics.split(/\n\s*\n/).filter(Boolean);
  return paragraphs.length;
}

export function normalizeVoiceLanguage(language) {
  const map = {
    'zh-tw': 'zh-tw',
    'nan-tw': 'nan-tw',
    'mix': 'mix',
    'zh-cn': 'zh-cn'
  };
  return map[language] || 'zh-tw';
}
