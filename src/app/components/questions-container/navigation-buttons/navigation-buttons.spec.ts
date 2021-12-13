import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  EventEmitter,
  NO_ERRORS_SCHEMA,
  SimpleChanges,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { NavigationButtonsComponent } from './navigation-buttons.component';
import { QuestionsService } from 'src/app/services/questions.service';
import { GlobalValuesService } from 'src/app/services/global-values.service';

export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

function findEl<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
  return fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
}

export function click<T>(fixture: ComponentFixture<T>, testId: string): void {
  const element = findEl(fixture, testId);
  const event = makeClickEvent(element.nativeElement);
  element.triggerEventHandler('click', event);
}

export function makeClickEvent(target: EventTarget): Partial<MouseEvent> {
  return {
    preventDefault(): void {},
    stopPropagation(): void {},
    stopImmediatePropagation(): void {},
    type: 'click',
    target,
    currentTarget: target,
    bubbles: true,
    cancelable: true,
    button: 0,
  };
}

let fakeQuestionService: QuestionsService;
let fakeGlobalService: GlobalValuesService;

describe('NavigationButtonsComponent', () => {
  let component: NavigationButtonsComponent;
  let fixture: ComponentFixture<NavigationButtonsComponent>;
  let debugElement: DebugElement;

  const isFirst = false;
  const isLast = true;
  let ch: SimpleChanges;
  // let questionsService: QuestionsService;
  // let globalValuesService: GlobalValuesService;
  beforeEach(async () => {
    fakeQuestionService = jasmine.createSpyObj<QuestionsService>(
      'QuestionsService',
      {
        isFormValid: new EventEmitter<boolean>(),
        questionChanged: new EventEmitter<string>(),
        questionsWithAnswers: undefined,
        questionnaireTitle: undefined,
        resultsKey: undefined,
      }
    );

    fakeGlobalService = jasmine.createSpyObj<GlobalValuesService>(
      'GlobalValuesService',
      {
        NEXT_QUESTION_TEXT: 'next',
        PREVIOUS_QUESTION_TEXT: 'previous'
      }
    );

    await TestBed.configureTestingModule({
      declarations: [NavigationButtonsComponent],
      providers: [
        { provide: QuestionsService, useValue: fakeQuestionService },
        { provide: GlobalValuesService, useValue: fakeGlobalService },
        // { provide: QuestionsService, useValue: questionsService },
        // { provide: GlobalValuesService, useValue: globalValuesService },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
    fixture = TestBed.createComponent(NavigationButtonsComponent);
    component = fixture.componentInstance;
    component.isFirst = isFirst;
    component.isLast = isLast;
    component.ngOnChanges(ch);
    fixture.detectChanges();
    // questionsService = TestBed.inject(QuestionsService);
    // globalValuesService = TestBed.inject(GlobalValuesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should set the "first" property', () => {
  //   // expect(component.isFirst).toBe(component.first);
  // });

  // it('should set the "last" property', () => {
  //   expect(component.isLast).toBe(component.last);
  // });

  // it('should call the "navigateToNextQuestion" function', () => {});
});
