import { Injectable } from "@angular/core";

@Injectable()
export class GlobalValuesService {
    MAIN_PAGE = '/questions-container';
    BASE_URL = '/assets/data';
    GET_ALL_QUESTIONS = '/questionnaire.json';
}