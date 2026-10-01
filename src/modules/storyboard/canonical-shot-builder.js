export function buildCanonicalShotPrompt(shot, options = {}) {
  const title = options.title || 'AI MV';
  const style = options.style || 'cinematic';
  const preset = options.preset || 'general-mv';
  const ratio = options.ratio || '9:16';
  const theme = options.theme || 'moonlit wuxia heroine';
  const characterConsistency = options.characterConsistency === true
    ? 'same face, same outfit, fixed weapon, consistent silhouette, same color palette'
    : 'creative variation allowed';

  const identityPrefix = preset === 'maozhang-jianghu'
    ? 'cat wuxia puppet theater, fixed heroine silhouette, moonlit dramatic scene, consistent character design, same face across shots, same costume and weapon shape, refined cinematic detail'
    : preset === 'miao-taiwan'
      ? 'Taiwan urban cat universe, cinematic city night, consistent character identity, modern cultural details'
      : 'cinematic music video still, detailed environment, dramatic lighting';

  return [
    `Title: ${title}`,
    `Theme: ${theme}`,
    `Style: ${style}`,
    `Preset: ${preset}`,
    `Ratio: ${ratio}`,
    `Scene: ${shot.scene}`,
    `Shot type: ${shot.shotType || 'cinematic'}`,
    `Camera: ${shot.cameraMove || 'tracking shot'}`,
    `Visual: ${shot.visualPrompt || 'cinematic composition'}`,
    `Identity rules: ${identityPrefix}`,
    `Consistency: ${characterConsistency}`,
    'Quality: ultra detailed, cinematic lighting, rich atmosphere, strong contrast, expressive composition, high quality' 
  ].join('\n');
}

export function generateShotCardsFromLyrics(lyrics, options = {}) {
  const shots = analyzeLyricsToShots(lyrics, { duration: options.duration || 5 });
  return shots.map((shot) => ({
    ...shot,
    prompt: buildCanonicalShotPrompt(shot, {
      title: options.title || 'AI MV',
      style: options.style || 'cinematic',
      preset: options.preset || 'general-mv',
      ratio: options.ratio || '9:16',
      theme: options.theme || 'moonlit wuxia heroine',
      characterConsistency: options.characterConsistency === true
    })
  }));
}
