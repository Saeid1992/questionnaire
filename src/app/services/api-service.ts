import { Injectable } from "@angular/core";
import { GlobalValuesService } from "./global-values.service";

@Injectable()
export class ApiService {

  baseUrl : string = '';
  getAllQuestionsApi: string = '';

   constructor(private globalValuesService: GlobalValuesService) {  
    this.baseUrl = globalValuesService.BASE_URL;
    this.getAllQuestionsApi = globalValuesService.GET_ALL_QUESTIONS;
   }
}