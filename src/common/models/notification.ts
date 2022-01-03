import {Question} from "./question";
import {Answer} from "./answer";
import {User} from "./user";

export interface Notification {
    id: number;
    text: string;
    question: Question;
    answer: Answer;
    intendedFor: User;
    createdAt: Date;
    checked: boolean;
    checkedAt: Date | undefined;
}
