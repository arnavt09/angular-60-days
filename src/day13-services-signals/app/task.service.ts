import { Injectable, computed, signal } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private nextId = 3;

  private readonly taskState = signal<readonly Task[]>([
    {
      id: 1,
      title: 'Practice Angular services',
      completed: false
    },
    {
      id: 2,
      title: 'Complete Day 12',
      completed: true
    }
  ]);

  readonly tasks = this.taskState.asReadonly();

  readonly totalCount = computed(() => this.tasks().length);

  readonly completedCount = computed(
    () => this.tasks().filter(task => task.completed).length
  );

  readonly pendingCount = computed(
    () => this.totalCount() - this.completedCount()
  );

  addTask(title: string): string | null {
    const cleanedTitle = title.trim();

    if (!cleanedTitle) {
      return 'Please enter a task title.';
    }

    const duplicate = this.tasks().some(
      task => task.title.toLowerCase() === cleanedTitle.toLowerCase()
    );

    if (duplicate) {
      return 'This task already exists.';
    }

    const newTask: Task = {
      id: this.nextId++,
      title: cleanedTitle,
      completed: false
    };

    this.taskState.update(tasks => [...tasks, newTask]);

    return null;
  }

  toggleTask(id: number): void {
    this.taskState.update(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }

  deleteTask(id: number): void {
    this.taskState.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }
}