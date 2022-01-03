import * as types from "./index";

export const getNotificationsAction = (id: number) => {
    return {
        type: types.GET_NOTIFICATIONS,
        value: id
    }
};

export const getNotificationsSuccessAction = (data: any) => {
    return {
        type: types.GET_NOTIFICATIONS_SUCCESS,
        value: data
    }
};

export const markNotificationAsCheckedAction = (data: any) => {
    return {
        type: types.MARK_NOTIFICATION_AS_CHECKED,
        value: data
    }
};

export const markNotificationAsCheckedSuccessAction = (data: any) => {
    return {
        type: types.MARK_NOTIFICATION_AS_CHECKED_SUCCESS,
        value: data
    }
};
