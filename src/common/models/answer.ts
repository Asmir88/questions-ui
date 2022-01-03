import { User } from "./user";
import {Rating} from "./rating";

export interface Answer {
    id: number,
    text: string,
    ratings: Rating[],
    createdBy: User,
    createdAt: Date
}
