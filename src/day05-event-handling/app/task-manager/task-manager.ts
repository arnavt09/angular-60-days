import { Component } from '@angular/core';

@Component({
  selector: 'app-task-manager',
  imports: [],
  templateUrl: './task-manager.html',
  styleUrl: './task-manager.css'
})
export class TaskManager {

  developerName = 'Arnav';

  taskName = '';

  lastAction = 'No action yet';

  completedTasks = 0;

  buttonMessage = 'Move your mouse over this button';

  updateTask(event: Event) {
    const input = event.target as HTMLInputElement;
    
    this.taskName = input.value;
  }

  addTask() {
    if (this.taskName.trim() === '') {
      this.lastAction = 'Please enter a task.';
      return;  
    }

    this.lastAction = `Added task: ${this.taskName}`;

    this.taskName = '';
  }

  completeTask() {
    this.completedTasks++;

    this.lastAction = 'Task completed!';
  }

  resetTasks() {
    this.completedTasks = 0;

    this.lastAction = 'Task completed!';
  }
  
  mouseEnter() {
    this.buttonMessage = 'Mouse is over the button!';
  }

  mouseLeave() {
    this.buttonMessage = 'Mouse left the button.'
  }
}