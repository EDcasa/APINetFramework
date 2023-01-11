import { FormGroup, AbstractControl } from "@angular/forms";

// To validate password and confirm password
export function validateMinValueSaving(
  amount: string
) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[amount];
    control.setErrors({ mustMatch: true });
    if (parseInt(amount) > 100) {
      return;
    }

    if (parseInt(control.value) < 100) {
        control.setErrors({ mustMatch: true });
    } else {
      control.setErrors(null);
    }
  };
}