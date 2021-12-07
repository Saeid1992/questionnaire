import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { Questionnaire } from 'src/app/models/questionnaire.model';
import { MultipleChoiceQuestion } from 'src/app/models/multiple-choice-question';
import { TextQuestion } from 'src/app/models/text-question.model';
import { QuestionType } from 'src/app/models/question.model';

@Component({
  selector: 'app-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.css']
})
export class QuestionsContainerComponent implements OnInit {
  questionnaire: Questionnaire;
  allQuestions: Array<TextQuestion | MultipleChoiceQuestion>;
  currentQuestionType = QuestionType.Text;
  currentQuestion: TextQuestion | MultipleChoiceQuestion;
  isFirstQuestion = true;
  isLastQuestion = false;

  constructor(private questionsServices: QuestionsService) {
            this.questionnaire = {} as Questionnaire;
            this.allQuestions = [];
            this.currentQuestion = {} as TextQuestion; // or as MultipleChoiceQuestion
   }

  ngOnInit(): void {
    this.getDataFromFile();
  }

  getDataFromFile() : void {
    this.questionsServices.getAllQuestions()
      .subscribe((data: Questionnaire) => {
        console.log(data);
        this.questionnaire = data;
        this.allQuestions = this.questionnaire.questions;
        this.startQuestionnaire();
      });
  }

  startQuestionnaire() : void {
    let firstQuestion = this.allQuestions[0];
    this.currentQuestion = firstQuestion;
    console.log(this.currentQuestion);
  }

  navigateToPreviousQuestion(x: TextQuestion | MultipleChoiceQuestion) {
    console.log(x);
  }

  navigateToNextQuestion(x: TextQuestion | MultipleChoiceQuestion) {
    console.log(x);
  }
}
