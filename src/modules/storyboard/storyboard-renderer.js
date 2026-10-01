export function analyzeLyricsToShots(lyrics, options = {}) {
  const safeLyrics = String(lyrics || '').trim();
  const lower = safeLyrics.toLowerCase();
  const shotLength = options.duration || 5;

  const rules = [
    {
      keyword: /月|夜|月色|夜景|月光|星光|落下|長夜|夜空/,
      scene: '夜景',
      type: 'wide',
      visualPrompt: 'cinematic moonlit city, wide angle, atmospheric lights, slow moving camera'
    },
    {
      keyword: /回憶|想起|記憶|曾經|心中|她|他|人物|近景|情緒/,
      scene: '人物近景',
      type: 'closeup',
      visualPrompt: 'close-up emotional portrait, detailed face expression, moody lighting, intimate framing'
    },
    {
      keyword: /副歌|一同|一起|一起奔|唱|呼喊|高昂|熱血/,
      scene: '城市大景＋人物運鏡',
      type: 'hero',
      visualPrompt: 'city skyline with lead character in motion, dynamic tracking shot, dramatic energy'
    },
    {
      keyword: /風|雨|劍|戰|刀|武|破|決戰|奔跑|衝刺/,
      scene: '武鬥動作鏡',
      type: 'action',
      visualPrompt: 'fast action sequence, weapon silhouette, high energy choreography, dramatic contrast'
    },
    {
      keyword: /結尾|最後|再見|天亮|明天|回歸|解開|答案/,
      scene: '結尾大景',
      type: 'ending',
      visualPrompt: 'final wide shot, hopeful cinematic finale, strong composition, emotional resolution'
    }
  ];

  const matchedSceneList = rules
    .filter(rule => rule.keyword.test(lower))
    .map(rule => ({ scene: rule.scene, type: rule.type, visualPrompt: rule.visualPrompt }));

  const defaultShots = [
    { scene: '夜景', type: 'wide', visualPrompt: 'cinematic moonlit city, wide angle, atmospheric lighting' },
    { scene: '人物近景', type: 'closeup', visualPrompt: 'close-up portrait with emotional expression, detailed face, soft rim light' },
    { scene: '城市大景＋人物運鏡', type: 'hero', visualPrompt: 'city skyline with hero moving through frame, tracking shot, dynamic energy' },
    { scene: '武鬥動作鏡', type: 'action', visualPrompt: 'dramatic action choreography, silhouette and motion, strong contrast' },
    { scene: '結尾大景', type: 'ending', visualPrompt: 'final cinematic wide shot, emotional closure, high-quality composition' }
  ];

  const shots = (matchedSceneList.length ? matchedSceneList : defaultShots).map((item, index) => ({
    id: `shot_${index + 1}`,
    index: index + 1,
    duration: shotLength,
    scene: item.scene,
    shotType: item.type,
    visualPrompt: item.visualPrompt,
    cameraMove: index % 2 === 0 ? '穩定推進' : '左右運鏡',
    emotion: index % 2 === 0 ? '克制與懷舊' : '張力與高潮'
  }));

  return shots;
}

export function buildShotPrompt(shot, options = {}) {
  const title = options.title || 'AI MV';
  const style = options.style || 'cinematic';
  const preset = options.preset || 'general-mv';
  const ratio = options.ratio || '9:16';
  const characterConsistency = options.characterConsistency === true ? 'character consistency enabled, same face, same outfit, fixed props' : 'creative variation allowed';

  return [
    `Project: ${title}`,
    `Style: ${style}`,
    `Preset: ${preset}`,
    `Aspect ratio: ${ratio}`,
    `Scene: ${shot.scene}`,
    `Shot type: ${shot.shotType || 'cinematic'}`,
    `Camera: ${shot.cameraMove || 'tracking shot'}`,
    `Visual: ${shot.visualPrompt || 'cinematic composition'}`,
    `Requirements: ${characterConsistency}, high detail, dramatic color grading, cinematic lighting, strong composition`
  ].join('\n');
}

export function renderStoryboardShots(shots = [], containerId = 'storyboardList') {
  const container = document.getElementById(containerId);
  if (!container) return [];

  container.innerHTML = shots.map((shot) => `
    <div class="story-shot" style="padding: 12px; border: 1px solid #394151; border-radius: 12px; margin-top: 10px; background: #0f141c;">
      <div style="display:flex; justify-content: space-between; gap: 10px; align-items: center; margin-bottom: 8px;">
        <strong>Shot ${shot.index}</strong>
        <span class="pill">${shot.duration}s</span>
      </div>
      <div style="font-weight: 600; margin-bottom: 6px;">${shot.scene}</div>
      <div style="font-size: 13px; color: #dbe3ef; margin-bottom: 10px;">${shot.visualPrompt}</div>
      <div class="row">
        <button class="secondary storyboard-generate" data-shot-id="${shot.id}" style="padding: 8px 10px; font-size: 12px;">生成</button>
        <button class="ghost storyboard-regenerate" data-shot-id="${shot.id}" style="padding: 8px 10px; font-size: 12px;">重做</button>
      </div>
    </div>
  `).join('');

  return shots;
}
