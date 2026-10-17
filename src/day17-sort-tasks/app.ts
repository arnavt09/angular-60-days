import { Component } from '@angular/core';
import { TaskList } from './task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaskList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}