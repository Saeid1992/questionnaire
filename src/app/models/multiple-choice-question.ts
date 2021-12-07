import { Question } from "./question.model";

export interface MultipleChoiceQuestion extends Question {
    multiple: string | boolean;
    choices: Choice[];
}

export interface Choice {
    label: string;
    value: string;
    selected: boolean;
}