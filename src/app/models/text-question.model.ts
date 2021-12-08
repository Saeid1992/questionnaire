import { Question } from "./question.model";

export interface TextQuestion extends Question{
    multiline: string | boolean;
    answer?: string;
}

export enum TextInputType {
  Text = 'text',
  TextArea = 'textarea'
}
