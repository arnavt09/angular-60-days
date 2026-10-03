import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  email = 'arnav@example.come';

  github = 'github.com/yourusername';

  showMessage() {
    alert('Thanks for visiting my Angular Developer Dashboard!');
  }
}