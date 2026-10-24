import { 
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from "@angular/forms";

export function companyNameValidator(): ValidatorFn {
  return (
    control: AbstractControl
  ): ValidationErrors | null => {

    const company = String(control.value ?? '').trim();
    
    if (!company) {
      return null;
    }

    if (company.toLowerCase() === 'test') {
      return { invalidCompany: true };
    }

    return null;
  };  
}