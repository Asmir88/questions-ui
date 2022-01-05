import * as types from '../actions';
import {Action} from "../../common/models/action";
import {Question} from "../../common/models/question";
import {amountToLoad} from "../../configuration/configuration";
import {User} from "../../common/models/user";

interface QuestionsState {
    allQuestions: Question[],
    myQuestions: Question[],
    latestQuestions: Question[],
    hotQuestions: Question[],
    usersWithMostAnswers: User[],
    myQAmountLoaded: number,
    latestQAmountLoaded: number,
    hotQAmountLoaded: number
}

const initialState = {
    allQuestions: [],
    myQuestions: [],
    latestQuestions: [],
    hotQuestions: [],
    usersWithMostAnswers: [],
    myQAmountLoaded: 0,
    latestQAmountLoaded: 0,
    hotQAmountLoaded: 0
} as QuestionsState;

export default function QuestionsReducer(state: QuestionsState = initialState, action: Action) {
    const value = action.value;

    function updateQuestionsList(questionsList: Question[], updatedQuestion: Question) {
        const questions = [...questionsList] as Question[];
        const index = questions.findIndex(question => question.id === updatedQuestion.id);
        questions[index] = updatedQuestion;
        return questions;
    }

    switch(action.type) {
        case types.GET_QUESTIONS_SUCCESS:
            return {...state, allQuestions: value};
        case types.INITIALIZE_LATEST_QUESTIONS_SUCCESS:
            return {...state, latestQuestions: value, latestQAmountLoaded: amountToLoad > value.length ? value.length : amountToLoad};
        case types.INITIALIZE_HOT_QUESTIONS_SUCCESS:
            return {...state, hotQuestions: value, hotQAmountLoaded: amountToLoad > value.length ? value.length : amountToLoad};
        case types.INITIALIZE_MY_QUESTIONS_SUCCESS:
            return {...state, myQuestions: value, myQAmountLoaded: amountToLoad > value.length ? value.length : amountToLoad};
        case types.GET_MY_QUESTIONS_SUCCESS:
            return {...state, myQuestions: [...state.myQuestions].concat(value), myQAmountLoaded: state.myQAmountLoaded + amountToLoad};
        case types.GET_LATEST_QUESTIONS_SUCCESS:
            return {...state, latestQuestions: [...state.latestQuestions].concat(value), latestQAmountLoaded: state.latestQAmountLoaded + amountToLoad};
        case types.GET_HOT_QUESTIONS_SUCCESS:
            return {...state, hotQuestions: value, hotQAmountLoaded: value.length};
        case types.CREATE_QUESTION_SUCCESS:
            return {...state, allQuestions: state.allQuestions.concat(value)}
        case types.UPDATE_QUESTION_SUCCESS:
            const newState = {
                ...state,
                allQuestions: updateQuestionsList([...state.allQuestions], value),
                latestQuestions: updateQuestionsList([...state.latestQuestions], value),
                // resorting in case rating changed after loading questions
                hotQuestions: updateQuestionsList([...state.hotQuestions], value).sort((a,b) => a.totalRating > b.totalRating ? -1 : 1),
                myQuestions: updateQuestionsList([...state.myQuestions], value)
            };
            return newState;
        case types.DELETE_QUESTION_SUCCESS:
            const updatedQuestions = [...state.allQuestions].filter(question => question.id !== value);
            return {...state, allQuestions: updatedQuestions};
        default:
            return state;
    }
};
