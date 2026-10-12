import { isPlatformBrowser } from '@angular/common';
import {
  Injectable,
  PLATFORM_ID,
  computed,
  inject,
  signal
} from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly storageKey = 'angular-day14-tasks';

  private readonly isBrowser = isPlatformBrowser(
    inject(PLATFORM_ID)
  );

  private nextId = 3;

  private readonly taskState = signal<readonly Task[]>([
    {
      id: 1,
      title: 'Practice Angular services',
      completed: false
    },
    {
      id: 2,
      title: 'Complete Day 13',
      completed: true
    }
  ]);

  readonly tasks = this.taskState.asReadonly();

  readonly storageMessage = signal('');

  readonly totalCount = computed(
    () => this.tasks().length
  );

  readonly completedCount = computed(
    () => this.tasks().filter(task => task.completed).length
  );

  readonly pendingCount = computed(
    () => this.totalCount() - this.completedCount()
  );

  constructor() {
    this.loadTasks();
  }

  addTask(title: string): string | null {
    const cleanedTitle = title.trim();

    if (!cleanedTitle) {
      return 'Please enter a task title.';
    }

    const duplicate = this.tasks().some(
      task =>
        task.title.toLowerCase() === cleanedTitle.toLowerCase()
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
    this.saveTasks();

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

    this.saveTasks();
  }

  deleteTask(id: number): void {
    this.taskState.update(tasks =>
      tasks.filter(task => task.id !== id)
    );

    this.saveTasks();
  }

  private saveTasks(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const taskJson = JSON.stringify(this.tasks());

      localStorage.setItem(this.storageKey, taskJson);

      this.storageMessage.set(
        'Tasks saved in this browser.'
      );
    } catch {
      this.storageMessage.set(
        'Could not save tasks. Changes may disappear after refreshing.'
      );
    }
  }

  private loadTasks(): void {
    if (!this.isBrowser) {
      return;
    }

    try {
      const storedTasks = localStorage.getItem(this.storageKey);

      if (storedTasks === null) {
        this.saveTasks();
        return;
      }

      const parsedTasks: unknown = JSON.parse(storedTasks);

      if (!this.isValidTaskList(parsedTasks)) {
        this.storageMessage.set(
          'Saved data is invalid. Showing sample tasks.'
        );
        return;
      }

      this.taskState.set(parsedTasks);

      const largestId = parsedTasks.reduce(
        (largest, task) => Math.max(largest, task.id),
        0
      );

      this.nextId = largestId + 1;

      this.storageMessage.set(
        'Saved tasks loaded from this browser.'
      );
    } catch {
      this.storageMessage.set(
        'Could not load saved tasks. Showing sample tasks.'
      );
    }
  }

  private isValidTaskList(value: unknown): value is Task[] {
    if (!Array.isArray(value)) {
      return false;
    }

    const usedIds = new Set<number>();

    for (const item of value) {
      if (
        typeof item !== 'object' ||
        item === null ||
        !('id' in item) ||
        !('title' in item) ||
        !('completed' in item)
      ) {
        return false;
      }

      if (
        typeof item.id !== 'number' ||
        !Number.isSafeInteger(item.id) ||
        item.id < 1 ||
        item.id >= Number.MAX_SAFE_INTEGER ||
        typeof item.title !== 'string' ||
        item.title.trim().length === 0 ||
        typeof item.completed !== 'boolean'
      ) {
        return false;
      }

      if (usedIds.has(item.id)) {
        return false;
      }

      usedIds.add(item.id);
    }

    return true;
  }
}