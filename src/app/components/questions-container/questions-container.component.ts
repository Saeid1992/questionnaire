import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import { map } from 'rxjs/operators';
import { QuestionnaireBase } from 'src/app/models/questionnaire.model';

@Component({
  selector: 'app-questions-container',
  templateUrl: './questions-container.component.html',
  styleUrls: ['./questions-container.component.css']
})
export class QuestionsContainerComponent implements OnInit {

 // questionList: QuestionnaireBase;

  constructor(private questionsServices: QuestionsService) {

   }

  ngOnInit(): void {
    this.getDataFromFile();
  }

  getDataFromFile() : void {
    this.questionsServices.getAllQuestions()
      .subscribe((data: QuestionnaireBase) => {
        console.log(data);
      });
  }



}
