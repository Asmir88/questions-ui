import { User } from "./user";

export interface Rating {
    upVote: boolean;
    downVote: boolean;
    user: User;
}
