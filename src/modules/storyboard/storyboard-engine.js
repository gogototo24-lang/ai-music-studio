export function generateStoryboardShots(lyricsText, mode = 'auto') {
  const normalized = lyricsText || '';
  const shots = [
    { id: 'shot_1', duration: 10, scene: '夜景', visualPrompt: 'moonlit city silhouette, cinematic wide shot' },
    { id: 'shot_2', duration: 10, scene: '人物近景', visualPrompt: 'close-up of heroine with emotional focus, detailed face expression' },
    { id: 'shot_3', duration: 10, scene: '城市大景', visualPrompt: 'wide urban skyline with movement and atmosphere' }
  ];

  if (!normalized) return shots;

  return shots.map((shot, index) => ({
    ...shot,
    visualPrompt: `${shot.visualPrompt}, ${mode}, narrative continuity, shot ${index + 1}`
  }));
}
