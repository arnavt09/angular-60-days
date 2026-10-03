import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.css'
})
export class Profile {
  developerName = 'Arnav';
  program = 'Web Development';
  school = 'Durham Technical Community College';
  careerGoal = 'Junior Web Developer';

  status = 'Currently Learning Angular';
  
  updateStatus() {
    this.status = 'Building Angular Applications!';
  }
}