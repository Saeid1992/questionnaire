import { Question } from "./question.model";

export interface TextQuestion extends Question{
    multiline: string | boolean;
}