import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

interface StudentRegistration {
  fullName: string;
  email: string;
  course: string;
}

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registration-form.html',
  styleUrl: './registration-form.css'
})
export class RegistrationForm {
  readonly courses = [
    'Angular',
    'TypeScript',
    'JavaScript',
    'Node.js'
  ];

  student: StudentRegistration = this.createEmptyStudent();

  submittedStudent: StudentRegistration | null = null;

  private createEmptyStudent(): StudentRegistration {
    return {
      fullName: '',
      email: '',
      course: ''
    };
  }

  submitRegistration(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.submittedStudent = {
      ...this.student
    };
  }

  resetRegistration(form: NgForm): void {
    this.student = this.createEmptyStudent();
    this.submittedStudent = null;

    form.resetForm(this.student);
  }
}