import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Choice,
  MultipleChoiceQuestion,
} from 'src/app/models/multiple-choice-question';
import { QuestionType } from 'src/app/models/question.model';
import { TextQuestion } from 'src/app/models/text-question.model';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent {
  //#region Public properties
  title = '';
  cleanResult: [string, string, string][];
  firstPageUrl = '';
  //#endregion

  //#region Private properties
  private recievedKey = '';
  private actualKey = '';
  private finalResult: Array<TextQuestion | MultipleChoiceQuestion>;
  private answerConnector = '';
  private multipleAnswers: string[] = [];
  //#endregion

  //#region Lifecycle hooks
  constructor(
    private questionsService: QuestionsService,
    private globalValuesService: GlobalValuesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.recievedKey = this.activatedRoute.snapshot.params.key;
    this.actualKey = this.questionsService.resultsKey;
    if (this.recievedKey !== this.actualKey) {
      this.router.navigateByUrl('');
    }
    this.title = this.questionsService.questionnaireTitle;
    this.finalResult = this.questionsService.questionsWithAnswers;
    this.cleanResult = [];
    this.answerConnector = this.globalValuesService.MULTI_ANSWER_CONNECTOR;
    this.prepareResult();
    this.firstPageUrl = '/';
  }

  //#endregion

  //#region Private methods

  /**
   * Provides the collection of questions and their responding answer given by the user
   */
  private prepareResult(): void {
    let questionId = '';
    let questionTitle = '';
    let userAnswer = '';
    let selectedOptions: Choice[] = [];
    let textQuestion: TextQuestion;
    let multipleChoiceQuestion: MultipleChoiceQuestion;

    for (const questionItem of this.finalResult) {
      questionId = questionItem.identifier;
      questionTitle = questionItem.headline;
      switch (questionItem.question_type) {
        case QuestionType.Text:
          textQuestion = questionItem as TextQuestion;
          userAnswer = textQuestion.answer ?? '';
          break;
        case QuestionType.MultipleChoice:
          multipleChoiceQuestion = questionItem as MultipleChoiceQuestion;
          if (multipleChoiceQuestion.multiple) {
            this.multipleAnswers = [];
            selectedOptions = multipleChoiceQuestion.choices.filter(
              (ch) => ch.selected
            );
            if (selectedOptions.length > 0) {
              selectedOptions.forEach((opt) =>
                this.multipleAnswers.push(opt.value)
              );
              userAnswer = this.multipleAnswers.join(this.answerConnector);
            }
          } else {
            userAnswer =
              multipleChoiceQuestion.choices.find((ch) => ch.selected)?.value ??
              '';
          }
          break;
      }
      if (!questionItem.skipped) {
        this.cleanResult.push([questionId, questionTitle, userAnswer]);
      }
    }
  }
  //#endregion
}
