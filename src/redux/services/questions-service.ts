import {Question} from "../../common/models/question";

export class QuestionsService {
    public static getAll(query: string = "") {
        const QUESTIONS_API_ENDPOINT = `http://localhost:4000/questions${query}`;

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
                return json;
            });
    }

    public static create(request: any) {
        const QUESTIONS_API_ENDPOINT = "http://localhost:4000/questions";
        const question = request.value;

        const parameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: question.text,
                createdBy: question.createdBy,
                createdAt: question.createdAt,
                rating: undefined,
                totalRating: 0,
                answers: []
            } as unknown as Question)
        };

        return fetch(QUESTIONS_API_ENDPOINT, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            });
    }

    public static update(request: any) {
        const question = request.value;
        const QUESTIONS_API_ENDPOINT = `http://localhost:4000/questions/${question.id}`;

        const parameters = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(question)
        };

        return fetch(QUESTIONS_API_ENDPOINT, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            });
    }



    public static delete(id: number) {
        const QUESTIONS_API_ENDPOINT = `http://localhost:4000/questions/${id}`;

        const parameters = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };

        return fetch(QUESTIONS_API_ENDPOINT, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            });
    }
}
