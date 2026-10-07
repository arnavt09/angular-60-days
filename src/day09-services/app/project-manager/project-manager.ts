import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project-manager',
  imports: [FormsModule],
  templateUrl: './project-manager.html',
  styleUrl: './project-manager.css'
})
export class ProjectManager {

  projectName = '';
  technology = '';
  
  projects;

  constructor(private projectService: ProjectService) {
    this.projects = this.projectService.getProjects();
  }

  addProject() {

    if (
      this.projectName.trim() === '' ||
      this.technology.trim() === ''
    ) {
      return;
    }

    this.projectService.addProject(
      this.projectName,
      this.technology  
    );

    this.projectName = '';
    this.technology = '';
  }

  toggleProject(id: number) {
    this.projectService.toggleCompleted(id);
  }

  deleteProject(id: number) {
    this.projectService.deleteProject(id);

    this.projects = this.projectService.getProjects();
  }
}