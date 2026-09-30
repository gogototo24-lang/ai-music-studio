class PromptBuilder:
    @staticmethod
    def build_image_prompt(scene: str, style: str, aspect_ratio: str = '9:16'):
        return f'{scene}, {style}, cinematic, high detail, {aspect_ratio}, consistent character design'

    @staticmethod
    def build_video_prompt(scene: str, style: str):
        return f'{scene}, {style}, smooth motion, cinematic transition, dynamic camera'
