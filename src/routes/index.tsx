import React from "react";
import {Routes, Route} from "react-router-dom";
import HomePage from "../components/HomePage";
import QuestionsPage from "../components/QuestionsPage";
import MyQuestionsPage from "../components/MyQuestionsPage";
import LoginPage from "../components/LoginPage";
import RegisterPage from "../components/RegisterPage";
import RequireAuth from "../common/components/RequireAuth";
import ProfilePage from "../components/ProfilePage";
import AppLayout from "../common/components/AppLayout";

export default (
    <div>
        <Routes>
            <Route element={<AppLayout/>}>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/home" element={<HomePage/>}/>
                <Route path="/questions" element={<QuestionsPage/>}/>
                <Route path="/my-questions" element={<RequireAuth><MyQuestionsPage/></RequireAuth>}/>
                <Route path="/profile" element={<RequireAuth><ProfilePage/></RequireAuth>}></Route>
            </Route>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
        </Routes>
    </div>
);
