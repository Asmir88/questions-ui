import * as types from "./index";

export const getUsersWithMostAnswersAction = (data: any) => {
    return {
        type: types.GET_USERS_WITH_MOST_ANSWERS,
        value: {
            startIndex: data.startIndex,
            amount: data.amount
        }
    }
};

export const getUsersWithMostAnswersSuccessAction = (data: any) => {
    return {
        type: types.GET_USERS_WITH_MOST_ANSWERS_SUCCESS,
        value: data
    }
};
