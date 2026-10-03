import { Component } from '@angular/core';

import { Profile } from './profile/profile';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-root',
  imports: [
    Profile,
    Skills,
    Projects,
    Contact
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  courseName = '60 Days of Angular';
  currentDay = 2;
}