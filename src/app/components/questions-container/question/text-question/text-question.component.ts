import { Component, Input, OnInit } from '@angular/core';
import { TextQuestion } from 'src/app/models/text-question.model';
import { GlobalValuesService } from 'src/app/services/global-values.service';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css']
})
export class TextQuestionComponent implements OnInit {
  @Input() textQuestionInfo: TextQuestion;
  multiline = '';

  constructor(private globalValuesService: GlobalValuesService) {
    // Deep copy
    this.textQuestionInfo = JSON.parse(JSON.stringify(this.globalValuesService.DEFAULT_TEXT_QUESTION));
  }

  ngOnInit(): void {
  }

}
