import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Questionnaire } from 'src/app/models/questionnaire.model';
import { MultipleChoiceQuestion } from 'src/app/models/multiple-choice-question';
import { TextQuestion } from 'src/app/models/text-question.model';
import { QuestionType } from 'src/app/models/question.model';

@Component({
  selector: 'app-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.css'],
})
export class QuestionsContainerComponent implements OnInit {
  questionnaire: Questionnaire;
  allQuestions: Array<TextQuestion | MultipleChoiceQuestion>;
  firstQuestionIndex = 0;
  lastQuestionIndex = 0;
  currentQuestionType = QuestionType.Text;
  currentQuestion: TextQuestion | MultipleChoiceQuestion;
  isFirstQuestion = true;
  isLastQuestion = false;

  constructor(private questionsService: QuestionsService) {
    this.questionnaire = {} as Questionnaire;
    this.allQuestions = [];
    this.currentQuestion = {} as TextQuestion; // or as MultipleChoiceQuestion
  }

  ngOnInit(): void {
    this.getDataFromFile();
  }

  getDataFromFile(): void {
    this.questionsService.getAllQuestions().subscribe((data: Questionnaire) => {
      console.log(data);
      this.questionnaire = data;
      this.questionsService.questionsWithAnswers = JSON.parse(
        JSON.stringify(this.questionnaire.questions)
      );
      this.lastQuestionIndex = this.questionsService.questionsWithAnswers.length - 1;
      this.startQuestionnaire();
    });
  }

  startQuestionnaire(): void {
    let firstQuestion = this.questionsService.questionsWithAnswers[this.firstQuestionIndex];
    this.currentQuestion = firstQuestion;
    console.log(this.currentQuestion);
  }

  navigateToPreviousQuestion(
    currQuestion: TextQuestion | MultipleChoiceQuestion
  ) {
    let index = this.questionsService.questionsWithAnswers.findIndex(
      (question) => question.identifier === currQuestion.identifier
    );
    if (index === 1) {
      this.isFirstQuestion = true;
    }
    this.currentQuestion = this.questionsService.questionsWithAnswers[index - 1];
    this.isLastQuestion = false;
  }

  navigateToNextQuestion(currQuestion: TextQuestion | MultipleChoiceQuestion) {
    console.log(currQuestion);
    let index = this.questionsService.questionsWithAnswers.findIndex(
      (question) => question.identifier === currQuestion.identifier
    );
    if (index === this.lastQuestionIndex - 1) {
      this.isLastQuestion = true;
    }
    this.currentQuestion = this.questionsService.questionsWithAnswers[index + 1];
    this.isFirstQuestion = false;
  }
}
