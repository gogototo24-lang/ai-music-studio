/**
 * Preset Loader
 * 負責載入和應用 preset / canon profile
 */

export class PresetLoader {
  constructor() {
    this.presets = {};
    this.currentPreset = 'general-mv';
  }

  /**
   * 從 JSON 載入 preset
   */
  async loadPreset(presetName) {
    try {
      const response = await fetch(`/assets/presets/${presetName}.json`);
      if (!response.ok) throw new Error('Preset not found');
      this.presets[presetName] = await response.json();
      this.currentPreset = presetName;
      return this.presets[presetName];
    } catch (error) {
      console.error(`Failed to load preset: ${presetName}`, error);
      return null;
    }
  }

  /**
   * 取得目前 preset
   */
  getCurrentPreset() {
    return this.presets[this.currentPreset] || null;
  }

  /**
   * 應用 preset 到專案
   */
  applyPresetToProject(project, presetName) {
    const preset = this.presets[presetName];
    if (!preset) return project;

    return {
      ...project,
      video: {
        ...project.video,
        preset: presetName,
        aspectRatio: preset.aspectRatio,
        characterConsistency: preset.characterConsistency
      },
      visualStyle: preset.visualStyle,
      promptPrefix: preset.promptPrefix,
      negativePrompt: preset.negativePrompt,
      voiceProfile: preset.voiceProfile
    };
  }
}

export const presetLoader = new PresetLoader();
