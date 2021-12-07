import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Choice, MultipleChoiceQuestion } from 'src/app/models/multiple-choice-question';
import { GlobalValuesService } from 'src/app/services/global-values.service';

@Component({
  selector: 'app-multiple-choice-question',
  templateUrl: './multiple-choice-question.component.html',
  styleUrls: ['./multiple-choice-question.component.css']
})
export class MultipleChoiceQuestionComponent implements OnInit {
  @Input() multipleChoiceQuestionInfo : MultipleChoiceQuestion;

  choices: Choice[] = []
  multiple = '';
  questionForm :FormGroup;
  constructor(private globalValuesService: GlobalValuesService) {
      // Deep copy
      this.multipleChoiceQuestionInfo = JSON.parse(JSON.stringify(this.globalValuesService.DEFAULT_MULTIPLE_CHOICE_QUESTION));
      this.questionForm = new FormGroup({});
   }

  ngOnInit(): void {
    console.log(this.multipleChoiceQuestionInfo);
    this.choices = [...this.multipleChoiceQuestionInfo.choices];
    this.questionForm.addControl('choice', new FormControl(this.choices));
    console.log(this.choices);
  }
}
