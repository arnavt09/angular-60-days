import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

const passwordsMatch: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (!password || !confirmPassword) {
    return null;
  }

  return password === confirmPassword
    ? null
    : { passwordMismatch: true };
};

interface AccountSummary {
  fullName: string;
  email: string;
}

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account-form.html',
  styleUrl: './account-form.css'
})
export class AccountForm {
  submitted = false;
  accountSummary: AccountSummary | null = null;

  readonly accountForm = new FormGroup(
    {
      fullName: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/\S/)
        ]
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email
        ]
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(8)
        ]
      }),
      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    },
    { validators: passwordsMatch }
  );

  get controls() {
    return this.accountForm.controls;
  }

  showError(controlName: keyof typeof this.accountForm.controls): boolean {
    const control = this.controls[controlName];

    return control.invalid && (control.touched || this.submitted);
  }

  get showPasswordMismatch(): boolean {
    return (
      this.accountForm.hasError('passwordMismatch') &&
      (this.controls.confirmPassword.touched || this.submitted)
    );
  }

  submitAccount(): void {
    this.submitted = true;

    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }

    const values = this.accountForm.getRawValue();

    this.accountSummary = {
      fullName: values.fullName,
      email: values.email
    };
  }

  resetAccount(): void {
    this.accountForm.reset();
    this.submitted = false;
    this.accountSummary = null;
  }
}