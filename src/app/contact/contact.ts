import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {
  email = 'arnav@example.com';
  github = 'github.com/yourusername';

  showMessage() {
    alert('Thanks for cisiting my Angular Developer Dashboard!');
  }
}