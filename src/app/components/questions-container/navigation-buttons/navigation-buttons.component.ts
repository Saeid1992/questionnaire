import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.css'],
})
export class NavigationButtonsComponent implements OnInit {
  //#region Inputs and Outputs
  @Input() isFirst = true;
  @Input() isLast = false;
  //#endregion

  //#region Public properties
  symbolOfPreviousQuestion = this.globalValuesService.PREVIOUS_QUESTION_SYMBOL;
  symbolOfNextQuestion = this.globalValuesService.NEXT_QUESTION_SYMBOL;
  nextQuestion = '';
  previousQuestion = '';
  resultPage = '';
  isNotValid = false;
  canViewResultPage = true;
  //#endregion

  //#endregion

  //#region Lifecycle hooks
  constructor(
    private globalValuesService: GlobalValuesService,
    private questionsService: QuestionsService,
    private router: Router
  ) {
    this.nextQuestion = this.globalValuesService.NEXT_QUESTION_TEXT;
    this.previousQuestion = this.globalValuesService.PREVIOUS_QUESTION_TEXT;
    this.resultPage = this.globalValuesService.RESULT_PAGE;
  }

  ngOnInit(): void {
    this.questionsService.isValid.subscribe((isFormValid) => {
      this.isNotValid = !isFormValid;
    });
    this.questionsService.isLastQuestionValid.subscribe((isValid) => {
      this.canViewResultPage = isValid;
    });
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

  /**
   * Navigates to the result page
   */
  navigateToResultPage(): void {
    let secretKey = this.questionsService.resultsKey;
    this.router.navigate([this.resultPage, secretKey]);
  }
  //#endregion
}
