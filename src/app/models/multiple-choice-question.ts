export interface MultipleChoiceQuestion {
    multiple: string;
    choices: Choice[];
}

export interface Choice {
    label: string;
    value: string;
    selected: boolean;
}