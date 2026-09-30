export function buildShotConfig({ duration = 5, prompt = '', useReference = false }) {
  return {
    duration,
    prompt,
    useReference,
    status: 'ready'
  };
}
