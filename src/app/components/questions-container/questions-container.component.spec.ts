import { HttpClient, HttpHandler } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api-service';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

import { QuestionsContainerComponent } from './questions-container.component';

describe('QuestionsContainerComponent', () => {
  let component: QuestionsContainerComponent;
  let fixture: ComponentFixture<QuestionsContainerComponent>;
  let debugElement: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionsContainerComponent],
      providers: [
        GlobalValuesService,
        QuestionsService,
        ApiService,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to next question', () => {
    // Act
    const previousButton = debugElement.query(
      By.css('[data-testid="previous-question-button"]')
    );
    previousButton.triggerEventHandler('click', null);
    // Re-render the Component
    fixture.detectChanges();
    // Assert
    const countOutput = debugElement.query(By.css('[data-testid="count"]'));
    expect(countOutput.nativeElement.textContent).toBe('1');
  });
});
