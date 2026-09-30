export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/health') {
      return Response.json({ ok: true, service: 'ai-music-studio-worker' });
    }

    if (url.pathname === '/generate') {
      return Response.json({
        ok: true,
        message: 'Worker ready. Music API integration pending.',
        task: 'generation-request-received'
      });
    }

    return Response.json({ ok: false, error: 'Not found' }, { status: 404 });
  }
};
