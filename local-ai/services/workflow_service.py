class WorkflowService:
    def __init__(self):
        self.dispatcher = None

    def run(self, project):
        return {
            'ok': True,
            'project': project,
            'status': 'workflow-started'
        }
