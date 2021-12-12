import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/services/api-service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

import { QuestionsContainerComponent } from './questions-container.component';


export function findComponent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  return fixture.debugElement.query(By.css(selector));
}

describe('QuestionsContainerComponent', () => {
  let component: QuestionsContainerComponent;
  let fixture: ComponentFixture<QuestionsContainerComponent>;
  let debugElement: DebugElement;
  let questionsService: QuestionsService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsContainerComponent],
      imports:[RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        GlobalValuesService,
        QuestionsService,
        ApiService,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(QuestionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    questionsService = TestBed.inject(QuestionsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get data from the json file', () => {

  });


  it('should call the "navigateToNextQuestion" function', () => {

  });


  // it('should navigate to next question', () => {
  //   // Act
  //   const previousButton = debugElement.query(
  //     By.css('[data-testid="previous-question-button"]')
  //   );
  //   previousButton.triggerEventHandler('click', null);
  //   // Re-render the Component
  //   fixture.detectChanges();
  //   // Assert
  //   const countOutput = debugElement.query(By.css('[data-testid="count"]'));
  //   expect(countOutput.nativeElement.textContent).toBe('1');
  // });
});
