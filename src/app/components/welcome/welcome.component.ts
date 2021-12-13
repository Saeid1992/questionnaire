import { Component, OnInit } from '@angular/core';
import { GlobalValuesService } from 'src/app/services/global-values.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent {
  //#region Public properties
  mainPageUrl = '';
  //#endregion

  //#region Lifecycle hooks
  constructor(private globalValuesService: GlobalValuesService) {
    this.mainPageUrl = globalValuesService.MAIN_PAGE;
  }
}
//#endregion
