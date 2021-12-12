import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.css'],
})
export class NavigationButtonsComponent implements OnInit, OnChanges {
  @Input() isFirst = true;
  @Input() isLast = false;
  // @Input() isDisabled = true;
  // isDisabled = true;
  // @Output() questionChanged = new EventEmitter<string>();

  symbolOfPreviousQuestion = '<';
  symbolOfNextQuestion = '>';

  nextQuestion = '';
  previousQuestion = '';

  constructor(private globalValuesService: GlobalValuesService,
              private questionsService: QuestionsService) {
    this.nextQuestion = this.globalValuesService.NEXT_QUESTION_TEXT;
    this.previousQuestion = this.globalValuesService.PREVIOUS_QUESTION_TEXT;
  }

  ngOnInit(): void {
    // this.questionsService.isFormValid.subscribe((isValid) => {
    //   this.isDisabled = !isValid;
    //   console.log(isValid);
    // });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  changeCurrentQuestion(direction: string): void {
    switch (direction) {
      case this.previousQuestion:
        this.questionsService.questionChanged.emit(this.previousQuestion);
        break;
      case this.nextQuestion:
        this.questionsService.questionChanged.emit(this.nextQuestion);
        break;
    }
  }
}
