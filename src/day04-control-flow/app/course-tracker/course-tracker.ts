import { Component } from '@angular/core';

@Component({
   selector: 'app-course-tracker',
   imports: [],
   templateUrl: './course-tracker.html',
   styleUrl: './course-tracker.css'
})
export class CourseTracker {

  studentName = 'Arnav';

  showCourses = true;

  currentLevel = 'beginner';

  courses = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'HTML',
    'CSS'
  ];

  toggleCourses() {
    this.showCourses = !this.showCourses;
  }
  
  setLevel(level: string) {
    this.currentLevel = level;
  }
}