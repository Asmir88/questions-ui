import { takeLatest } from 'redux-saga/effects';
import { loginSaga, registerSaga, updateUserSaga } from './authentication-saga';
import * as types from '../actions';
import {
    createQuestionSaga,
    deleteQuestionSaga, getHotQuestionsSaga,
    getLatestQuestionsSaga, getMyQuestionsSaga,
    getQuestionsSaga, initializeHotQuestionsSaga, initializeLatestQuestionsSaga, initializeMyQuestionsSaga,
    updateQuestionSaga
} from "./questions-saga";
import {createAnswerSaga, deleteAnswerSaga, updateAnswerSaga} from "./anwsers-saga";
import {getUsersWithMostAnswersSaga} from "./users-saga";
import {getNotificationsSaga, markNotificationAsCheckedSaga} from "./notifications-saga";

export default function* watchUserAuthentication(): Generator {
    yield takeLatest(types.REGISTER_USER, registerSaga);
    yield takeLatest(types.LOGIN_USER, loginSaga);
    yield takeLatest(types.UPDATE_USER, updateUserSaga);
    yield takeLatest(types.GET_USERS_WITH_MOST_ANSWERS, getUsersWithMostAnswersSaga)

    yield takeLatest(types.GET_QUESTIONS, getQuestionsSaga);
    yield takeLatest(types.GET_LATEST_QUESTIONS, getLatestQuestionsSaga);
    yield takeLatest(types.INITIALIZE_LATEST_QUESTIONS, initializeLatestQuestionsSaga);
    yield takeLatest(types.GET_HOT_QUESTIONS, getHotQuestionsSaga);
    yield takeLatest(types.INITIALIZE_HOT_QUESTIONS, initializeHotQuestionsSaga);
    yield takeLatest(types.GET_MY_QUESTIONS, getMyQuestionsSaga);
    yield takeLatest(types.INITIALIZE_MY_QUESTIONS, initializeMyQuestionsSaga);
    yield takeLatest(types.CREATE_QUESTION, createQuestionSaga);
    yield takeLatest(types.UPDATE_QUESTION, updateQuestionSaga);
    yield takeLatest(types.DELETE_QUESTION, deleteQuestionSaga);

    yield takeLatest(types.CREATE_ANSWER, createAnswerSaga);
    yield takeLatest(types.UPDATE_ANSWER, updateAnswerSaga);
    yield takeLatest(types.DELETE_ANSWER, deleteAnswerSaga);

    yield takeLatest(types.GET_NOTIFICATIONS, getNotificationsSaga);
    yield takeLatest(types.MARK_NOTIFICATION_AS_CHECKED, markNotificationAsCheckedSaga);
}
