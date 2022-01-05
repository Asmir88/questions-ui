import { put, call } from 'redux-saga/effects';
import * as types from '../actions'
import {HttpResponse} from "../../common/models/http-response";
import {
    updateQuestionErrorAction,
} from "../actions/question-actions";
import {NotificationsService} from "../services/notifications-service";
import {getNotificationsSuccessAction, markNotificationAsCheckedSuccessAction} from "../actions/notifications-actions";

export function* getNotificationsSaga(payload: any) {
    try {
        const response: HttpResponse = yield call(NotificationsService.getByUserId, payload.value);
        yield put(getNotificationsSuccessAction(response));
    } catch(error) {
        yield put({ type: types.GET_QUESTIONS_ERROR, error });
    }
}

export function* markNotificationAsCheckedSaga(payload: any) {
    try {
        const response: HttpResponse = yield call(NotificationsService.markAsChecked, payload.value);
        yield put(markNotificationAsCheckedSuccessAction(response));
    } catch(error) {
        yield put(updateQuestionErrorAction(error));
    }
}
