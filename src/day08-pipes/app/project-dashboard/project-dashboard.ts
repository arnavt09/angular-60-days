import { Component } from '@angular/core';

import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  LowerCasePipe,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe
} from '@angular/common';

@Component({
  selector: 'app-project-dashboard',
  imports: [
    UpperCasePipe,
    LowerCasePipe,
    TitleCasePipe,
    DatePipe,
    CurrencyPipe,
    PercentPipe,
    DecimalPipe
  ],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.css'
})
export class ProjectDashboard {

  developerName = 'arnav tripathy';
  courseName = 'angular web development';
  email = 'ARNAV@EXAMPLE.COM';

  currentDate = new Date();

  projectBudget = 2500;
  projectProgress = 0.75;
  hoursWorked = 42.5678;

  projects = [
    {
      name: 'assignment tracker',
      technology: 'angular',
      budget: 1200,
      progress: 0.80,
      startDate: new Date(2026, 8, 15)  
    },
    {
      name: 'developer portfolio',
      technology: 'typescript',
      budget: 850,
      progress: 0.65,
      startDate: new Date(2026, 9, 1)
    },
    {
      name: 'task manager',
      technology: 'angular',
      budget: 1500,
      progress: 0.45,
      startDate: new Date(2026, 9, 5)  
    }
  ];
}