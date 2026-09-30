export function buildStoryboardPrompt(lyrics, sceneContext = {}) {
  const summary = {
    style: sceneContext.style || 'cinematic',
    ratio: sceneContext.aspectRatio || '9:16',
    mood: sceneContext.mood || 'dramatic',
    preserveCharacter: sceneContext.preserveCharacter || false
  };

  return `Generate storyboard frames for this lyrical theme. Style: ${summary.style}. Ratio: ${summary.ratio}. Mood: ${summary.mood}. Preserve character consistency: ${summary.preserveCharacter}. Lyrics: ${lyrics}`;
}
