import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('passwordConfirm').value)
    return null;
  else
    return {passwordMismatch: true};
};
