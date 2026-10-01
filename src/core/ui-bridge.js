/**
 * UI Bridge
 * 連接 HTML 表單與專案狀態，雙向同步
 */

import { UI } from '../modules/ui/ui-core.js';
import { projectManager } from './project-manager.js';

const FORM_FIELDS = [
  'character', 'theme', 'mode', 'hook',
  'title', 'lyrics',
  'style', 'language', 'voice', 'mood', 'duration', 'tempo', 'notes'
];

export class UIBridge {
  constructor() {
    this.setupFieldListeners();
  }

  /**
   * 為所有表單欄位設置自動儲存
   */
  setupFieldListeners() {
    FORM_FIELDS.forEach(fieldId => {
      const el = UI.get(fieldId);
      if (!el) return;
      
      el.addEventListener('change', () => this.syncToProject());
      el.addEventListener('input', () => this.syncToProject());
    });
  }

  /**
   * 從表單讀取資料並同步到專案
   */
  syncToProject() {
    const proj = projectManager.currentProject;
    
    // 基本資訊
    proj.title = UI.getValue('title');
    proj.lyrics = UI.getValue('lyrics');
    
    // 音樂設定
    proj.style = UI.getValue('style');
    proj.music = proj.music || {};
    proj.music.style = proj.style;
    
    // 語言與聲線
    proj.language = UI.getValue('language');
    proj.voice = proj.voice || {};
    proj.voice.language = proj.language;
    proj.voice.tone = UI.getValue('voice');
    
    // 情緒與節奏
    proj.mood = UI.getValue('mood');
    proj.music.tempo = UI.getValue('tempo');
    proj.music.duration = UI.getValue('duration');
    
    // 角色設定
    proj.character = UI.getValue('character');
    proj.theme = UI.getValue('theme');
    proj.mode = UI.getValue('mode');
    
    // 額外備註
    proj.notes = UI.getValue('notes');
    
    projectManager.saveCurrentProject(proj);
  }

  /**
   * 從專案讀取資料並填入表單
   */
  syncFromProject(proj = projectManager.currentProject) {
    if (!proj) return;
    
    UI.setValue('title', proj.title || '');
    UI.setValue('lyrics', proj.lyrics || '');
    UI.setValue('style', proj.style || '電影級武俠');
    UI.setValue('language', proj.language || '繁體中文');
    UI.setValue('voice', proj.voice?.tone || '女聲・清亮');
    UI.setValue('mood', proj.mood || '氣勢磅礡');
    UI.setValue('duration', proj.music?.duration || '60');
    UI.setValue('tempo', proj.music?.tempo || '中板');
    UI.setValue('notes', proj.notes || '');
    UI.setValue('character', proj.character || 'custom');
    UI.setValue('theme', proj.theme || '');
    UI.setValue('mode', proj.mode || 'intro');
  }

  /**
   * 清空表單
   */
  clearForm() {
    FORM_FIELDS.forEach(fieldId => UI.setValue(fieldId, ''));
    projectManager.clearCurrent();
  }
}

export const uiBridge = new UIBridge();
