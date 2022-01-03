import * as types from './index';
import {User} from "../../common/models/user";

export const registerUserAction = (user: User) => {
    return {
        type: types.REGISTER_USER,
        value: user
    }
};

export const registerSuccessUserAction = (response: any) => {
    return {
        type: types.REGISTER_USER_SUCCESS,
        value: {
            user: response.user,
            token: response.accessToken,
            success: true
        }
    }
};

export const registerErrorUserAction = (response: any) => {
    return {
        type: types.REGISTER_USER_ERROR,
        value: {
            message: response,
            success: false
        }
    }
};

export const loginUserAction = (user: User) => {
    return {
        type: types.LOGIN_USER,
        value: user
    }
};

export const loginSuccessUserAction = (response: any) => {
    return {
        type: types.LOGIN_USER_SUCCESS,
        value: {
            user: response.user,
            token: response.accessToken,
            success: true
        }
    }
};

export const loginErrorUserAction = (response: any) => {
    return {
        type: types.LOGIN_USER_ERROR,
        value: {
            message: response,
            success: false
        }
    }
};

export const setUserAction = (user: User | undefined) => {
    return {
        type: types.SET_USER,
        value: {
            user
        }
    }
};

export const updateUserAction = (user: User) => {
    return {
        type: types.UPDATE_USER,
        value: user
    };
}

export const updateUserSuccessAction = (response: any) => {
    return {
        type: types.UPDATE_USER_SUCCESS,
        value: {
            user: response.user,
            message: response.message,
            success: true
        }
    }
}

export const updateUserErrorUserAction = (response: any) => {
    return {
        type: types.UPDATE_USER_ERROR,
        value: {
            message: response,
            success: false
        }
    }
};
