export function validateProjectShape(project) {
  if (!project || typeof project !== 'object') return false;
  if (!project.title || !project.lyrics) return false;
  return true;
}
