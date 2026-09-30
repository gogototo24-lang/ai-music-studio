from local_ai.providers.base_provider import BaseProvider


class OllamaProvider(BaseProvider):
    def generate(self, prompt: str, **kwargs):
        return {
            'ok': True,
            'provider': 'ollama',
            'prompt': prompt,
            'result': 'mock llm output'
        }
