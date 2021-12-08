import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MultipleChoiceQuestion } from 'src/app/models/multiple-choice-question';
import { Question, QuestionType } from 'src/app/models/question.model';
import { TextQuestion } from 'src/app/models/text-question.model';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input() question: Question;
  textQuestion: TextQuestion;
  multipleChoiceQuestion: MultipleChoiceQuestion;
  questionType = QuestionType.Text;

  textQuestionType = '';
  multipleChoiceQuestionType = '';
  headline = '';
  required = false;

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

  onAnswerChanged(mcQuestion: MultipleChoiceQuestion) {
    const answeredQuestionId = this.questionsService.questionsWithAnswers.findIndex(
      item => item.identifier === mcQuestion.identifier
    );
    this.questionsService.questionsWithAnswers[answeredQuestionId] = mcQuestion;
    console.log(this.questionsService.questionsWithAnswers);
  }
}
