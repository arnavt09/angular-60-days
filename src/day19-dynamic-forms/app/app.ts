import { bootstrapApplication } from "@angular/platform-browser";
import { appConfig } from "../../app/app.config";
import { JobForm } from "../job-form/job-form";
import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JobForm],
  template: '<app-job-form></app-job-form>'
})
export class App {}