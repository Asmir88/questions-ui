import {Notification} from "../../common/models/notification";

export class NotificationsService {
    private static NOTIFICATIONS_API_ENDPOINT = `http://localhost:4000/notifications`;

    static getByUserId(id: number) {
        const parameters = {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        };

        return fetch(`${NotificationsService.NOTIFICATIONS_API_ENDPOINT}?intendedFor.id=${id}&checked=false`, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            });
    }

    static create(data: any) {
        const body = {
            text: `An answer for your question: \n "${data.question.text.length > 10 ? (data.question.text.substring(0, 10) + "...") : data.question.text}" \n was posted.`,
            question: data.question,
            answer: data.answer,
            intendedFor: data.question.createdBy,
            createdAt: new Date(),
            checked: false,
            checkedAt: undefined
        };
        const parameters = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        return fetch(NotificationsService.NOTIFICATIONS_API_ENDPOINT, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            });
    }

    static markAsChecked(notification: Notification) {
        const parameters = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...notification,
                checked: true,
                checkedAt: new Date()
            } as Notification)
        };

        return fetch(`${NotificationsService.NOTIFICATIONS_API_ENDPOINT}/${notification.id}`, parameters)
            .then(response => {
                return response.json();
            })
            .then(json => {
                return json;
            });
    }
}
