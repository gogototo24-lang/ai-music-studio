/**
 * History Renderer
 * 渲染最近保存的專案列表
 */

import { UI } from '../modules/ui/ui-core.js';
import { projectManager } from './project-manager.js';
import { uiBridge } from './ui-bridge.js';

export class HistoryRenderer {
  render(containerId = 'history') {
    const container = UI.get(containerId);
    if (!container) return;

    const history = projectManager.getHistory();
    
    if (!history || history.length === 0) {
      container.innerHTML = '<div class="muted">目前沒有儲存的歌曲。</div>';
      return;
    }

    const html = history.map((proj, index) => `
      <div class="history-item" data-project-id="${proj.projectId}">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="flex: 1;">
            <strong>${this.escape(proj.title || '未命名')}</strong>
            <div class="muted" style="font-size: 12px; margin-top: 4px;">
              ${proj.style || ''} • ${proj.language || ''} • ${this.formatDate(proj.updatedAt)}
            </div>
          </div>
          <div style="display: flex; gap: 6px;">
            <button class="ghost history-load" data-index="${index}" style="padding: 6px 10px; font-size: 12px;">載入</button>
            <button class="ghost history-delete" data-index="${index}" style="padding: 6px 10px; font-size: 12px; color: #ffc0c8;">刪除</button>
          </div>
        </div>
      </div>
    `).join('');

    container.innerHTML = html;
    this.attachListeners();
  }

  attachListeners() {
    document.querySelectorAll('.history-load').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        const history = projectManager.getHistory();
        if (history[index]) {
          projectManager.loadProject(history[index].projectId);
          uiBridge.syncFromProject();
          UI.setStatus('lyricStatus', '✨ 已載入舊專案', true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    });

    document.querySelectorAll('.history-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (!confirm('確定要刪除此專案嗎？')) return;
        const index = parseInt(e.target.dataset.index);
        const history = projectManager.getHistory();
        if (history[index]) {
          projectManager.deleteProject(history[index].projectId);
          this.render();
        }
      });
    });
  }

  formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '剛剛';
    if (minutes < 60) return `${minutes} 分鐘前`;
    if (hours < 24) return `${hours} 小時前`;
    if (days < 7) return `${days} 天前`;
    
    return date.toLocaleDateString('zh-TW');
  }

  escape(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

export const historyRenderer = new HistoryRenderer();
