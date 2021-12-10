import { EventEmitter, Injectable } from '@angular/core';
import { GlobalValuesService } from './global-values.service';
import { HttpClient } from '@angular/common/http';
import {
  Questionnaire,
  QuestionnaireBase,
} from '../models/questionnaire.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api-service';
import { TextQuestion } from '../models/text-question.model';
import { MultipleChoiceQuestion } from '../models/multiple-choice-question';
import { Jump, QuestionType, SimpleJump } from '../models/question.model';

@Injectable()
export class QuestionsService {
  url = '';
  apiName = '';
  questionsWithAnswers: Array<TextQuestion | MultipleChoiceQuestion>;
  isValid = new EventEmitter<boolean>();

  constructor(
    private globalValuesService: GlobalValuesService,
    private apiService: ApiService,
    private http: HttpClient
  ) {
    this.url = this.globalValuesService.BASE_URL;
    this.apiName = this.globalValuesService.GET_ALL_QUESTIONS;
    this.questionsWithAnswers = [] as Array<
      TextQuestion | MultipleChoiceQuestion
    >;
  }

  getAllQuestions(): Observable<Questionnaire> {
    this.apiName = this.apiService.getAllQuestionsApi;
    return this.http
      .get<QuestionnaireBase>(this.url + this.apiName)
      .pipe(
        map(baseQuestionnaire => this.cleanInputData(baseQuestionnaire))
      );
  }

  cleanInputData(data: QuestionnaireBase): Questionnaire {
    let cleanData: Questionnaire;
    let textQuestion: TextQuestion;
    let multipleChoiceQuestion: MultipleChoiceQuestion;
    let simpleJump: SimpleJump = {sourceQuestionId:'', value: '', targetQuestionId:''};

    for (const question of data.questionnaire.questions) {
      question.skipped = false;
      switch (question.question_type) {
        case QuestionType.Text:
          textQuestion = question as TextQuestion;
          textQuestion.multiline =
            textQuestion.multiline === 'true' ? true : false;
          textQuestion.answer = '';
          break;
        case QuestionType.MultipleChoice:
          multipleChoiceQuestion = question as MultipleChoiceQuestion;
          multipleChoiceQuestion.multiple =
            multipleChoiceQuestion.multiple === 'true' ? true : false;
          break;
        default:
          break;
      }
    }

    data.questionnaire.questions.forEach((qt => {
      if(qt.jumps.length > 0) {
        let complexJumps = qt.jumps as Jump[];
        let simpleJumps: SimpleJump[] = [];
        for (const jmp of complexJumps) {
          jmp.conditions.forEach(cnd => {
            simpleJump.sourceQuestionId = cnd.field;
            simpleJump.value = cnd.value;
            simpleJump.targetQuestionId = jmp.destination.id;
            simpleJumps.push({...simpleJump});
          });
        }
        qt.jumps = simpleJumps;
      }
    }));
    console.log(data.questionnaire.questions);
    cleanData = data.questionnaire;
    return cleanData;
  }

  // resetQuestion(qst: TextQuestion | MultipleChoiceQuestion) : void {
  //   let textQuestion: TextQuestion;
  //   let multipleChoiceQuestion: MultipleChoiceQuestion;

  //   switch (qst.question_type) {
  //     case QuestionType.Text:
  //       textQuestion = qst as TextQuestion;
  //       textQuestion.answer = '';
  //       break;
  //     case QuestionType.MultipleChoice:
  //       multipleChoiceQuestion = qst as MultipleChoiceQuestion;
  //       multipleChoiceQuestion.choices.forEach(ch => ch.selected = false);
  //       break;
  //     default:
  //       break;
  //   }
  // }
}
