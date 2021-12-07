import { Injectable } from "@angular/core";
import { GlobalValuesService } from "./global-values.service";
import { HttpClient } from '@angular/common/http'
import { QuestionnaireBase } from "../models/questionnaire.model";
import { Observable } from "rxjs";
import { ApiService } from "./api-service";

@Injectable()
export class QuestionsService {

    url = '';
    apiName = '';

    constructor(private globalValuesService: GlobalValuesService,
                private apiService: ApiService,
                private http: HttpClient) {

        this.url = this.globalValuesService.BASE_URL;
        this.apiName = this.globalValuesService.GET_ALL_QUESTIONS;
    }
        
   getAllQuestions(): Observable<QuestionnaireBase> {
    this.apiName = this.apiService.getAllQuestionsApi;
    return this.http.get<QuestionnaireBase>(this.url + this.apiName);
  }
}