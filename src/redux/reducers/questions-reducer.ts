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
    hotQAmountLoaded: number,
    anyMyQuestionsLeft: boolean,
    anyLatestQuestionsLeft: boolean
    anyHotQuestionsLeft: boolean
}

const initialState = {
    allQuestions: [],
    myQuestions: [],
    latestQuestions: [],
    hotQuestions: [],
    usersWithMostAnswers: [],
    myQAmountLoaded: 0,
    latestQAmountLoaded: 0,
    hotQAmountLoaded: 0,
    anyMyQuestionsLeft: true,
    anyLatestQuestionsLeft: true,
    anyHotQuestionsLeft: true
} as QuestionsState;

export default function QuestionsReducer(state: QuestionsState = initialState, action: Action) {
    const value = action.value;
    let anyDataLeftToLoad;
    switch(action.type) {
        case types.GET_QUESTIONS_SUCCESS:
            return {...state, allQuestions: value};
        case types.GET_MY_QUESTIONS_SUCCESS:
            anyDataLeftToLoad = value.length > 0 && value.length === amountToLoad;
            return {...state, myQuestions: [...state.myQuestions].concat(value), myQAmountLoaded: state.myQAmountLoaded + amountToLoad, anyMyQuestionsLeft: anyDataLeftToLoad};
        case types.GET_LATEST_QUESTIONS_SUCCESS:
            anyDataLeftToLoad = value.length > 0 && value.length === amountToLoad;
            return {...state, latestQuestions: [...state.latestQuestions].concat(value), latestQAmountLoaded: state.latestQAmountLoaded + amountToLoad, anyLatestQuestionsLeft: anyDataLeftToLoad};
        case types.GET_HOT_QUESTIONS_SUCCESS:
            anyDataLeftToLoad = value.length > 0 && value.length === amountToLoad;
            return {...state, hotQuestions: [...state.hotQuestions].concat(value), hotQAmountLoaded: state.hotQAmountLoaded + amountToLoad, anyHotQuestionsLeft: anyDataLeftToLoad};
        case types.CREATE_QUESTION_SUCCESS:
            return {...state, allQuestions: state.allQuestions.concat(value)}
        case types.UPDATE_QUESTION_SUCCESS:
            const questions = [...state.allQuestions] as Question[];
            const index = questions.findIndex(question => question.id === value.id);
            questions[index] = value;
            const newState = {...state, allQuestions: questions};
            return newState;
        case types.DELETE_QUESTION_SUCCESS:
            const updatedQuestions = [...state.allQuestions].filter(question => question.id !== value);
            return {...state, allQuestions: updatedQuestions};
        default:
            return state;
    }
};
