import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './day12-reactive-forms/app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
