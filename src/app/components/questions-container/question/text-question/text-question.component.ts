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
  @Output() textChanged = new EventEmitter<TextQuestion>();
  //#endregion

  //#region Public properties
  isMultiline = false;
  questionForm: FormGroup;
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
    this.questionForm = new FormGroup({}, { updateOn: 'blur' });
  }

  ngOnInit(): void {
    this.questionForm.valueChanges.subscribe((formValue) => {
      this.currentTextQuestion.answer = formValue.userAnswer;
      this.textChanged.emit(this.currentTextQuestion);
      this.questionsService.isFormValid.emit(this.questionForm.valid);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentTextQuestion = changes.textQuestionInfo.currentValue;
    this.updateQuestion(this.currentTextQuestion);
    this.questionsService.isFormValid.emit(this.questionForm.valid);
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
    const previousAnswer = question.answer;
    this.questionForm.setControl('userAnswer', new FormControl(previousAnswer));
    if (this.isRequired) {
      this.questionForm.get('userAnswer')?.setValidators(Validators.required);
      this.questionForm.updateValueAndValidity();
    }
  }
  //#endregion
}
