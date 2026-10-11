import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from './task.service';

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

  addTask(): void {
    this.errorMessage = this.taskService.addTask(this.newTaskTitle);
    
    if (!this.errorMessage) {
      this.newTaskTitle = '';
    }
  }

  toggleTask(id: number): void {
    this.taskService.toggleTask(id);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
  }
}