import {Question} from "../../common/models/question";
import {getDuplicatesById} from "../../common/utils/utils";
import {Answer} from "../../common/models/answer";

export class UsersService {
    public static getUsersWithMostAnswers(payload: any) {
        const { startIndex, amount } = payload;
        // Mocking get users with most answers
        const QUESTIONS_API_ENDPOINT = `http://localhost:4000/questions`;

        const parameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        return fetch(QUESTIONS_API_ENDPOINT, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                const users = json.flatMap((question: Question) => question.answers).map((answer: Answer) => answer.createdBy);
                const uniqueUsers = getDuplicatesById(users).sort((a,b) => a.count > b.count ? -1 : 1);
                return uniqueUsers.slice(startIndex, amount);
            });
    };
}
