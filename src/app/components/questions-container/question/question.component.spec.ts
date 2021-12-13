import { CUSTOM_ELEMENTS_SCHEMA, DebugElement, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { GlobalValuesService } from "src/app/services/global-values.service";
import { QuestionsService } from "src/app/services/questions.service";
import { QuestionComponent } from "./question.component";



export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

let fakeQuestionService: QuestionsService;
let fakeGlobalService: GlobalValuesService;

describe('QuestionsComponent', () => {
  let component: QuestionComponent;
  let fixture: ComponentFixture<QuestionComponent>;
  let debugElement: DebugElement;
  let questionsService: QuestionsService;
  beforeEach(async () => {

    fakeGlobalService = jasmine.createSpyObj<GlobalValuesService>(
      'GlobalValuesService',
      {
        TEXT_QUESTION_TYPE: 'text',
        MULTIPLE_CHOICE_QUESTION_TYPE: 'multiple-choice'
      }
    );

    await TestBed.configureTestingModule({
      declarations: [QuestionComponent],
      providers: [
        { provide: QuestionsService, useValue: fakeQuestionService },
        { provide: GlobalValuesService, useValue: fakeGlobalService },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(QuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    questionsService = TestBed.inject(QuestionsService);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should get data from the json file', () => {

  // });


  // it('should call the "navigateToNextQuestion" function', () => {

  // });

});
