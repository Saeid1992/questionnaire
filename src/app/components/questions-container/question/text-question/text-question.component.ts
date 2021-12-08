import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  TextInputType,
  TextQuestion,
} from 'src/app/models/text-question.model';
import { GlobalValuesService } from 'src/app/services/global-values.service';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css'],
})
export class TextQuestionComponent implements OnInit {
  @Input() textQuestionInfo: TextQuestion;
  @Output() textChanged = new EventEmitter<TextQuestion>();

  isMultiline = false;
  currentTextQuestion: TextQuestion;
  questionForm: FormGroup;

  constructor(private globalValuesService: GlobalValuesService) {
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
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.currentTextQuestion = changes.textQuestionInfo.currentValue;
    this.isMultiline = this.currentTextQuestion.multiline as boolean;
    this.assignPreviousValue(this.currentTextQuestion);
  }

  assignPreviousValue(question: TextQuestion): void {
    console.log(question);
    const previousAnswer = question.answer;
    this.questionForm.setControl('userAnswer', new FormControl(previousAnswer));
  }
}
