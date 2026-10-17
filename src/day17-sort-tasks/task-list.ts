import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from './task';
import { TaskService } from './task.service';
import { sign } from 'node:crypto';

type TaskFilter = 'all' | 'pending' | 'completed';
type TaskSort = 'newest' | 'oldest' | 'az' | 'za';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-html',
  styleUrl: './task-list.css'  
})
export class TaskList {
  readonly taskService = inject(TaskService);

  newTaskTitle = '';
  errorMessage = '';

  editingTaskId: number | null = null;
  editTitle = '';
  editError = '';

  readonly searchText = signal('');
  readonly selectedFilter = signal<TaskFilter>('all');
  readonly selectedSort = signal<TaskSort>('newest');

  readonly visibleTasks = computed(() => {
    const search = this.searchText().trim().toLowerCase();
    const filter = this.selectedFilter();
    const sort = this.selectedSort();

    const tasks = this.taskService.tasks().filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search);

      const matchesStatus =
        filter === 'all' ||
        (filter === 'pending' && !task.completed) ||
        (filter === 'completed' && task.completed);

      return matchesSearch && matchesStatus;
    });

    // Sort a copy so the service's stored array stays unchanged.
    return [...tasks].sort((a, b) => {
      switch (sort) {
        case 'oldest':
          return a.id - b.id;

        case 'az':
          return (
            a.title.localeCompare(b.title, 'en', {
              sensitivity: 'base'
            }) || a.id - b.id
          );

        case 'za':
          return (
            b.title.localeCompare(a.title, 'en', {
              sensitivity: 'base'
            }) || a.id - b.id
          );

        default:
          return b.id - a.id;
      }
    });
  });

  addTask(): void {
    const error = this.taskService.addTask(this.newTaskTitle);

    this.errorMessage = error ?? '';

    if (!error) {
      this.newTaskTitle = '';
    }
  }

  startEdit(task: Task): void {
    this.editingTaskId = task.id;
    this.editTitle = task.title;
    this.editError = '';
  }

  saveEdit(): void {
    if (this.editingTaskId === null) {
      return;
    }

    const error = this.taskService.updateTask(
      this.editingTaskId,
      this.editTitle
    );

    this.editError = error ?? '';

    if (!error) {
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.editingTaskId = null;
    this.editTitle = '';
    this.editError = '';
  }

  setFilter(filter: TaskFilter): void {
    this.selectedFilter.set(filter);
  }

  setSort(value: string): void {
    if (
      value === 'newest' ||
      value === 'oldest' ||
      value === 'az' ||
      value === 'za'
    ) {
      this.selectedSort.set(value);
    }
  }

  resetControls(): void {
    this.searchText.set('');
    this.selectedFilter.set('all');
    this.selectedSort.set('newest');
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);

    if (this.editingTaskId === id) {
      this.cancelEdit();
    }
  }
}