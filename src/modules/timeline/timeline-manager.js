export class TimelineManager {
  constructor() {
    this.tracks = [
      { type: 'music', label: '伴奏軌' },
      { type: 'voice', label: '人聲軌' },
      { type: 'subtitle', label: '字幕軌' },
      { type: 'video', label: '影片軌' }
    ];
  }

  addShot(shot) {
    this.shots = this.shots || [];
    this.shots.push(shot);
  }
}
