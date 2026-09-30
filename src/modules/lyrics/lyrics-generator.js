export function generateLyricsFromSeed(seedText) {
  return {
    title: 'AI 生成歌曲',
    lyrics: `【主歌】\n${seedText}\n\n【副歌】\n${seedText}\n\n【橋段】\n${seedText}`,
    generatedAt: new Date().toISOString()
  };
}

export function splitSections(lyricsText) {
  return lyricsText
    .split(/\n\s*\n/)
    .map((section) => section.trim())
    .filter(Boolean);
}
