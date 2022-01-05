import { put, call } from 'redux-saga/effects';
import * as types from '../actions'
import { QuestionsService } from "../services/questions-service";
import {HttpResponse} from "../../common/models/http-response";
import {
    createQuestionErrorAction,
    createQuestionSuccessAction,
    deleteQuestionErrorAction,
    deleteQuestionSuccessAction,
    getHotQuestionsSuccessAction,
    getLatestQuestionsSuccessAction,
    getMyQuestionsSuccessAction,
    getQuestionsErrorAction,
    getQuestionsSuccessAction,
    initializeHotQuestionsSuccessAction,
    initializeLatestQuestionsSuccessAction,
    initializeMyQuestionsSuccessAction,
    updateQuestionErrorAction,
    updateQuestionSuccessAction
} from "../actions/question-actions";

export function* getQuestionsSaga() {
    try {
        const response: HttpResponse = yield call(QuestionsService.getAll);
        yield put(getQuestionsSuccessAction(response));
    } catch(error) {
        yield put({ type: types.GET_QUESTIONS_ERROR, error });
    }
}

export function* initializeLatestQuestionsSaga(payload: any) {
    try {
        const { startIndex, amount } = payload.value;
        const query = `?_sort=createdAt&_order=desc&_start=${startIndex}&_limit=${amount}`;
        const response: HttpResponse = yield call(QuestionsService.getAll, query);
        yield put(initializeLatestQuestionsSuccessAction(response));
    } catch(error) {
        yield put(getQuestionsErrorAction(error));
    }
}

export function* getLatestQuestionsSaga(payload: any) {
    try {
        const { startIndex, amount } = payload.value;
        const query = `?_sort=createdAt&_order=desc&_start=${startIndex}&_limit=${amount}`;
        const response: HttpResponse = yield call(QuestionsService.getAll, query);
        yield put(getLatestQuestionsSuccessAction(response));
    } catch(error) {
        yield put(getQuestionsErrorAction(error));
    }
}

export function* initializeHotQuestionsSaga(payload: any) {
    try {
        const { startIndex, amount } = payload.value;
        const query = `?_sort=totalRating&_order=desc&_start=${startIndex}&_limit=${amount}`;
        const response: HttpResponse = yield call(QuestionsService.getAll, query);
        yield put(initializeHotQuestionsSuccessAction(response));
    } catch(error) {
        yield put(getQuestionsErrorAction(error));
    }
}

export function* getHotQuestionsSaga(payload: any) {
    try {
        const { startIndex, amount } = payload.value;
        const query = `?_sort=totalRating&_order=desc&_start=${0}&_limit=${amount}`;
        const response: HttpResponse = yield call(QuestionsService.getAll, query);
        yield put(getHotQuestionsSuccessAction(response));
    } catch(error) {
        yield put(getQuestionsErrorAction(error));
    }
}

export function* initializeMyQuestionsSaga(payload: any) {
    try {
        const { startIndex, amount, userId } = payload.value;
        const query = `?createdBy.id=${userId}&_sort=createdAt&_order=desc&_start=${startIndex}&_limit=${amount}`;
        const response: HttpResponse = yield call(QuestionsService.getAll, query);
        yield put(initializeMyQuestionsSuccessAction(response));
    } catch(error) {
        yield put(getQuestionsErrorAction(error));
    }
}

export function* getMyQuestionsSaga(payload: any) {
    try {
        const { startIndex, amount, userId } = payload.value;
        const query = `?createdBy.id=${userId}&_sort=createdAt&_order=desc&_start=${startIndex}&_limit=${amount}`;
        const response: HttpResponse = yield call(QuestionsService.getAll, query);
        yield put(getMyQuestionsSuccessAction(response));
    } catch(error) {
        yield put(getQuestionsErrorAction(error));
    }
}

export function* createQuestionSaga(payload: any) {
    try {
        const response: HttpResponse = yield call(QuestionsService.create, payload);
        yield put(createQuestionSuccessAction(response));
    } catch(error) {
        yield put(createQuestionErrorAction(error));
    }
}

export function* updateQuestionSaga(payload: any) {
    try {
        const response: HttpResponse = yield call(QuestionsService.update, payload);
        yield put(updateQuestionSuccessAction(response));
    } catch(error) {
        yield put(updateQuestionErrorAction(error));
    }
}

export function* deleteQuestionSaga(payload: any) {
    try {
        yield call(QuestionsService.delete, payload.id);
        yield put(deleteQuestionSuccessAction(payload.id));
    } catch(error) {
        yield put(deleteQuestionErrorAction(error));
    }
}
