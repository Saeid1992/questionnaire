import { Injectable } from "@angular/core";
import { GlobalValuesService } from "./global-values.service";

@Injectable()
export class ApiService {

  //#region Public properties
  baseUrl : string = '';
  getAllQuestionsApi: string = '';
  //#endregion

  //#region Lifecycle hooks
  constructor(private globalValuesService: GlobalValuesService) {
    this.baseUrl = globalValuesService.BASE_URL;
    this.getAllQuestionsApi = globalValuesService.GET_ALL_QUESTIONS;
   }
  //#endregion
}
