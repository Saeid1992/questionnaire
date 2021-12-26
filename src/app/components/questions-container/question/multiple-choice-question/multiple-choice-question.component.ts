import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Direction } from 'src/app/models/direction-change.enum';
import {
  Choice,
  MultipleChoiceQuestion,
} from 'src/app/models/multiple-choice-question';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';
@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css'],
})
export class MultipleChoiceQuestionComponent implements OnInit, OnChanges {
  //#region Inputs and Outputs
  @Input() multipleChoiceQuestionInfo: MultipleChoiceQuestion;
  @Output() selectionChanged = new EventEmitter<MultipleChoiceQuestion>();
  //#endregion

  //#region Public properties
  initialChoices: Choice[] = [];
  isMultipleAnswerAllowed = false;
  questionFormSingle: FormGroup;
  questionFormMultiple: FormGroup;
  isAnotherQuestion = false;
  // questionFormMultipleAnswer: FormArray;
  //#endregion

  //#region Private properties
  private currentMultipleChoiceQuestion: MultipleChoiceQuestion;
  private prevAnswer: string | undefined;
  private selectedItemIndex: number;
  private questionFormContainer: FormGroup;
  private get options(): FormArray {
    return this.questionFormContainer.get('options') as FormArray;
  }
  //#endregion

  //#region Lifecycle hooks
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
        this.prevAnswer = this.getPreviousAnswer();
        if(!Array.isArray(formValue.choice) && formValue.choice !== this.prevAnswer) {
          this.resetFormValue();
          this.selectedItemIndex =
            this.currentMultipleChoiceQuestion.choices.findIndex(
              (ch) => ch.value === formValue.choice
            );
          if (this.selectedItemIndex > -1) {
            this.currentMultipleChoiceQuestion.choices[
              this.selectedItemIndex
            ].selected = true;
            this.selectionChanged.emit(this.currentMultipleChoiceQuestion);
            this.questionsService.questionChanged.emit(Direction.Next);
          }
        }
    });

    this.questionFormMultiple.valueChanges.subscribe((formValue) => {
      this.currentMultipleChoiceQuestion.choices = this.initialChoices;
      this.currentMultipleChoiceQuestion.choices.forEach((ch) => {
        ch.selected = formValue[ch.label];
      });
      this.selectionChanged.emit(this.currentMultipleChoiceQuestion);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.currentMultipleChoiceQuestion =
      changes.multipleChoiceQuestionInfo.currentValue;
    this.assignQuestion(this.currentMultipleChoiceQuestion);
  }
  //#endregion

  //#region Private methods

  /**
   * Assigns the current question to the form (including the user's previous answer(s) to that)
   * @param question The question which should be assigned
   */
  private assignQuestion(question: MultipleChoiceQuestion): void {
    this.isMultipleAnswerAllowed = question.multiple as boolean;
    this.initialChoices = JSON.parse(JSON.stringify(question.choices));
    switch (this.isMultipleAnswerAllowed) {
      case true:
        this.questionFormContainer.setControl('options', new FormArray([]));
        for (let i = 0; i < this.initialChoices.length; i++) {
          this.questionFormMultiple.setControl(
            this.initialChoices[i].label,
            new FormControl(this.initialChoices[i].selected)
          );
        }
        this.options.push(this.questionFormMultiple);
        break;
      case false:
        this.questionFormSingle.setControl(
          'choice',
          new FormControl(this.initialChoices)
        );

        if (this.prevAnswer) {
          this.questionFormSingle.setValue({
            choice: this.prevAnswer,
          });
        }
        break;
    }
  }

  /**
   *
   */

   private getPreviousAnswer() : string | undefined {
    let previousAnswer: Choice | undefined;
    previousAnswer = this.initialChoices.find((ch) => ch.selected);
    return previousAnswer?.value;
   }

  /**
   * Sets the question's choices to the initial values (before assigning the previous answer to it)
   */
  private resetFormValue(): void {
    this.currentMultipleChoiceQuestion.choices.forEach((ch) => {
      ch.selected = false;
    });
  }
  //#endregion
}
