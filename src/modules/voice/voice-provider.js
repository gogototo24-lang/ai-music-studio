export class VoiceProvider {
  constructor(type = 'ollama-tts') {
    this.type = type;
  }

  async synthesize(project) {
    console.log('Voice provider stub', { type: this.type, projectTitle: project.title });
    return { ok: true, file: 'voice-output.wav' };
  }
}
