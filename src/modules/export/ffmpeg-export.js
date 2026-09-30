export class FfmpegExporter {
  constructor() {
    this.command = 'ffmpeg';
  }

  async exportProject(project) {
    console.log('FFmpeg export stub', { title: project.title, ratio: project.video?.aspectRatio || '9:16' });
    return { ok: true, output: 'output/final-mv.mp4' };
  }
}
