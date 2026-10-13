  updateTask(id: number, title: string): string | null {
    const cleanedTitle = title.trim();

    if (!cleanedTitle) {
      return 'Please enter a task title.';
    }

    const existingTask = this.tasks().find(task => task.id === id);

    if (!existingTask) {
      return 'This task no longer exists.';
    }

    const duplicate = this.tasks().some(
      task =>
        task.id !== id &&
        task.title.toLowerCase() === cleanedTitle.toLowerCase()
    );

    if (duplicate) {
      return 'Another task already has this title.';
    }

    this.taskState.update(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, title: cleanedTitle } : task
      )
    );

    this.saveTasks();
    return null;
  }