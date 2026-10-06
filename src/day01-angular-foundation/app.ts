import { Component } from '@angular/core';
import { TaskManager } from '../day05-event-handling/app/task-manager/task-manager';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  developerName = 'Arnav';
  program = 'Web Development';
  school = 'Durham Technocal Community College';
  careerGoal = 'Junior Web Developer';

  courseName = '60 Days of Angular';
  currentDay = 1;

  status = 'Currently Learning Angular';

  projectsCompleted = 0;

  profileImage = 'https://placehold.co/150x150';

  updateStatus() {
    this.status = 'Building Angular Applications!';
  }

  completeProject() {
    this.projectsCompleted++;
  }

  resetProjects() {
    this.projectsCompleted = 0;
  }

  showMessage() {
    alert('Welcome to my Angular Development Dashboard!');
  }
}