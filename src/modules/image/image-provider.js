export class ImageProvider {
  constructor(type = 'comfyui') {
    this.type = type;
  }

  async generateImage(prompt, options = {}) {
    console.log('Image provider stub', { type: this.type, prompt, options });
    return { ok: true, imagePath: 'output/generated-shot.png' };
  }
}
