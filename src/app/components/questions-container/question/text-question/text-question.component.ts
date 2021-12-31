import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TextQuestion } from 'src/app/models/text-question.model';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css'],
})
export class TextQuestionComponent implements OnInit, OnChanges {
  //#region Inputs and Outputs
  @Input() textQuestionInfo: TextQuestion;
  @Input() set finalQuestion(value: boolean) {
    this.isFinalQs = value;
  }
  @Output() textChanged = new EventEmitter<TextQuestion>();
  //#endregion

  //#region Public properties
  isMultiline = false;
  questionForm: FormGroup;
  isFinalQs = false;
  //#endregion

  //#region Private properties
  private isRequired = false;
  private currentTextQuestion: TextQuestion;
  //#endregion

  //#region Lifecycle hooks
  constructor(
    private globalValuesService: GlobalValuesService,
    private questionsService: QuestionsService
  ) {
    // Deep copy
    this.textQuestionInfo = JSON.parse(
      JSON.stringify(this.globalValuesService.DEFAULT_TEXT_QUESTION)
    );
    this.currentTextQuestion = this.textQuestionInfo;
    this.questionForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.questionForm.valueChanges.subscribe((formValue) => {
        this.currentTextQuestion.answer = formValue.userAnswer;
        this.textChanged.emit(this.currentTextQuestion);
        if(this.isRequired) {
          this.questionsService.isValid.emit(this.questionForm.valid);
          if(this.isFinalQs) {
            this.questionsService.isLastQuestionValid.next(this.questionForm.valid);
          }
        }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentTextQuestion = changes.textQuestionInfo.currentValue;
    this.updateQuestion(this.currentTextQuestion);
  }
  //#endregion

  //#region Private methods

  /**
   * Assigns the current question (including the user's previous answer(s) to that) to the form
   * @param question The question which should be assigned
   */
  private updateQuestion(question: TextQuestion) : void {
    this.isMultiline = question.multiline as boolean;
    this.isRequired = question.required;
    const previousAnswer = question.answer?? null;
    this.questionForm.setControl('userAnswer',
                                 new FormControl(previousAnswer),
                                 {emitEvent: false});
    if(this.isRequired) {
      this.questionForm.controls['userAnswer'].setValidators(Validators.required);
      this.questionForm.controls['userAnswer'].updateValueAndValidity({emitEvent: false});
      this.questionsService.isValid.emit(this.questionForm.valid);
      if(this.isFinalQs) {
        this.questionsService.isLastQuestionValid.next(this.questionForm.valid);
      }
    } else {
      this.questionForm.clearValidators();
      this.questionForm.updateValueAndValidity({emitEvent: false});
      this.questionsService.isValid.emit(this.questionForm.valid);
    }
  }
  //#endregion
}
