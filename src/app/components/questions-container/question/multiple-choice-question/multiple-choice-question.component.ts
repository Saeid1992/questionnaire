import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Choice,
  MultipleChoiceQuestion,
} from 'src/app/models/multiple-choice-question';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { ValidateFormAsync } from 'src/app/validators/multiple-choice-question.validator';
// import { ValidateMultipleChoiceQuestion } from 'src/app/validators/multiple-choice-question.validator';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css'],
})
export class MultipleChoiceQuestionComponent implements OnInit, OnChanges {
  @Input() multipleChoiceQuestionInfo: MultipleChoiceQuestion;
  @Output() selectionChanged = new EventEmitter<MultipleChoiceQuestion>();

  currentMultipleChoiceQuestion: MultipleChoiceQuestion;
  initialChoices: Choice[] = [];
  selectedItemIndex: number;
  isMultipleAnswerAllowed = false;
  questionFormSingle: FormGroup;
  questionFormContainer: FormGroup;
  questionFormMultiple :FormGroup;
  get options(): FormArray {
    return this.questionFormContainer.get('options') as FormArray;
  }
  // questionFormMultipleAnswer: FormArray;

  constructor(
    private globalValuesService: GlobalValuesService,
    private questionsService: QuestionsService
  ) {
    // Deep copy
    this.multipleChoiceQuestionInfo = JSON.parse(
      JSON.stringify(this.globalValuesService.DEFAULT_MULTIPLE_CHOICE_QUESTION)
    );
    this.currentMultipleChoiceQuestion = this.multipleChoiceQuestionInfo;
    this.questionFormSingle = new FormGroup({});
    this.questionFormContainer = new FormGroup({});
    this.questionFormMultiple = new FormGroup({});
    this.selectedItemIndex = -1;
  }

  ngOnInit(): void {
    this.questionFormSingle.valueChanges.subscribe((formValue) => {
      console.log(formValue);
      this.resetFormValue();
      this.currentMultipleChoiceQuestion.choices = this.initialChoices;
      this.selectedItemIndex =
        this.currentMultipleChoiceQuestion.choices.findIndex(
          (ch) => ch.value === formValue.choice
        );
      if (this.selectedItemIndex > -1) {
        this.currentMultipleChoiceQuestion.choices[
          this.selectedItemIndex
        ].selected = true;
        this.selectionChanged.emit(this.currentMultipleChoiceQuestion);
        this.questionsService.questionChanged.emit('next');
      }
      this.questionsService.isFormValid.emit(this.questionFormSingle.valid);
    });

    this.questionFormMultiple.valueChanges.subscribe((formValue) => {
      console.log(formValue);
      this.currentMultipleChoiceQuestion.choices = this.initialChoices;
      this.currentMultipleChoiceQuestion.choices.forEach((ch) => {
        ch.selected = formValue[ch.label];
      });
      this.selectionChanged.emit(this.currentMultipleChoiceQuestion);
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.currentMultipleChoiceQuestion =
      changes.multipleChoiceQuestionInfo.currentValue;
    this.assignQuestion(this.currentMultipleChoiceQuestion);
    // this.updateValidators(this.currentMultipleChoiceQuestion);
  }

  assignQuestion(question: MultipleChoiceQuestion): void {
    let previousAnswer: Choice | undefined;
    this.isMultipleAnswerAllowed = question.multiple as boolean;
    this.initialChoices = JSON.parse(JSON.stringify(question.choices));
    previousAnswer = this.initialChoices.find((ch) => ch.selected);
    console.log(this.questionFormSingle);
    switch (this.isMultipleAnswerAllowed) {
      case true:
        this.questionFormContainer.setControl('options', new FormArray([]));
        for (let i = 0; i < this.initialChoices.length; i++) {
          this.questionFormMultiple.setControl(
            this.initialChoices[i].label,
            new FormControl(this.initialChoices[i].selected)
          );
        }
        console.log(this.questionFormMultiple);
        this.options.push(this.questionFormMultiple);
        break;
      case false:
        this.questionFormSingle.setControl(
          'choice',
          new FormControl(this.initialChoices)
        );
        if (previousAnswer) {
          this.questionFormSingle.setValue({
            choice: previousAnswer.value,
          });
        }
        break;
    }
  }

  updateValidators(question: MultipleChoiceQuestion): void {
    if (question.required) {
      // this.questionFormSingle.setValidators(ValidateFormAsync);
      this.questionFormSingle.setAsyncValidators(ValidateFormAsync());
      this.questionFormSingle.updateValueAndValidity();
      this.questionsService.isFormValid.emit(this.questionFormSingle.valid);
    }
  }

  resetFormValue(): void {
    this.currentMultipleChoiceQuestion.choices.forEach((ch) => {
      ch.selected = false;
    });
  }
}
