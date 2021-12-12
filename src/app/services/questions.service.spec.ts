import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuestionsService } from './questions.service';
import { Questionnaire } from '../models/questionnaire.model';
import { GlobalValuesService } from './global-values.service';
import { ApiService } from './api-service';

describe('QuestionService', () => {
  let questionsService: QuestionsService;
  let testingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuestionsService, GlobalValuesService, ApiService],
    });
    questionsService = TestBed.inject(QuestionsService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should get the questionnaire data', () => {
    const actualData: Questionnaire = {
      id: 70,
      identifier: 'Q2wxU74Bp',
      name: 'myQuestionnaire',
      category_name_hyphenated: 'categoryName',
      description: 'Sample description',
      questions: [],
    };

    questionsService.getAllQuestions().subscribe((fakeQuestionnaire) => {
      expect(fakeQuestionnaire).toEqual(actualData);
    });

    const req = testingController.expectOne('/assets/data/questionnaire.json');

    expect(req.request.method).toEqual('GET');

    req.flush(actualData);

    testingController.verify();
  });
});
