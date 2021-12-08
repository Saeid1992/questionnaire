import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Choice,
  MultipleChoiceQuestion,
} from 'src/app/models/multiple-choice-question';
import { GlobalValuesService } from 'src/app/services/global-values.service';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css'],
})
export class MultipleChoiceQuestionComponent implements OnInit, OnChanges {
  @Input() multipleChoiceQuestionInfo: MultipleChoiceQuestion;
  @Output() answerChanged = new EventEmitter<MultipleChoiceQuestion>();

  currentMultipleChoiceQuestion: MultipleChoiceQuestion;
  initialChoices: Choice[] = [];
  selectedItemIndex: number;
  multiple = '';
  questionForm: FormGroup;
  constructor(private globalValuesService: GlobalValuesService) {
    // Deep copy
    this.multipleChoiceQuestionInfo = JSON.parse(
      JSON.stringify(this.globalValuesService.DEFAULT_MULTIPLE_CHOICE_QUESTION)
    );
    this.currentMultipleChoiceQuestion = this.multipleChoiceQuestionInfo;
    this.questionForm = new FormGroup({});
    this.selectedItemIndex = -1;
  }

  ngOnInit(): void {
    // this.assignQuestion(this.multipleChoiceQuestionInfo);
    this.questionForm.valueChanges.subscribe((formValue) => {
      console.log(formValue);
      this.resetFormValue();
      this.currentMultipleChoiceQuestion.choices = JSON.parse(
        JSON.stringify(this.initialChoices)
      );
      this.selectedItemIndex =
        this.currentMultipleChoiceQuestion.choices.findIndex(
          (ch) => ch.value === formValue.choice
        );
      if (this.selectedItemIndex > -1) {
        this.currentMultipleChoiceQuestion.choices[
          this.selectedItemIndex
        ].selected = true;
        this.answerChanged.emit(this.currentMultipleChoiceQuestion);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    this.currentMultipleChoiceQuestion =
      changes.multipleChoiceQuestionInfo.currentValue;
    this.assignQuestion(this.currentMultipleChoiceQuestion);
  }

  assignQuestion(question: MultipleChoiceQuestion): void {
    console.log(question);
    let previousAnswer: Choice | undefined;
    this.initialChoices = JSON.parse(JSON.stringify(question.choices));
    previousAnswer = this.initialChoices.find(ch => ch.selected);
    this.questionForm.setControl(
      'choice',
      new FormControl(this.initialChoices)
    );
    if(previousAnswer) {
      this.questionForm.setValue({'choice':previousAnswer.value});
    }
    console.log(this.initialChoices);
  }

  resetFormValue() {
    this.currentMultipleChoiceQuestion.choices.forEach(ch => {
      ch.selected = false;
    });
  }
}
