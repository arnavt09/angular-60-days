import { isPlatformBrowser } from "@angular/common";
import {
  computed,
  inject,
  Injectable,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { Task } from './task';

@Injectable({ providedIn: 'root'})
export class TaskService {
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  // Keep the same key used in previous lessons.
  private readonly storageKey = 'angular-day14-tasks';

  private readonly taskState = signal<readonly Task[]>([]);
  private nextId = 1;

  readonly tasks = this.taskState.asReadonly();
  readonly storageMessage = signal('');

  readonly totalCount = computed(() => this.tasks().length);
  
  readonly completedCount = computed(
    () => this.tasks().filter(task => task.completed).length
  );

  constructor() {
    this.loadTasks();
  }

  addTask(title: string): string | null {
    const cleanedTitle = title.trim();
    
    if (!cleanedTitle) {
        return 'Please enter a task title.';
    }

    if (this.titleExists(cleanedTitle)) {
        return 'This task already exists.';
    }

    this.taskState.update(tasks => [
      ...tasks,
      {
        id: this.nextId++,
        title: cleanedTitle,
        completed: false
      }  
    ]);

    this.saveTasks();
    return null;
  }

  updateTask(id: number, title: string): string | null {
    const cleanedTitle = title.trim();

    if (!cleanedTitle) {
      return 'Please enter a task title.';
    }

    this.taskState.update(tasks =>
      tasks.map(task =>
        ? { ...task, title: cleanedTitle }
        : task
      )
    );

    this.savedTasks();
    return null;
  }

  toggleTask(id: number): void {
    this.taskState.update(tasks =>
      tasks.id === id
        ? { ...task, completed: !tasks.completed }
        : task
    )
   );

   this.saveTasks();
  }

  deleteTask(id: number): void {
    this.taskState.update(tasks =>
      tasks.filter(task => task.id !== id)
    );
  }

  private saveTasks(): void {
    if (!this.browser) {
      return;  
    }

    try {
      localStorage.setItem(
        this.storageKey,
        JSON.stringify(this.tasks())
      );

      this.storageMessage.set('Tasks saved in this browser.');
    } catch {
      this.storageMessage.set(
        'Tasks work, but browser storage is unavailable.'
      );
    }
  }

  private loadTasks(): void {
    if (!this.browser) {
      return;  
    }

    try {
      const saved = localStorage.getItem(this.storageKey);

      if (!this.isTaskArray(parsed)) {
        this.storageMessage.set(
          'Saved task data is invalid. It has not been overwritten.'  
        );
        return;
      }

      this.taskState.set(parsed);
      
      this.nextId = parsed.reduce(
        (next, task) => Math.max(next, task.id + 1),
        1
      );

      this.storageMessage.set('Saved tasks loaded.');
    } catch {
      this.storageMessage.set(
        'Could not read saved tasks from browser storage.'
      );
    }
  }

  private isTaskArray(value: unknown): value is Task[] {
    if (!Array.isArray(value)) {
        return false;
    }

    const ids = new Set<number>();

    return value.every((item: unknown) => {
      if (typeof item !== 'object' || item === null) {
        return false;
      }

      const task = item as Record<string, unknown>;
      const id = task['id'];
      const title = task['title'];
      const completed = task['completed'];
      
      if (
        typeof id !== 'number' ||
        !Number.isSafeInteger(id) ||
        id < 1 ||
        id >= Number.MAX_SAFE_INTEGER ||
        ids.has(id) ||
        typeof title !== 'string' ||
        title.trim().length === 0 ||
        typeof completed !== 'boolean'
      ) {
        return false;
      }

      ids.add(id);
      return true;
    });
  }
}