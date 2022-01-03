import * as types from '../actions';
import {Action} from "../../common/models/action";
import {User} from "../../common/models/user";
import {amountToLoad} from "../../configuration/configuration";

interface UsersState {
    usersWithMostAnswers: (User & { count: number })[]
    amountLoaded: number,
    anyDataLeft: boolean,
}

const initialState = {
    usersWithMostAnswers: [],
    amountLoaded: 0,
    anyDataLeft: true
} as UsersState;

export default function UsersReducer(state: UsersState = initialState, action: Action) {
    const value = action.value;
    switch(action.type) {
        case types.GET_USERS_WITH_MOST_ANSWERS_SUCCESS:
            const anyDataLeftToLoad = value.length > 0 && value.length === amountToLoad;
            return {...state, usersWithMostAnswers: [...state.usersWithMostAnswers].concat(value), amountLoaded: state.amountLoaded + amountToLoad, anyDataLeft: anyDataLeftToLoad};
        default:
            return state;
    }
};
