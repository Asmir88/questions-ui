import {Navigate} from "react-router";
import React from "react";

function isLoggedIn() {
    if (localStorage.getItem('token')) {
        return true;
    }

    return false;
}

function RequireAuth({ children }: any ) {
    const authed = isLoggedIn();

    return authed === true
        ? children
        : <Navigate to="/login" replace />;
}

export default RequireAuth;
