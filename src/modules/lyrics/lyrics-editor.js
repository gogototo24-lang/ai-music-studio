/**
 * Lyrics Editor Module
 * 處理歌詞生成、編輯、分段
 */

import { UI } from '../ui/ui-core.js';

const profiles = {
  mofu: { name: '魔佛波旬', style: '暗黑交響', voice: '女聲・低沉', mood: '神秘', powers: ['佛焰破天', '魔音徹耳', '三界轉經'] },
  moonfan: { name: '月扇影喵', style: '電影級武俠', voice: '女聲・清亮', mood: '神秘', powers: ['月華斬', '寒月影', '風月劍'] },
  liuli: { name: '琉璃喵', style: '抒情古風', voice: '女聲・清亮', mood: '空靈', powers: ['琉璃心經', '星光迴旋', '時光凍結'] },
  bai: { name: '白狂天喵', style: '史詩搖滾', voice: '女聲・霸氣', mood: '熱血', powers: ['寒冰劍陣', '雪崩天下', '白狂破天'] },
  fire: { name: '焚天赤焰喵', style: '史詩搖滾', voice: '女聲・霸氣', mood: '氣勢磅礡', powers: ['赤焰煉獄', '焚風斬', '���火焚世'] },
  suili: { name: '歲璃喵', style: '電影配樂', voice: '女聲・溫柔', mood: '神秘', powers: ['時空迴廊', '歲月之刃', '光陰碎片'] },
  blood: { name: '血紋劍喵', style: '暗黑交響', voice: '女聲・低沉', mood: '悲壯', powers: ['血紋劍式', '殺意刀光', '絕命一擊'] }
};

const modeWords = {
  intro: { title: ['登場', '初臨', '降世', '現影'], line: ['今夜由她寫下第一聲', '一步踏入萬眾目光', '名字從此留在風中'] },
  battle: { title: ['破陣', '武極', '戰境', '裂天'], line: ['戰鼓一響便不再回頭', '招式交錯撕開夜幕', '此戰只問誰能站到最後'] },
  ballad: { title: ['月下', '心聲', '流光', '未央'], line: ['有些名字只適合留在月光裡', '風帶走故事卻帶不走思念', '最深的話藏在最安靜的夜'] },
  final: { title: ['天命', '終戰', '末劫', '無盡'], line: ['若此戰就是最後一頁', '天地都在等最後答案', '今日之後再無退路'] }
};

const common = {
  open: ['風從遠方帶來未完的夢', '夜色沉下　天地只剩心跳', '舊日的名字仍留在風中', '長路無聲　腳步卻從未停止'],
  pre: ['若命運要我低頭', '若天地早寫好結局', '若前方只剩最後一條路', '若此身註定穿越風暴'],
  answer: ['我便用此心寫下答案', '那就親手改寫最後一頁', '我仍會向前一步', '便讓今夜成為新的開始'],
  bridge: ['也許世界從未給過答案', '真正的勝負從來不在刀劍', '當最後一道光穿過長夜', '到了無路可退的那一刻'],
  ending: ['名字終將留在風中', '月光仍會照著來時的路', '故事還沒有真正結束', '天亮以前　此心不滅']
};

export class LyricsEditor {
  /**
   * 隨機選擇陣列元素
   */
  static pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * 取得角色設定
   */
  static getProfile(characterId, customTheme = '') {
    if (characterId !== 'custom' && profiles[characterId]) {
      return profiles[characterId];
    }
    const theme = customTheme.trim() || '無名江湖';
    return {
      name: theme,
      style: '電影級武俠',
      voice: '女聲・霸氣',
      mood: '氣勢磅礡',
      powers: [`${theme}的絕招`, `${theme}的決意`, `${theme}的迴響`]
    };
  }

  /**
   * 自動生成歌詞
   */
  static generateLyrics(characterId, customTheme, mode, language, hookMode) {
    const profile = this.getProfile(characterId, customTheme);
    const modeData = modeWords[mode];
    const hook = this.pick(profile.powers);
    const extra = hookMode === 'max' 
      ? `${hook}\n${this.pick(profile.powers)}`
      : hookMode === 'strong' 
        ? `${hook}\n${this.pick(profile.powers)}`
        : hook;

    const isTw = language === '台語';
    const isMixed = language === '中文＋台語混合';

    const chorus = isTw || isMixed
      ? `${extra}\n風雨若欲擋阮的路\n阮就一念行到底\n天地若問阮驚不驚\n阮嘛袂放棄家己`
      : `${extra}\n若風雨擋住我的路\n我就一念走到底\n若天地問我驚不驚\n我也不會放棄自己`;

    const verse1 = `${this.pick(profile.powers)}\n${this.pick(common.open)}\n${this.pick(modeData.line)}\n${this.pick(profile.powers)}`;
    const verse2 = `${this.pick(profile.powers)}\n${this.pick(common.open)}\n${this.pick(modeData.line)}\n${this.pick(profile.powers)}`;

    const lyrics = `【主歌一】\n${verse1}\n\n【預副歌】\n${this.pick(common.pre)}\n${this.pick(common.answer)}\n\n【副歌】\n${chorus}\n\n【主歌二】\n${verse2}\n\n【橋段】\n${this.pick(common.bridge)}\n${isTw ? '阮才知影真正的力量' : '才明白真正的力量'}\n${isTw ? '毋是勝過別人' : '並不是擊敗誰'}\n${isTw ? '是袂放棄心內彼道光' : '而是不放棄心中那道光'}\n\n【結尾】\n${this.pick(common.ending)}`;

    return {
      title: `${profile.name}・${this.pick(modeData.title)}`,
      lyrics,
      style: profile.style,
      voice: profile.voice,
      mood: profile.mood
    };
  }

  /**
   * 分段歌詞
   */
  static splitSections(lyricsText) {
    return lyricsText
      .split(/\n\s*\n/)
      .map(section => section.trim())
      .filter(Boolean)
      .map((content, index) => ({
        id: `section_${index}`,
        content,
        type: this.detectSectionType(content)
      }));
  }

  /**
   * 偵測分段類型
   */
  static detectSectionType(content) {
    if (content.includes('【主歌')) return 'verse';
    if (content.includes('【副歌')) return 'chorus';
    if (content.includes('【橋段')) return 'bridge';
    if (content.includes('【預副歌')) return 'pre-chorus';
    if (content.includes('【結尾')) return 'outro';
    return 'unknown';
  }
}
