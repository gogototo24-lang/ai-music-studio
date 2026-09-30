export class VideoProvider {
  constructor(type = 'local-shot') {
    this.type = type;
  }

  async generateShot(imagePath, prompt, duration = 5) {
    console.log('Video provider stub', { type: this.type, imagePath, prompt, duration });
    return { ok: true, videoPath: `output/shot-${Date.now()}.mp4`, duration };
  }
}
