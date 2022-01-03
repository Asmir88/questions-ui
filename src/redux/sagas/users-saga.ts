import {put, call} from 'redux-saga/effects';
import {createAnswerErrorAction} from "../actions/answer-actions";
import {UsersService} from "../services/users-service";
import {getUsersWithMostAnswersSuccessAction} from "../actions/users-actions";
import {User} from "../../common/models/user";

export function* getUsersWithMostAnswersSaga(payload: any) {
    try {
        const usersResponse: (User & { count: number })[] = yield call(UsersService.getUsersWithMostAnswers, payload.value);
        yield put(getUsersWithMostAnswersSuccessAction(usersResponse));
    } catch(error) {
        yield put(createAnswerErrorAction(error));
    }
}
