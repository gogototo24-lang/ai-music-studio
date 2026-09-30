from local_ai.providers.base_provider import BaseProvider


class ComfyUIProvider(BaseProvider):
    def generate(self, prompt: str, **kwargs):
        return {
            'ok': True,
            'provider': 'comfyui',
            'prompt': prompt,
            'result': 'mock generated image'
        }
