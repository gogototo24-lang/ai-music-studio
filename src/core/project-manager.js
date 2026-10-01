/**
 * Project Manager
 * 負責所有專案操作：建立、讀取、更新、刪除、列出
 */

import { UI } from '../modules/ui/ui-core.js';
import { DEFAULT_PROJECT } from '../config/defaults.js';

const STORAGE_KEY = 'ai-mv-studio-projects';
const CURRENT_PROJECT_KEY = 'ai-mv-studio-current';

export class ProjectManager {
  constructor() {
    this.projects = this.loadAllProjects();
    this.currentProject = this.loadCurrentProject();
  }

  /**
   * 從 localStorage 讀所有專案
   */
  loadAllProjects() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (error) {
      console.warn('Failed to load projects from localStorage', error);
      return [];
    }
  }

  /**
   * 從 localStorage 讀目前打開的專案
   */
  loadCurrentProject() {
    try {
      const raw = localStorage.getItem(CURRENT_PROJECT_KEY);
      if (!raw) return this.createNewProject();
      return JSON.parse(raw);
    } catch (error) {
      console.warn('Failed to load current project', error);
      return this.createNewProject();
    }
  }

  /**
   * 建立全新專案
   */
  createNewProject(overrides = {}) {
    const project = {
      ...JSON.parse(JSON.stringify(DEFAULT_PROJECT)),
      projectId: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...overrides
    };
    return project;
  }

  /**
   * 生成唯一 ID
   */
  generateId() {
    return `proj_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  }

  /**
   * 儲存目前專案到 localStorage
   */
  saveCurrentProject(project = this.currentProject) {
    this.currentProject = project;
    this.currentProject.updatedAt = new Date().toISOString();
    localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify(project));
    return this.currentProject;
  }

  /**
   * 將目前專案加入到歷史列表
   */
  saveToHistory(project = this.currentProject) {
    if (!project.title || !project.lyrics) {
      console.warn('Cannot save incomplete project to history');
      return false;
    }
    
    // 移除重複的舊版本
    this.projects = this.projects.filter(p => p.projectId !== project.projectId);
    
    // 新版本放在最前面
    this.projects.unshift(JSON.parse(JSON.stringify(project)));
    
    // 只保留最近 20 個專案
    this.projects = this.projects.slice(0, 20);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects));
    return true;
  }

  /**
   * 取得所有歷史專案
   */
  getHistory() {
    return this.projects;
  }

  /**
   * 載入某個舊專案
   */
  loadProject(projectId) {
    const project = this.projects.find(p => p.projectId === projectId);
    if (!project) {
      console.warn('Project not found:', projectId);
      return null;
    }
    this.currentProject = JSON.parse(JSON.stringify(project));
    localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify(this.currentProject));
    return this.currentProject;
  }

  /**
   * 刪除某個專案
   */
  deleteProject(projectId) {
    this.projects = this.projects.filter(p => p.projectId !== projectId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.projects));
    return true;
  }

  /**
   * 清空目前專案（不影響歷史）
   */
  clearCurrent() {
    this.currentProject = this.createNewProject();
    localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify(this.currentProject));
    return this.currentProject;
  }

  /**
   * 取得目前專案的 JSON
   */
  exportJSON() {
    return JSON.stringify(this.currentProject, null, 2);
  }

  /**
   * 從 JSON 匯入
   */
  importJSON(jsonString) {
    try {
      const project = JSON.parse(jsonString);
      if (!project.projectId) {
        project.projectId = this.generateId();
      }
      this.currentProject = project;
      localStorage.setItem(CURRENT_PROJECT_KEY, JSON.stringify(this.currentProject));
      return this.currentProject;
    } catch (error) {
      console.error('Failed to import project JSON', error);
      return null;
    }
  }
}

// 單一實例
export const projectManager = new ProjectManager();
