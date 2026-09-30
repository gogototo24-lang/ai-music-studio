from local_ai.providers.base_provider import BaseProvider


class FFmpegProvider(BaseProvider):
    def export(self, video_files, audio_file, output_path, **kwargs):
        return {
            'ok': True,
            'provider': 'ffmpeg',
            'output_path': output_path,
            'video_files': video_files,
            'audio_file': audio_file
        }
