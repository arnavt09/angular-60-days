import { Component } from '@angular/core';
import { RegistrationForm} from './registration-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistrationForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}