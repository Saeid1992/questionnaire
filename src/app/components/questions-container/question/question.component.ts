import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { questionChange } from 'src/app/animations/change-question.animate';
import { MultipleChoiceQuestion } from 'src/app/models/multiple-choice-question';
import { Question, QuestionType } from 'src/app/models/question.model';
import { TextQuestion } from 'src/app/models/text-question.model';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
  animations: [questionChange]
  // animations: [
  //   trigger('questionState', [
  //     state(
  //       'comingIn',
  //       style({
  //         opacity: 0.8,
  //       })
  //     ),
  //     state(
  //       'goingOut',
  //       style({
  //         opacity: 0.3,
  //       })
  //     ),
  //     transition('comingIn => goingOut', animate(1000)),
  //     transition('goingOut => comingIn', animate(1000)),
  //   ]),
  // ],
})
export class QuestionComponent implements OnInit, OnChanges {
  // @Input() question: Question;
  @Input() set question(question: Question) {
    this.questionState = 'entering';
    this._q= question;
  }
  get question() { return this._q };
  _q: Question = {} as Question;

  questionState: 'entering' | 'done' = 'done';
  textQuestion: TextQuestion;
  multipleChoiceQuestion: MultipleChoiceQuestion;
  questionType = QuestionType.Text;

  textQuestionType = '';
  multipleChoiceQuestionType = '';
  headline = '';
  required = false;
  // state = 'comingIn';

  constructor(
    private globalValuesService: GlobalValuesService,
    private questionsService: QuestionsService
  ) {
    this.textQuestionType = this.globalValuesService.TEXT_QUESTION_TYPE;
    this.multipleChoiceQuestionType =
      this.globalValuesService.MULTIPLE_CHOICE_QUESTION_TYPE;
    this.textQuestion = {} as TextQuestion;
    this.multipleChoiceQuestion = {} as MultipleChoiceQuestion;
    // Deep copy
    this.question = JSON.parse(
      JSON.stringify(this.globalValuesService.DEFAULT_QUESTION)
    ) as Question;
    console.log(this.question);
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.question.isFirstChange()) {
      this.question = changes.question.currentValue;
      this.questionType = this.question.question_type;
      this.headline = this.question.headline;
      this.required = this.question.required;
      switch (this.questionType) {
        case QuestionType.Text:
          this.textQuestion = this.question as TextQuestion;
          break;
        case QuestionType.MultipleChoice:
          this.multipleChoiceQuestion = this.question as MultipleChoiceQuestion;
          break;
        default:
          break;
      }
    }
  }

  onSelectionChanged(mcQuestion: MultipleChoiceQuestion) {
    const answeredQuestionId =
      this.questionsService.questionsWithAnswers.findIndex(
        (item) => item.identifier === mcQuestion.identifier
      );
    this.questionsService.questionsWithAnswers[answeredQuestionId] = mcQuestion;
    console.log(this.questionsService.questionsWithAnswers);
  }

  onTextChanged(textQuestion: TextQuestion) {
    console.log(textQuestion);
    const answeredQuestionId =
      this.questionsService.questionsWithAnswers.findIndex(
        (item) => item.identifier === textQuestion.identifier
      );
    this.questionsService.questionsWithAnswers[answeredQuestionId] =
      textQuestion;
    console.log(this.questionsService.questionsWithAnswers);
  }
}
