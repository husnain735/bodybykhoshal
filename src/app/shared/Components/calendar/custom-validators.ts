import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function timeRangeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    debugger
    const startDate = control.get('startDate').value;
    const endDate = control.get('endDate').value;

    if (startDate && endDate) {
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const hoursDiff = timeDiff / 3600000;

      if (hoursDiff < 2 || hoursDiff > 2) {
        return { timeRangeError: true };
      }
    }

    return null;
  };
}
