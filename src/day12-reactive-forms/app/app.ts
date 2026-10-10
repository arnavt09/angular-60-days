import { Component } from '@angular/core';
import { AccountForm } from './account-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccountForm],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}