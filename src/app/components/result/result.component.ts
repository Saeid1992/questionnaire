import { Component, OnInit } from '@angular/core';
import { MultipleChoiceQuestion } from 'src/app/models/multiple-choice-question';
import { QuestionType, SimpleJump } from 'src/app/models/question.model';
import { TextQuestion } from 'src/app/models/text-question.model';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  finalResult: Array<TextQuestion | MultipleChoiceQuestion>;
  cleanResult: [string, string, string][];

  constructor(private questionsService: QuestionsService) {
    this.finalResult = this.questionsService.questionsWithAnswers;
    this.cleanResult = [];
    this.prepareResult();
  }

  ngOnInit(): void {}

  prepareResult() {
    let questionId = '';
    let questionTitle = '';
    let userAnswer = '';
    let skippedQuestionsIds: string[] = [];
    let textQuestion: TextQuestion;
    let multipleChoiceQuestion: MultipleChoiceQuestion;

    for (const questionItem of this.finalResult) {
      questionId = questionItem.identifier;
      questionTitle = questionItem.headline;
      switch (questionItem.question_type) {
        case QuestionType.Text:
          textQuestion = questionItem as TextQuestion;
          userAnswer = textQuestion.answer ?? 'NO ANSWER';
          break;
        case QuestionType.MultipleChoice:
          multipleChoiceQuestion = questionItem as MultipleChoiceQuestion;
          userAnswer =
            multipleChoiceQuestion.choices.find((ch) => ch.selected)?.value ??
            'NO ANSWER';
          break;
      }
      if (questionItem.jumps.length > 0) {
        let simpleJumps = questionItem.jumps as SimpleJump[];
        simpleJumps
          .filter((jmp) => jmp.value !== userAnswer)
          .forEach((undoneJump) =>
            skippedQuestionsIds.push(undoneJump.targetQuestionId)
          );
      }
    }
    if (!skippedQuestionsIds.includes(questionId)) {
      this.cleanResult.push([questionId, questionTitle, userAnswer]);
    }
  }
}
