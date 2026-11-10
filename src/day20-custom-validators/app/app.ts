import { Component } from '@angular/core';
import { JobApplication } from '../job-application/job-application';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JobApplication],
  template: '<app-job-application></app-job-application>'
})
export class App {}