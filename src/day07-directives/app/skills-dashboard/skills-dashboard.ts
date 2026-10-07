import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skills-dashboard',
  imports: [CommonModule],
  templateUrl: './skills-dashboard.html',
  styleUrl: './skills-dashboard.css'
})
export class SkillsDashboard {

  developerName = 'Arnav'

  showSkills = true;

  highlightsSkills = false;
  
  skills = [
    {
      name: 'Angular',
      level: 'Intermediate',
      progress: 70
    },
    {
      name: 'TypeScript',
      level: 'Intermediate',
      progress: 75
    },
    {
      name: 'HTML',
      level: 'Advanced',
      progress: 90
    },
    {
      name: 'CSS',
      level: 'Intermediate',
      progress: 70
    }
  ];
  
  toggleSkills() {
    this.showSkills = !this.showSkills;
  }

  toggleHighlight() {
    this.highlightsSkills = !this.highlightsSkills;
  }

  increaseProgress(index: number) {
    if (this.skills[index].progress < 100) {
      this.skills[index].progress += 5;
    }
  }

  decreaseProgress(index: number) {
    if (this.skills[index].progress > 0) {
      this.skills[index].progress -= 5;
    }
  }
}