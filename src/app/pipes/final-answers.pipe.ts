import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'displayAnswer'})
export class DisplayFinalAnswerPipe implements PipeTransform {
  transform(value: string) : string {
    let result = 'Keine Antwort';
    if(value) {
      result = value;
    }
    return result;
  }
}
