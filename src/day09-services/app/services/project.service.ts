import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private projects = [
    {
      id: 1,
      name: 'Assignment Tracker',
      technology: 'Angular',
      completed: false
    },
    {
      id: 2,
      name: 'Developer Portfolio',
      technology: 'TypeScript',
      completed: true
    },
    {
      id: 3,
      name: 'Task Manager',
      technology: 'Angular',
      completed: false
    }
  ];

  getProjects() {
    return this.projects;
  }

  addProject(name: string, technology: string) {
    const newProject = {
      id: this.projects.length + 1,
      name: name,
      technology: technology,
      completed: false
    };

    this.projects.push(newProject);
  }

  toggleCompleted(id: number) {
    const project = this.projects.find(
      project => project.id === id
    );

    if (project) {
      project.completed = !project.completed;
    }
  }
  
  deleteProject(id: number) {
    this.projects = this.projects.filter(
      project => project.id !== id
    );
  }
}