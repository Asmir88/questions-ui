import { put, call } from 'redux-saga/effects';
import {
    AuthenticationService,
} from '../services/authentication-service';
import {
    loginErrorUserAction,
    loginSuccessUserAction, registerErrorUserAction,
    registerSuccessUserAction, updateUserErrorUserAction, updateUserSuccessAction
} from "../actions/authentication-actions";
import { HttpResponse } from "../../common/models/http-response";
import {isSuccess} from "../../common/utils/utils";

export function* registerSaga(payload: any) {
    try {
        const response: HttpResponse = yield call(AuthenticationService.register, payload);
        if (isSuccess(response.status)) {
            yield put(registerSuccessUserAction(response.value));
        } else {
            yield put(registerErrorUserAction(response.value))
        }
    } catch(error) {
        yield put(registerErrorUserAction(error))
    }
}

export function* loginSaga(payload: any) {
    try {
        const response: HttpResponse = yield call(AuthenticationService.login, payload);
        if (isSuccess(response.status)) {
            yield put(loginSuccessUserAction(response.value));
        } else {
            yield put(loginErrorUserAction(response.value));
        }
    } catch(error) {
        yield put(loginErrorUserAction(error));
    }
}

export function* updateUserSaga(payload: any) {
    try {
        const response: HttpResponse = yield call(AuthenticationService.update, payload);
        if (isSuccess(response.status)) {
            yield put(updateUserSuccessAction({ user: response.value, message: "Profile successfully updated." }));
        } else {
            yield put(updateUserErrorUserAction(response.value));
        }
    } catch(error) {
        yield put(updateUserErrorUserAction(error));
    }
}
