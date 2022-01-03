import React, {Component, Dispatch} from 'react';
import { NavLink } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { setUserAction } from "../../redux/actions/authentication-actions";
import { connect } from "react-redux";
import { User } from "../models/user";
import Notifications from "./Notifications";

interface NavbarHeaderProps {
    user: User;
    logOutUser: () => void
}

class NavbarHeader extends Component<NavbarHeaderProps> {
    logOut = () => {
        const { logOutUser } = this.props;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        logOutUser();
    }

    render() {
        const { user } = this.props;

        return (
            <div className="App">
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavLink className="nav-link" to="/home">Home</NavLink>
                                <NavLink className="nav-link" to="/questions">Questions</NavLink>
                                {user && <NavLink className="nav-link" to="/my-questions">My questions</NavLink>}
                            </Nav>
                            {!user && <NavLink className="nav-link" to="/login">Log in</NavLink>}
                            {user && <Notifications />}
                            {user && <NavDropdown title={
                                <FontAwesomeIcon icon={["fas", "users"]}/>
                            } id="basic-nav-dropdown">
                                <NavLink className="nav-link" to="/profile">Profile ({user?.email})</NavLink>
                                <NavDropdown.Item onClick={this.logOut}>Sign out</NavDropdown.Item>
                            </NavDropdown>}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    user: state.auth?.user
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        logOutUser: () =>  dispatch(setUserAction(undefined))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarHeader);
