import { Component } from '@angular/core';

@Component({
  selector: 'app-skills-tracker',
  imports: [],
  templateUrl: './skills-tracker.html',
  styleUrl: './skills-tracker.css'
})
export class SkillsTracker {

  developerName = 'Arnav';

  currentSkill = 'Angular';

  skillLevel = 'Beginner';

  progress = 10;

  imageUrl = 'https://angular.dev/assets/images/press-kit/angular_icon_gradient.gif';

  buttonDisabled = false;

  increaseProgress() {
    this.progress += 10;

    if (this.progress >= 100) {
      this.progress = 100;
      this.skillLevel = 'Completed';
      this.buttonDisabled = true;
    }
  }

  resetProgress() {
    this.progress = 0;
    this.skillLevel = 'Beginner';
    this.buttonDisabled = false;
  }

  changeSkill() {
    this.currentSkill = 'TypeScript';
    this.skillLevel = 'Learning';
    this.buttonDisabled = false;
  }
}