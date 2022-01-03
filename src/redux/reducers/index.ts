import { combineReducers } from "redux";
import auth from "./auth-reducer";
import questions from "./questions-reducer";
import users from "./users-reducer"
import notifications from "./notifications-reducer"

const rootReducer = combineReducers({
    auth, questions, users, notifications
});

export default rootReducer;
