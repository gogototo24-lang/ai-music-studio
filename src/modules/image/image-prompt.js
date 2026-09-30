export function buildImagePrompt(visualPrompt, preset = 'general-mv', characterConsistency = false) {
  const prefix = preset === 'maozhang-jianghu'
    ? 'cat wuxia puppet theater, cinematic moonlit dramatic, consistent hero design, fixed costume and weapon silhouette'
    : 'cinematic MV frame, detailed environment, dramatic lighting';

  return `${prefix}, ${visualPrompt}, ${characterConsistency ? 'character consistency enabled' : 'creative variation allowed'}, 9:16, high quality`;
}
