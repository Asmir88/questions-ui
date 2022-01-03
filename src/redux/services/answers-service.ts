export class AnswersService {
    private static API_ENDPOINT = "http://localhost:4000/answers";

    public static create = (answer: any) => {
        const parameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answer)
        };

        return fetch(AnswersService.API_ENDPOINT, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            });
    }

    public static update(answer: any) {
        const parameters = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answer)
        };

        return fetch(`${AnswersService.API_ENDPOINT}/${answer.id}`, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            });
    }

    public static delete(answer: any) {
        const parameters = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };

        return fetch(`${AnswersService.API_ENDPOINT}/${answer.id}`, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            });
    }
}
