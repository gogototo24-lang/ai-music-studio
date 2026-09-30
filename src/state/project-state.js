import { DEFAULT_PROJECT } from '../config/defaults.js';

export class ProjectState {
  constructor(initialProject = DEFAULT_PROJECT) {
    this.project = structuredClone(initialProject);
  }

  update(partial) {
    this.project = { ...this.project, ...partial };
  }

  setLyrics(lyrics) {
    this.project.lyrics = lyrics;
  }

  setVoice(voiceConfig) {
    this.project.voice = { ...this.project.voice, ...voiceConfig };
  }

  setMusic(musicConfig) {
    this.project.music = { ...this.project.music, ...musicConfig };
  }

  setStoryboard(storyboard) {
    this.project.storyboard = storyboard;
  }
}
