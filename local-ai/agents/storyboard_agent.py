from local_ai.providers.base_provider import BaseProvider


class StoryboardAgent(BaseProvider):
    def analyze_lyrics(self, lyrics: str):
        return [
            {'scene': '夜景', 'duration': 10, 'prompt': 'moonlit city silhouette'},
            {'scene': '人物近景', 'duration': 10, 'prompt': 'close-up of emotional heroine'},
            {'scene': '城市大景', 'duration': 10, 'prompt': 'wide urban scenery with cinematic camera motion'}
        ]
