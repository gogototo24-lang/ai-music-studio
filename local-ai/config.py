from dataclasses import dataclass
from typing import Optional


@dataclass
class Config:
    llm_provider: str = 'ollama'
    image_provider: str = 'comfyui'
    music_provider: str = 'local-music'
    video_provider: str = 'local-shot'
    export_provider: str = 'ffmpeg'
    worker_host: str = '127.0.0.1'
    worker_port: int = 8001


DEFAULT_CONFIG = Config()


def load_config() -> Config:
    return DEFAULT_CONFIG
