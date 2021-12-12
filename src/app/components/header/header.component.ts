import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() titleOfQuestionnaire: string ='';
  constructor(private questionsService: QuestionsService) {
   }

  ngOnInit(): void {
  }

}
