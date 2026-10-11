import { Injectable, computed, signal } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  readonly tasks = signal<Task[]>([]);
  readonly completedCount = computed(
    () => this.tasks().filter(task => task.completed).length
  );

  private nextId = 1;

  addTask(title: string): string {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return 'Please enter a task title.';
    }

    this.tasks.update(tasks => [
      ...tasks,
      {
        id: this.nextId++,
        title: trimmedTitle,
        completed: false
      }
    ]);

    return '';
  }

  toggleTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  deleteTask(id: number): void {
    this.tasks.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }
}