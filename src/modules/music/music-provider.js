export class MusicProvider {
  constructor(type = 'local-music') {
    this.type = type;
  }

  async generate(task) {
    console.log('Music provider stub', { type: this.type, task });
    return { ok: true, taskId: task.projectId || 'demo-task' };
  }
}
