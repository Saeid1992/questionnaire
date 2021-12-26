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
import { Direction } from '../models/direction-change.enum';

@Injectable()
export class QuestionsService {
  //#region Public properties
  questionChanged = new EventEmitter<string>();
  questionsWithAnswers: Array<TextQuestion | MultipleChoiceQuestion>;
  questionnaireTitle = '';
  changeDirection: Direction.Next | Direction.Previous | '';
  resultsKey = '';
  //#endregion
  //#region Private properties
  private url = '';
  private apiName = '';
  //#endregion

  //#region Lifecycle hooks
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
    this.changeDirection = '';
    this.generateResultKey();
  }
  //#endregion

  //#region Public methods
  /**
   * Fetchs the questionnaire data by sending a GET request to a local JSON file
   * @returns An observable of the questionnaire raw data
   */
  getAllQuestions(): Observable<Questionnaire> {
    this.apiName = this.apiService.getAllQuestionsApi;
    return this.http
      .get<QuestionnaireBase>(this.url + this.apiName)
      .pipe(
        map((baseQuestionnaire) => this.provideCleanData(baseQuestionnaire))
      );
  }
  //#endregion

  //#region Private methods
  /**
   * Preprocesses the retrieved data fetched from the file and provides a neat data
   * @param data The raw data which needs to be cleaned
   * @returns Clean data
   */
  private provideCleanData(data: QuestionnaireBase): Questionnaire {
    this.questionnaireTitle = data.questionnaire.name;
    let cleanData: Questionnaire;
    let textQuestion: TextQuestion;
    let multipleChoiceQuestion: MultipleChoiceQuestion;
    let simpleJump: SimpleJump = {
      sourceQuestionId: '',
      value: '',
      targetQuestionId: '',
    };

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
      }
    }

    data.questionnaire.questions.forEach((qt) => {
      if (qt.jumps.length > 0) {
        let complexJumps = qt.jumps as Jump[];
        let simpleJumps: SimpleJump[] = [];
        for (const jmp of complexJumps) {
          jmp.conditions.forEach((cnd) => {
            simpleJump.sourceQuestionId = cnd.field;
            simpleJump.value = cnd.value;
            simpleJump.targetQuestionId = jmp.destination.id;
            simpleJumps.push({ ...simpleJump });
          });
        }
        qt.jumps = simpleJumps;
      }
    });
    cleanData = data.questionnaire;
    return cleanData;
  }

  /**
   * Generates a random string which consists of uppercase letters
   */
  private generateResultKey() : void {
    let key = '';
    let randomNumber;
    for (let i = 0; i < 5; i++) {
      // randomNumber = Math.floor(Math.random() * (90 - 65 + 1) + 65);
      randomNumber = Math.floor(Math.random() * 26 + 65);
      key += String.fromCharCode(randomNumber);
    }
    this.resultsKey = key;
  }
  //#endregion
}
