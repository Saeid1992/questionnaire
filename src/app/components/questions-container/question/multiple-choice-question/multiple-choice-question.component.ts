import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Choice,
  MultipleChoiceQuestion,
} from 'src/app/models/multiple-choice-question';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';
import { ValidateMultipleChoiceQuestion } from 'src/app/validators/multiple-choice-question.validator';

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
  questionFormSingleAnswer: FormGroup;
  questionFormMultipleAnswer: FormArray;

  constructor(private globalValuesService: GlobalValuesService,
              private questionsService: QuestionsService) {
    // Deep copy
    this.multipleChoiceQuestionInfo = JSON.parse(
      JSON.stringify(this.globalValuesService.DEFAULT_MULTIPLE_CHOICE_QUESTION)
    );
    this.currentMultipleChoiceQuestion = this.multipleChoiceQuestionInfo;
    this.questionFormSingleAnswer = new FormGroup({});
    this.questionFormMultipleAnswer = new FormArray([]);
    this.selectedItemIndex = -1;
  }

  ngOnInit(): void {
    this.questionFormSingleAnswer.valueChanges.subscribe((formValue) => {
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
        // this.questionsService.isValid.emit(this.questionForm.valid);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.currentMultipleChoiceQuestion =
      changes.multipleChoiceQuestionInfo.currentValue;
    this.assignQuestion(this.currentMultipleChoiceQuestion);
    this.updateValidators(this.currentMultipleChoiceQuestion);
    console.log(this.questionFormSingleAnswer.valid);
    // this.questionsService.isValid.emit(this.questionForm.valid);
  }

  assignQuestion(question: MultipleChoiceQuestion): void {
    let previousAnswer: Choice | undefined;
    this.isMultipleAnswerAllowed = question.multiple as boolean;
    this.initialChoices = JSON.parse(JSON.stringify(question.choices));
    previousAnswer = this.initialChoices.find((ch) => ch.selected);
    this.questionFormSingleAnswer.setControl(
      'choice',
      new FormControl(this.initialChoices)
    );
    if (previousAnswer) {
      this.questionFormSingleAnswer.setValue({ choice: previousAnswer.value });
    }
  }

  updateValidators(question: MultipleChoiceQuestion): void {
    if (question.required) {
      // this.questionForm.setValidators();
      this.questionFormSingleAnswer.updateValueAndValidity();
      this.questionsService.isValid.emit(this.questionFormSingleAnswer.valid);
    }
  }

  resetFormValue(): void {
    this.currentMultipleChoiceQuestion.choices.forEach((ch) => {
      ch.selected = false;
    });
  }
}
