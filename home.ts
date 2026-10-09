import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-home',
    imports: [RouterLink],
    templateUrl: './home.html',
    styleUrl: './home.css'
})
export class Home {
  developerName = 'Arnav';
  courseName = '60 Days of Angular';
  currentDay = 11;
  careerGoal = 'Junior Web Developer';
}