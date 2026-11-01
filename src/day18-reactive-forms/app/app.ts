import { Component } from '@angular/core';
import { JobTracker } from './components/job-tracker/job-tracker';

@Component({
   selector: 'app-root',
   standalone: true,
   imports: [JobTracker],
   templateUrl: './app.html',
   styleUrl: './app.css'
})
export class App {}