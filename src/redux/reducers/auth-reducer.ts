import * as types from '../actions';
import {Action} from "../../common/models/action";

export default function AuthReducer(state = {}, action: Action) {
    const value = action.value;

    switch(action.type) {
        case types.LOGIN_USER_SUCCESS:
            return { ...state, user: value.user, success: value.success, message: value.message };
        case types.LOGIN_USER_ERROR:
            return { ...state, message: value.message, success: value.success };
        case types.REGISTER_USER_SUCCESS:
            return { ...state, user: value.user, success: value.success, message: value.message };
        case types.REGISTER_USER_ERROR:
            return { ...state, message: value.message, success: value.success };
        case types.UPDATE_USER_SUCCESS:
            return { ...state, user: value.user, success: value.success, message: value.message };
        case types.UPDATE_USER_ERROR:
            return { ...state, message: value.message, success: value.success };
        case types.SET_USER:
            return { ...state, user: value.user, success: undefined, message: undefined };
        default:
            return state;
    }
};
