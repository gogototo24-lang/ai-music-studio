from local_ai.agents.storyboard_agent import StoryboardAgent


class MvAgent(StoryboardAgent):
    def build_workflow(self, project):
        return {
            'storyboard': self.analyze_lyrics(project.get('lyrics', '')),
            'image_generation': True,
            'video_generation': True,
            'export': True
        }
