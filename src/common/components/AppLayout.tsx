import { Outlet } from "react-router-dom";
import NavbarHeader from "./NavbarHeader";
import React, { Component } from "react";
import { User } from "../models/user";
import { connect } from "react-redux";

interface AppLayoutProps {
    user: User;
}

class AppLayout extends Component<AppLayoutProps> {
    render() {
        return (
            <div>
                <NavbarHeader/>
                <main className="main--container">
                    <div className="main--content">
                        <Outlet/>
                    </div>
                </main>
            </div>
        );
    }
}


const mapStateToProps = (state: any) => ({
    user: state.auth?.user
});

export default connect(mapStateToProps)(AppLayout);
