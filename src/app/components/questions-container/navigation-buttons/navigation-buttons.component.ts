import {
  AfterViewChecked,
  ChangeDetectorRef,
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
  //#region Inputs and Outputs
  @Input() isFirst = true;
  @Input() isLast = false;
  // @Input() isDisabled = true;
  isDisabled = true;
  //#endregion

  //#region Public properties
  symbolOfPreviousQuestion = '<';
  symbolOfNextQuestion = '>';
  nextQuestion = '';
  previousQuestion = '';
  //#endregion

  //#region Private Properties
  // Just for testing purposes
  first = false;
  last = true;
  //#endregion

  //#region Lifecycle hooks
  constructor(
    private globalValuesService: GlobalValuesService,
    private questionsService: QuestionsService,
  ) {
    this.nextQuestion = this.globalValuesService.NEXT_QUESTION_TEXT;
    this.previousQuestion = this.globalValuesService.PREVIOUS_QUESTION_TEXT;
  }

  ngOnInit(): void {
    this.questionsService.isFormValid.subscribe((isValid) => {
      console.log(isValid);
      this.isDisabled = !isValid;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.first = this.isFirst;
    this.last = this.isLast;
  }

  //#endregion

  //#region Public methods

  /**
   * Emits the value of the direction change (informs the parent component about switching the question)
   * @param direction The direction to which the user intends to navigate
   */
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
  //#endregion


}
