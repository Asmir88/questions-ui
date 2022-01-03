import {User} from "./user";
import {Rating} from "./rating";

export interface Question {
    id: number;
    text: string;
    answers: any[];
    createdBy: User;
    ratings: Rating[];
    totalRating: number;
    createdAt: Date;
    modifiedAt: Date;
}
