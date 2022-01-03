import { Request } from "../../common/models/request";
import {isSuccess} from "../../common/utils/utils";

export class AuthenticationService {
    private static REGISTER_API_ENDPOINT = 'http://localhost:4000/register';

    public static register(request: Request) {
        const parameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request.value)
        };

        return fetch(this.REGISTER_API_ENDPOINT, parameters)
            .then(async response => {
                return await this.processResponse(response);
            });
    }

    public static update(request: Request) {
        const user = request.value;
        const UPDATE_API_ENDPOINT = `http://localhost:4000/users/${user.id}`;

        const parameters = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        };

        return fetch(UPDATE_API_ENDPOINT, parameters)
            .then(async response => {
                const result = await response.json();

                if (isSuccess(response.status)) {
                    localStorage.setItem('user', JSON.stringify(result));
                }

                return {status: response.status, value: result};
            });
    }

    public static login(request: Request) {
        const LOGIN_API_ENDPOINT = 'http://localhost:4000/login';

        const parameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request.value)
        };

        return fetch(LOGIN_API_ENDPOINT, parameters)
            .then(async response => {
                return await AuthenticationService.processResponse(response);
            });
    }

    private static async processResponse(response: Response) {
        const result = await response.json();
        if (isSuccess(response.status)) {
            const {accessToken, user} = result;
            localStorage.setItem('token', 'Bearer ' + accessToken);
            localStorage.setItem('user', JSON.stringify(user));
        }
        return {status: response.status, value: result};
    }
}
