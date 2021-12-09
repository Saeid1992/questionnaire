import {
  AfterViewChecked,
  Component,
  OnInit,
} from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Questionnaire } from 'src/app/models/questionnaire.model';
import { MultipleChoiceQuestion } from 'src/app/models/multiple-choice-question';
import { TextQuestion } from 'src/app/models/text-question.model';
import { QuestionType, SimpleJump } from 'src/app/models/question.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.css'],
  animations: [
    trigger('questionState', [
      state('comingIn', style({
        transform: 'translateY(0)'
      })),
      state('goingOut', style({
        transform: 'translateY(-50rem)'
      })),
      transition('comingIn => goingOut', animate(500)),
      transition('goingOut => comingIn', animate(500))
    ])
  ]
})
export class QuestionsContainerComponent implements OnInit, AfterViewChecked {
  questionnaire: Questionnaire;
  allQuestions: Array<TextQuestion | MultipleChoiceQuestion>;
  firstQuestionIndex = 0;
  lastQuestionIndex = 0;
  currentQuestionType = QuestionType.Text;
  currentQuestion: TextQuestion | MultipleChoiceQuestion;
  isFirstQuestion = true;
  isLastQuestion = false;
  formerQuestionsIndex: number[] = [];
  previousQuestionSymbol = '<';
  nextQuestionSymbol = '>';
  state = 'comingIn';
  // isValid!: boolean;

  constructor(private questionsService: QuestionsService) {
    this.questionnaire = {} as Questionnaire;
    this.allQuestions = [];
    this.currentQuestion = {} as TextQuestion; // or as MultipleChoiceQuestion
  }

  ngOnInit(): void {
    this.getDataFromFile();
  }

  ngAfterViewChecked(): void {
    // this.questionsService.isValid.subscribe(isAnswerValid => {
    //   console.log(isAnswerValid);
    //   this.isValid = isAnswerValid;
    // });
  }

  getDataFromFile(): void {
    this.questionsService.getAllQuestions().subscribe((data: Questionnaire) => {
      this.questionnaire = data;
      this.questionsService.questionsWithAnswers = JSON.parse(
        JSON.stringify(this.questionnaire.questions)
      );
      this.lastQuestionIndex =
        this.questionsService.questionsWithAnswers.length - 1;
      this.startQuestionnaire();
    });
  }

  startQuestionnaire(): void {
    let firstQuestion =
      this.questionsService.questionsWithAnswers[this.firstQuestionIndex];
    this.currentQuestion = firstQuestion;
  }

  navigateToPreviousQuestion(
    currQuestion: TextQuestion | MultipleChoiceQuestion
  ) {
    let index = this.questionsService.questionsWithAnswers.findIndex(
      (question) => question.identifier === currQuestion.identifier
    );
    let previousQuestionIndex = this.formerQuestionsIndex.pop() as number;
    if (index === 1) {
      this.isFirstQuestion = true;
    }
    this.currentQuestion =
      this.questionsService.questionsWithAnswers[previousQuestionIndex];
    this.isLastQuestion = false;
  }

  navigateToNextQuestion(currQuestion: TextQuestion | MultipleChoiceQuestion) {
    this.state = 'goingOut';
    const questionId = currQuestion.identifier;
    let userAnswer = '';
    let index = this.questionsService.questionsWithAnswers.findIndex(
      (question) => question.identifier === questionId
    );
    this.formerQuestionsIndex.push(index);
    let nextQuestionIndex = index + 1;
    if (index === this.lastQuestionIndex - 1) {
      this.isLastQuestion = true;
    }
    if (currQuestion.jumps.length > 0) {
      userAnswer = this.findUserAnswer(currQuestion);
      const nextQuestionId = this.findNextQuestionId(currQuestion, userAnswer);
      nextQuestionIndex = this.questionsService.questionsWithAnswers.findIndex(
        (item) => item.identifier === nextQuestionId
      );
    }
    this.currentQuestion =
      this.questionsService.questionsWithAnswers[nextQuestionIndex];
    this.isFirstQuestion = false;
  }

  findUserAnswer(question: TextQuestion | MultipleChoiceQuestion): string {
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

  findNextQuestionId(
    question: TextQuestion | MultipleChoiceQuestion,
    answer: string
  ): string {
    let simpleJumpsInfo = question.jumps as SimpleJump[];
    const nextQuestionId = simpleJumpsInfo.find(
      (jInfo) => jInfo.value === answer
    )?.targetQuestionId as string;
    return nextQuestionId;
  }
}
