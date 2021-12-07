export interface Question {
    question_type: QuestionType;
    identifier: string;
    headline: string;
    description: string | null;
    required: boolean;
    jumps: Jump[];
}

export enum QuestionType{
    MultipleChoice = 'multiple-choice',
    Text = 'text'
}

export interface Jump {
    conditions: Condition[];
    destination: string;
}

interface Condition {
    field: string;
    value: string;
}