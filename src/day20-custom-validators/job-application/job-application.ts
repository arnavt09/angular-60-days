import { Component, signal } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { companyNameValidator } from '../validators/company-name.validator';

import { passwordMatchValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './job-application.html',
  styleUrl: './job-application.css'
})
export class JobApplication {
  readonly successMessage = signal('');

  readonly jobForm = new FormGroup(
    {
        company: new FormControl('', {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.minLength(3),
            companyNameValidator
          ]
        }),
        password: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(8)]  
        }),

        confirmPassword: new FormControl('', {
            
        }),
        email: new FormControl('', {
          nonNullable: true,
          validators: [
            Validators.required, 
            Validators.email
          ]
        }),
    },
    {  
      validators: passwordMatchValidator   
    }
  );

  submitApplication(): void {
    this.successMessage.set('');

    if (this.jobForm.invalid) {
      this.jobForm.markAllAsTouched();
      return;
    }

    this.jobForm.reset();
    this.successMessage.set('Application submitted successfully.');
  }
}