import { AbstractControl, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { Choice } from '../models/multiple-choice-question';

// export function ValidateMultipleChoiceQuestion(control: FormControl): {
//   [s: string]: boolean} {
//     const choices = control.get('choice')?.value as Choice[];
//     if(choices.some(ch => ch.selected === true)) {
//       return {'Required question: ' : true};
//     }

//     return null;
// }

export function ValidateMultipleChoiceQuestion(): ValidatorFn {
  return (control: AbstractControl) => {
    console.log(control);
    const choices = control.value.choice as Choice[];
    console.log(choices);
    if (choices.some(ch => ch.selected)) {
      return null;
    }
    return { errorMessage: 'Required!' };
  };
}