import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  //#region Inputs and Outputs
  @Input() titleOfQuestionnaire: string = '';
  //#endregion

  //#region Lifecycle hooks
  constructor() {}
  //#endregion
}
