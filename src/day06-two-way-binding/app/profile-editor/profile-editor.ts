import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-editor',
  imports: [FormsModule],
  templateUrl: './profile-editor.html',
  styleUrl: './profile-editor.css'
})
export class ProfileEditor {

  name = 'Arnav';
  jobTitle = 'Junior Web Developer';
  favoriteTechnology = 'Angular';
  yearsExperience = 0;

  saved = false;

  saveProfile() {
    this.saved = true;
  }

  resetProfile() {
    this.name = 'Arnav';
    this.jobTitle = 'Junior Web Developer';
    this.favoriteTechnology = 'Angular';
    this.yearsExperience = 0;

    this.saved = false;
  }
}