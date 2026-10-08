import { Component } from '@angular/core';
import { LearningDashboard } from './app/learning-dashboard/learning-dashboard';

@Component({
  selector: 'app-root',
  imports: [LearningDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}