import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  TextQuestion,
} from 'src/app/models/text-question.model';
import { GlobalValuesService } from 'src/app/services/global-values.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css'],
})
export class TextQuestionComponent implements OnInit {
  @Input() textQuestionInfo: TextQuestion;
  @Output() textChanged = new EventEmitter<TextQuestion>();

  isMultiline = false;
  isRequired = false;
  currentTextQuestion: TextQuestion;
  questionForm: FormGroup;

  constructor(private globalValuesService: GlobalValuesService,
              private questionsService: QuestionsService) {
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
      this.questionsService.isValid.emit(this.questionForm.valid);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.currentTextQuestion = changes.textQuestionInfo.currentValue;
    this.updateQuestion(this.currentTextQuestion);
    this.questionsService.isValid.emit(this.questionForm.valid);
  }

  updateQuestion(question: TextQuestion) {
    this.isMultiline = question.multiline as boolean;
    this.isRequired = question.required;
    const previousAnswer = question.answer;
    this.questionForm.setControl('userAnswer', new FormControl(previousAnswer));
    if(this.isRequired) {
      this.questionForm.get('userAnswer')?.setValidators(Validators.required);
      this.questionForm.updateValueAndValidity();
    }
  }
}
