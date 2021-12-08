import { Injectable } from '@angular/core';
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
import { QuestionType } from '../models/question.model';

@Injectable()
export class QuestionsService {
  url = '';
  apiName = '';
  questionsWithAnswers: Array<TextQuestion | MultipleChoiceQuestion>;

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

    for (const question of data.questionnaire.questions) {
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

    cleanData = data.questionnaire;
    return cleanData;
  }
}
