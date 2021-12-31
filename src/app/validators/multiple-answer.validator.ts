import { AbstractControl, FormArray } from '@angular/forms';

export function RequiredMultipleAnswerForMultipleChoice(
  control: AbstractControl
): { [key: string]: boolean } | null {
  let optionsFormArray = control.get('options') as FormArray;
  let options = optionsFormArray.at(0);
  if (!options) {
    return null;
  } else {
    let selected: boolean;
    for (const key in options.value) {
      selected = options.value[key];
      if (selected) {
        return null;
      }
    }
    return { Required: true };
  }
}
