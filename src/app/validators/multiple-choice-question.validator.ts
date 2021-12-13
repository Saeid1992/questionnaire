import {
  AbstractControl,
  AsyncValidator,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
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
    const choice = control.value.choice as Choice;
    console.log(choice);
    if (choice) {
      return null;
    }
    return { errorMessage: 'Required!' };
  };
}

// export class CustomAsyncValidator implements AsyncValidator {
//   validate(
//     control: AbstractControl
//   ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
//     let result = new Observable<ValidationErrors | null>();
//     const choice = control.value.choice as Choice;
//     if (choice) {
//       result = of(null);
//     } else {
//       result = of({ errorMessage: 'Invalid!' });
//     }
//     return result;
//   }


// export function ValidateFormAsync() : AsyncValidatorFn {
//   return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
//     let result = new Observable<ValidationErrors | null>();
//     const choice = control.value.choice as Choice;
//     if (choice) {
//       result = of(null);
//     } else {
//       result = of({ errorMessage: 'Invalid!' });
//     }
//     return result;
//   };
// }
