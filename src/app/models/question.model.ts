export interface Question {
    question_type: QuestionType;
    identifier: string;
    headline: string;
    description: string | null;
    required: boolean;
    jumps: Jump[] | SimpleJump[];
    skipped?: boolean;
}

export enum QuestionType{
    MultipleChoice = 'multiple-choice',
    Text = 'text'
}

export interface Jump {
    conditions: Condition[];
    destination: Destination;
}

export interface SimpleJump {
  sourceQuestionId: string;
  value: string;
  targetQuestionId: string;
}

export interface Condition {
    field: string;
    value: string;
}

export interface Destination {
  id: string;
}
