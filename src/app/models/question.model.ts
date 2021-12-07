export interface Question {
    question_type: QuestionType;
    identifier: string;
    headline: string;
    description?: string;
    required: boolean;
    jumps: Jump[];
}

enum QuestionType{
    MultipleChoice = 'multiple-choice',
    Text = 'text'
}

interface Jump {
    conditions: Condition[];
    destination: string;
}

interface Condition {
    field: string;
    value: string;
}