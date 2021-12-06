export interface Question {
    question_type: string;
    identifier: string;
    headline: string;
    description: string;
    required: boolean;
    jumps: Jump[];
}

export interface Jump {
    conditions: Condition[];
    destination: string;
}

export interface Condition {
    field: string;
    value: string;
}