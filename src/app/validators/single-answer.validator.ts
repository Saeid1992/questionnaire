import { AbstractControl } from '@angular/forms';
import { Choice } from '../models/multiple-choice-question';

export function RequiredSingleAnswerForMultipleChoice(
  control: AbstractControl
): { [key: string]: boolean } | null {
  const formValue = control.get('choice')?.value;
  if (!Array.isArray(formValue)) {
    return null;
  } else {
    let allOptions = formValue as Choice[];
    if (!allOptions.some((c) => c.selected === true)) {
      return { Required: true };
    }
    return null;
  }
}
