import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ValidatorsHelper {
  static mustMatch(passwordControl: AbstractControl): ValidatorFn {
    return (cpasswordControl: AbstractControl): { [key: string]: boolean } | null => {
      if (!passwordControl && !cpasswordControl) {
        return null;
      }
      if (cpasswordControl.hasError && !passwordControl.hasError) {
        return null;
      }
      if (cpasswordControl.value !== passwordControl.value) {
        return { mustMatch: true };
      } else {
        return null;
      }
    };
  }
  static mustSmall(controller: AbstractControl): ValidatorFn {
    return (currentController: AbstractControl): { [key: string]: boolean } | null => {
      if (!controller && !currentController) {
        return null;
      }
      if (+currentController.value > +controller.value) {
        return { mustSmall: true };
      } else {
        return null;
      }
    };
  }
}
