import { MultipleChoiceQuestion } from "./multiple-choice-question";
import { TextQuestion } from "./text-question.model";

export interface Questionnaire {
    id: number;
    identifier: string;
    name: string;
    questions: Array<MultipleChoiceQuestion | TextQuestion>;
    description: string;
    category_name_hyphenated: string;
}