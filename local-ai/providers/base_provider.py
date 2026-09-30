from local_ai.config import load_config


class BaseProvider:
    def __init__(self, config=None):
        self.config = config or load_config()

    def health_check(self):
        return {'ok': True, 'provider': self.__class__.__name__}

    def generate(self, *args, **kwargs):
        raise NotImplementedError('Provider must implement generate()')
