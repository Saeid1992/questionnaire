import { Component, OnInit } from '@angular/core';
import {
  Choice,
  MultipleChoiceQuestion,
} from 'src/app/models/multiple-choice-question';
import { QuestionType, SimpleJump } from 'src/app/models/question.model';
import { TextQuestion } from 'src/app/models/text-question.model';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  finalResult: Array<TextQuestion | MultipleChoiceQuestion>;
  cleanResult: [string, string, string][];
  answerConnector = '';
  multipleAnswers : string[] = [];
  constructor(private questionsService: QuestionsService,
              private globalValuesService: GlobalValuesService) {
    this.finalResult = this.questionsService.questionsWithAnswers;
    this.cleanResult = [];
    this.answerConnector = this.globalValuesService.MULTI_ANSWER_CONNECTOR;
    this.prepareResult();
  }

  ngOnInit(): void {}

  prepareResult() {
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
            if(selectedOptions.length > 0) {
              selectedOptions.forEach(opt => this.multipleAnswers.push(opt.value));
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
}
