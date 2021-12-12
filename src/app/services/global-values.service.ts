import { Injectable } from "@angular/core";
import { Choice, MultipleChoiceQuestion } from "../models/multiple-choice-question";
import { Jump, Question, QuestionType } from "../models/question.model";
import { TextQuestion } from "../models/text-question.model";

@Injectable()
export class GlobalValuesService {

    MAIN_PAGE = '/questions-container';
    RESULT_PAGE = '/result';
    BASE_URL = '/assets/data';
    GET_ALL_QUESTIONS = '/questionnaire.json';

    DEFAULT_JUMPS: Jump[] = [];
    TEXT_QUESTION_TYPE = QuestionType.Text;
    MULTIPLE_CHOICE_QUESTION_TYPE = QuestionType.MultipleChoice;

    DEFAULT_CHOICES: Choice[] = [];

    DEFAULT_QUESTION: Question = {
        headline: '',
        identifier: '',
        jumps: this.DEFAULT_JUMPS,
        question_type: this.TEXT_QUESTION_TYPE,
        required: false,
        description: null
    };

    DEFAULT_TEXT_QUESTION: TextQuestion = {
        ...this.DEFAULT_QUESTION,
        multiline: '',
    }

    DEFAULT_MULTIPLE_CHOICE_QUESTION: MultipleChoiceQuestion = {
        ...this.DEFAULT_QUESTION,
        choices: this.DEFAULT_CHOICES,
        multiple: '',
    }

    MULTI_ANSWER_CONNECTOR = ' UND ';
    NEXT_QUESTION_TEXT = 'next';
    PREVIOUS_QUESTION_TEXT = 'previous';

    constructor() {}
}
