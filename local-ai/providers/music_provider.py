from local_ai.providers.base_provider import BaseProvider


class MusicProvider(BaseProvider):
    def generate(self, task: dict, **kwargs):
        return {
            'ok': True,
            'provider': 'local-music',
            'task': task,
            'result': 'mock generated music'
        }
