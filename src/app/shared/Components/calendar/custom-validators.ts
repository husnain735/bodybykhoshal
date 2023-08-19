import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function timeRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const startDate = control.get('startDate').value;
    const endDate = control.get('endDate').value;

    if (startDate && endDate) {
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const hoursDiff = timeDiff / 1800000;

      if (hoursDiff < 1 || hoursDiff > 1) {
        return { timeRangeError: true };
      }
    }

    return null;
  };
}
