import { put, call } from 'redux-saga/effects';
import {HttpResponse} from "../../common/models/http-response";
import {
    updateQuestionSuccessAction
} from "../actions/question-actions";
import {AnswersService} from "../services/answers-service";
import {QuestionsService} from "../services/questions-service";
import {Answer} from "../../common/models/answer";
import {createAnswerErrorAction, updateAnswerErrorAction} from "../actions/answer-actions";
import {NotificationsService} from "../services/notifications-service";

export function* createAnswerSaga(payload: any) {
    const { answer, question } = payload.value;
    try {
        const answerResponse: Answer = yield call(AnswersService.create, answer);
        const updatedQuestion = {...question};
        updatedQuestion.answers.push(answerResponse);
        const questionResponse: HttpResponse = yield call(QuestionsService.update, {value: updatedQuestion});
        yield call(NotificationsService.create, payload.value);
        yield put(updateQuestionSuccessAction(questionResponse));
    } catch(error) {
        yield put(createAnswerErrorAction(error));
    }
}

export function* updateAnswerSaga(payload: any) {
    const { answer, question } = payload.value;
    try {
        const answerResponse: Answer = yield call(AnswersService.update, answer);
        const answers = [...question.answers] as Answer[];
        const index = answers.findIndex(ans => ans.id === answer.id);
        answers[index] = answerResponse;
        const questionResponse: HttpResponse = yield call(QuestionsService.update, {
            value: {...question, answers}
        });
        yield put(updateQuestionSuccessAction(questionResponse));
    } catch(error) {
        yield put(updateAnswerErrorAction(error));
    }
}

export function* deleteAnswerSaga(payload: any) {
    const { answer, question } = payload.value;
    try {
        yield call(AnswersService.delete, answer);
        const answers = [...question.answers] as Answer[];
        const updatedAnswers = answers.filter(ans => ans.id !== answer.id);
        const questionResponse: HttpResponse = yield call(QuestionsService.update, {
            value: {...question, answers: updatedAnswers
            }
        });
        yield put(updateQuestionSuccessAction(questionResponse));
    } catch(error) {
        yield put(updateAnswerErrorAction(error));
    }
}
