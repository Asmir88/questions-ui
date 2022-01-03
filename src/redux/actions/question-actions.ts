import * as types from "./index";

export const getQuestionsAction = () => {
    return {
        type: types.GET_QUESTIONS
    }
};

export const getLatestQuestionsAction = (data: any) => {
    return {
        type: types.GET_LATEST_QUESTIONS,
        value: {
            startIndex: data.startIndex,
            amount: data.amount
        }
    }
};

export const getHotQuestionsAction = (data: any) => {
    return {
        type: types.GET_HOT_QUESTIONS,
        value: {
            startIndex: data.startIndex,
            amount: data.amount
        }
    }
};

export const getMyQuestionsAction = (data: any) => {
    return {
        type: types.GET_MY_QUESTIONS,
        value: {
            startIndex: data.startIndex,
            amount: data.amount,
            userId: data.userId
        }
    }
};

export const getQuestionSuccessAction = (data: any) => {
    return {
        type: types.GET_QUESTIONS_SUCCESS,
        value: data
    };
};

export const getLatestQuestionsSuccessAction = (data: any) => {
    return {
        type: types.GET_LATEST_QUESTIONS_SUCCESS,
        value: data
    }
};

export const getHotQuestionsSuccessAction = (data: any) => {
    return {
        type: types.GET_HOT_QUESTIONS_SUCCESS,
        value: data
    }
};

export const getMyQuestionsSuccessAction = (data: any) => {
    return {
        type: types.GET_MY_QUESTIONS_SUCCESS,
        value: data
    }
};

export const getQuestionsErrorAction = (question: any) => {
    return {
        type: types.GET_QUESTIONS_ERROR,
        value: question
    }
};

export const createQuestionAction = (question: any) => {
    return {
        type: types.CREATE_QUESTION,
        value: question
    }
};

export const createQuestionSuccessAction = (question: any) => {
    return {
        type: types.CREATE_QUESTION_SUCCESS,
        value: question
    }
};

export const createQuestionErrorAction = (question: any) => {
    return {
        type: types.CREATE_QUESTION_ERROR,
        value: question
    }
};

export const updateQuestionAction = (question: any) => {
    return {
        type: types.UPDATE_QUESTION,
        value: question
    }
};

export const updateQuestionSuccessAction = (question: any) => {
    return {
        type: types.UPDATE_QUESTION_SUCCESS,
        value: question
    }
};

export const updateQuestionErrorAction = (question: any) => {
    return {
        type: types.UPDATE_QUESTION_ERROR,
        value: question
    }
};

export const deleteQuestionAction = (id: number) => {
    return {
        type: types.DELETE_QUESTION,
        id
    }
};

export const deleteQuestionSuccessAction = (id: number) => {
    return {
        type: types.DELETE_QUESTION_SUCCESS,
        value: id
    }
};

export const deleteQuestionErrorAction = (data: any) => {
    return {
        type: types.DELETE_QUESTION_ERROR,
        value: data
    }
};
