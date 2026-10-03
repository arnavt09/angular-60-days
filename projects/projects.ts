import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {

  projectsCompleted = 0;
  
  completeProject() {
    this.projectsCompleted++;
  }

  resetProjects() {
    this.projectsCompleted = 0;
  }
}