/**
 * Project Export
 * 負責匯出專案、下載檔案等功能
 */

import { projectManager } from './project-manager.js';

export class ProjectExport {
  /**
   * 將專案匯出為 JSON 檔案
   */
  downloadJSON(project = projectManager.currentProject) {
    const json = JSON.stringify(project, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title || 'ai-mv-project'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /**
   * 將專案複製到剪貼板
   */
  async copyToClipboard(project = projectManager.currentProject) {
    try {
      const json = JSON.stringify(project, null, 2);
      await navigator.clipboard.writeText(json);
      return { ok: true, message: '已複製到剪貼板' };
    } catch (error) {
      return { ok: false, message: '複製失敗: ' + error.message };
    }
  }

  /**
   * 生成 prompt 用於音樂生成 API
   */
  generateMusicPrompt(project = projectManager.currentProject) {
    const parts = [
      `【歌曲名稱】${project.title}`,
      `【曲風】${project.style}`,
      `【語言】${project.language}`,
      `【聲線】${project.voice?.tone || ''}`,
      `【情緒】${project.mood}`,
      `【速度】${project.music?.tempo || ''}`,
      `【長度】約 ${project.music?.duration || 60} 秒`,
      `【歌詞】\n${project.lyrics}`,
      project.notes ? `【特別要求】${project.notes}` : ''
    ];
    
    return parts.filter(Boolean).join('\n\n');
  }

  /**
   * 生成圖片生成用 prompt（針對分鏡）
   */
  generateImagePrompt(shotData, preset = 'general-mv') {
    const base = preset === 'maozhang-jianghu'
      ? 'cat wuxia puppet theater, cinematic moonlit dramatic, high detail, 9:16'
      : 'cinematic music video frame, detailed, high quality, 9:16';
    
    const prompt = `${base}\nScene: ${shotData.scene || ''}\nVisual: ${shotData.visualPrompt || ''}`;
    return prompt;
  }
}

export const projectExport = new ProjectExport();
