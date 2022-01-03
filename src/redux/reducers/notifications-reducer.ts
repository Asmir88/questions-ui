import * as types from '../actions';
import {Action} from "../../common/models/action";
import {amountToLoad} from "../../configuration/configuration";
import {Notification} from "../../common/models/notification";

interface NotificationsState {
    notifications: Notification[]
}

const initialState = {
    notifications: []
} as NotificationsState;

export default function NotificationsReducer(state: NotificationsState = initialState, action: Action) {
    const value = action.value;
    switch(action.type) {
        case types.GET_NOTIFICATIONS_SUCCESS:
            return {...state, notifications: value};
        case types.MARK_NOTIFICATION_AS_CHECKED_SUCCESS:
            return {...state, notifications: [...state.notifications].filter(notification => notification.id !== value.id)};
        default:
            return state;
    }
};
