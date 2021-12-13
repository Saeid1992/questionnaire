import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {

  //#region Public properties
  text = '';
  firstPageUrl = '';
  //#endregion

  //#region Lifecycle hooks
  constructor() {}

  ngOnInit(): void {
    this.text = 'Sorry! Page not found!';
    this.firstPageUrl = '/';
  }
  //#endregion

}
