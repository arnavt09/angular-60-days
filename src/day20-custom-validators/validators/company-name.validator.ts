import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function companyNameValidator(): ValidatorFn {
  return (
    control: AbstractControl
  ): ValidationErrors | null => {
    const value = String(control.value ?? '').trim();

    if (!value) {
      return null;
    }

    if (!/^[a-zA-Z0-9 .&'-]+$/.test(value)) {
      return { invalidCompanyName: true };  
    }

    return null;
  };
}