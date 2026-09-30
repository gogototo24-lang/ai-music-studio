class TaskDispatcher:
    def dispatch(self, task):
        return {
            'ok': True,
            'status': 'queued',
            'task': task
        }
