import * as types from "./index";

export const createAnswerAction = (data: any) => {
    return {
        type: types.CREATE_ANSWER,
        value: data
    }
};

export const createAnswerSuccessAction = (data: any) => {
    return {
        type: types.CREATE_ANSWER_SUCCESS,
        value: data
    }
};

export const createAnswerErrorAction = (data: any) => {
    return {
        type: types.CREATE_ANSWER_ERROR,
        value: data
    }
};

export const updateAnswerAction = (data: any) => {
    return {
        type: types.UPDATE_ANSWER,
        value: data
    }
};

export const updateAnswerSuccessAction = (data: any) => {
    return {
        type: types.UPDATE_ANSWER_SUCCESS,
        value: data
    }
};

export const updateAnswerErrorAction = (data: any) => {
    return {
        type: types.UPDATE_ANSWER_ERROR,
        value: data
    }
};

export const deleteAnswerAction = (data: number) => {
    return {
        type: types.DELETE_ANSWER,
        value: data
    }
};

export const deleteAnswerSuccessAction = (data: any) => {
    return {
        type: types.DELETE_ANSWER_SUCCESS,
    }
};

export const deleteAnswerErrorAction = (data: any) => {
    return {
        type: types.DELETE_ANSWER_ERROR,
        value: data
    }
};
