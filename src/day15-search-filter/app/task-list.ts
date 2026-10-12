import { Component, computed, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TaskService } from "./task.service";

type TaskFilter = 'all' | 'pending' | 'completed';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  readonly taskService = inject(TaskService);

  newTaskTitle = '';
  errorMessage = '';

  readonly searchText = signal('');
  readonly selectedFilter = signal<TaskFilter>('all');

  readonly filteredTasks = computed(() => {
    const tasks = this.taskService.tasks();
    const search = this.searchText().trim().toLowerCase();
    const filter = this.selectedFilter();

    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search);

      const matchesStatus =
        filter === 'all' ||
        (filter === 'pending' && !task.completed) ||
        (filter === 'completed' && task.completed);

      return matchesSearch && matchesStatus;
    });
  });

  addTask(): void {
    const error = this.taskService.addTask(this.newTaskTitle);

    if (error) {
      this.errorMessage = error;
      return;
    }

    this.newTaskTitle = '';
    this.errorMessage = '';
  }
  
  setFilter(filter: TaskFilter): void {
    this.selectedFilter.set(filter);
  }

  clearFilters(): void {
    this.searchText.set('');
    this.selectedFilter.set('all');
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}