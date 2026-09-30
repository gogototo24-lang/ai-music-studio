class ProjectService:
    def __init__(self):
        self.projects = {}

    def create(self, project):
        project_id = project.get('projectId', 'project_default')
        self.projects[project_id] = project
        return project_id

    def get(self, project_id):
        return self.projects.get(project_id)
