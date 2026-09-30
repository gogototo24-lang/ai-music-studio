export class ExportManager {
  constructor(exporter = null) {
    this.exporter = exporter;
  }

  async export(project) {
    if (!this.exporter) {
      return { ok: false, error: 'No exporter configured' };
    }
    return await this.exporter.exportProject(project);
  }
}
