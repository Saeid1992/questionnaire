import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Questionnaire } from 'src/app/models/questionnaire.model';
import { MultipleChoiceQuestion } from 'src/app/models/multiple-choice-question';
import { TextQuestion } from 'src/app/models/text-question.model';
import { QuestionType, SimpleJump } from 'src/app/models/question.model';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.css'],
})
export class QuestionsContainerComponent implements OnInit {
  questionnaire: Questionnaire;
  title = '';
  description = '';
  allQuestions: Array<TextQuestion | MultipleChoiceQuestion>;
  firstQuestionIndex = 0;
  lastQuestionIndex = 0;
  previous = '';
  next = '';
  currentQuestionType = QuestionType.Text;
  currentQuestion: TextQuestion | MultipleChoiceQuestion;
  isFirstQuestion = true;
  isLastQuestion = false;
  formerQuestionsIndex: number[] = [];
  previousQuestionSymbol = '<';
  nextQuestionSymbol = '>';
  resultPageUrl = '';
  passedQuestions = 0;
  totalQuestions = 0;
  toNext = true;
  isValid!: boolean;
  animationType = '';

  constructor(
    private questionsService: QuestionsService,
    private globalValuesService: GlobalValuesService,
    private router: Router
  ) {
    this.questionnaire = {} as Questionnaire;
    this.allQuestions = [];
    this.currentQuestion = {} as TextQuestion; // or as MultipleChoiceQuestion
    this.resultPageUrl = globalValuesService.RESULT_PAGE;
    this.previous = this.globalValuesService.PREVIOUS_QUESTION_TEXT;
    this.next = this.globalValuesService.NEXT_QUESTION_TEXT;
  }

  ngOnInit(): void {
    this.getDataFromFile();
    this.questionsService.questionChanged.subscribe((direction) => {
      this.onQuestionChanged(direction);
    });
  }

  private getDataFromFile(): void {
    this.questionsService.getAllQuestions().subscribe((data: Questionnaire) => {
      this.questionnaire = data;
      this.title = this.questionsService.questionnaireTitle;
      this.description = data.description;
      this.questionsService.questionsWithAnswers = JSON.parse(
        JSON.stringify(this.questionnaire.questions)
      );
      this.totalQuestions = this.questionsService.questionsWithAnswers.length;
      this.lastQuestionIndex = this.totalQuestions - 1;
      this.startQuestionnaire();
    });
  }

  private startQuestionnaire(): void {
    let firstQuestion =
      this.questionsService.questionsWithAnswers[this.firstQuestionIndex];
    this.currentQuestion = firstQuestion;
  }

  onQuestionChanged(changeDirection: string) {
    console.log(changeDirection);
    switch (changeDirection) {
      case this.previous:
        this.animationType = 'leave-from-right';
        setTimeout(() => {
          this.navigateToPreviousQuestion(this.currentQuestion);
          this.animationType = 'enter-from-left';
        }, 200);
        break;
      case this.next:
        this.animationType = 'leave-from-left';
        setTimeout(() => {
          this.navigateToNextQuestion(this.currentQuestion);
          this.animationType = 'enter-from-right';
        }, 200);
        break;
      default:
        break;
    }
  }

  navigateToPreviousQuestion(
    currQuestion: TextQuestion | MultipleChoiceQuestion
  ) {
    let index = this.questionsService.questionsWithAnswers.findIndex(
      (question) => question.identifier === currQuestion.identifier
    );
    let previousQuestionProbableIndex = index - 1;
    let previousQuestionRealIndex = this.formerQuestionsIndex.pop() as number;
    if (index === 1) {
      this.isFirstQuestion = true;
    }
    if (previousQuestionRealIndex !== previousQuestionProbableIndex) {
      let skippedQuestions: Array<TextQuestion | MultipleChoiceQuestion> = [];
      skippedQuestions = this.questionsService.questionsWithAnswers.slice(
        previousQuestionRealIndex + 1,
        index
      );
      skippedQuestions.forEach((sq) => (sq.skipped = false));
    }
    this.passedQuestions = previousQuestionRealIndex;
    this.currentQuestion =
      this.questionsService.questionsWithAnswers[previousQuestionRealIndex];
    this.isLastQuestion = false;
  }

  navigateToNextQuestion(currQuestion: TextQuestion | MultipleChoiceQuestion) {
    const questionId = currQuestion.identifier;
    let userAnswer = '';
    let index = this.questionsService.questionsWithAnswers.findIndex(
      (question) => question.identifier === questionId
    );
    this.formerQuestionsIndex.push(index);
    let nextQuestionProbableIndex = index + 1;
    let nextQuestionRealIndex = nextQuestionProbableIndex;
    if (index === this.lastQuestionIndex - 1) {
      this.isLastQuestion = true;
    }
    if (currQuestion.jumps.length > 0) {
      let skippedQuestions: Array<TextQuestion | MultipleChoiceQuestion> = [];
      userAnswer = this.findUserAnswer(currQuestion);
      const nextQuestionId = this.findNextQuestionId(currQuestion, userAnswer);
      nextQuestionRealIndex =
        this.questionsService.questionsWithAnswers.findIndex(
          (item) => item.identifier === nextQuestionId
        );

      if (nextQuestionProbableIndex !== nextQuestionRealIndex) {
        skippedQuestions = this.questionsService.questionsWithAnswers.slice(
          nextQuestionProbableIndex,
          nextQuestionRealIndex
        ); // slice performs a shallow copy
        skippedQuestions.forEach((sq) => (sq.skipped = true));
      }
    }
    this.passedQuestions = nextQuestionRealIndex;
    this.currentQuestion =
      this.questionsService.questionsWithAnswers[nextQuestionRealIndex];
    this.isFirstQuestion = false;
  }

  private findUserAnswer(
    question: TextQuestion | MultipleChoiceQuestion
  ): string {
    let answer = '';
    let textQuestion: TextQuestion;
    let multipleChoiceQuestion: MultipleChoiceQuestion;

    switch (question.question_type) {
      case QuestionType.Text:
        textQuestion = question as TextQuestion;
        answer = textQuestion.answer ?? '';
        break;
      case QuestionType.MultipleChoice:
        multipleChoiceQuestion = question as MultipleChoiceQuestion;
        answer =
          multipleChoiceQuestion.choices.find((item) => item.selected)?.value ??
          multipleChoiceQuestion.choices[0].value;
        break;
      default:
        break;
    }
    return answer;
  }

  private findNextQuestionId(
    question: TextQuestion | MultipleChoiceQuestion,
    answer: string
  ): string {
    let simpleJumpsInfo = question.jumps as SimpleJump[];
    const nextQuestionId = simpleJumpsInfo.find(
      (jInfo) => jInfo.value === answer
    )?.targetQuestionId as string;
    return nextQuestionId;
  }

  navigateToResultPage() {
    let secretKey = this.questionsService.resultsKey;
    // this.router.navigateByUrl(`/result`);
    console.log(secretKey);
    this.router.navigate(['/result',secretKey]);
  }

  specifyClass() {
    return this.animationType;
  }

  calculatePercentageOfCompletion(): string {
    let percentageOfCompletion = Math.round(
      (this.passedQuestions / this.totalQuestions) * 100
    );
    return percentageOfCompletion + '%';
  }
}
