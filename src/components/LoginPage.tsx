import React, { Component, Dispatch } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUserAction } from '../redux/actions/authentication-actions';
import { User } from "../common/models/user";

interface LoginPageProps {
    success: boolean;
    message: string;
    loginUser: (user: User) => void
}

class LoginPage extends Component<LoginPageProps> {
    onHandleLogin = (event: any) => {
        const { loginUser } = this.props;
        event.preventDefault();

        let email = event.target.email.value;
        let password = event.target.password.value;

        const data = {
            email, password
        } as unknown as User;
        loginUser(data);
    }

    render() {
        const { message, success } = this.props;

        const response = success ? <Navigate to="/home" /> :
            <div className="card" style={{width: "450px", margin: "100px auto"}}>
                <div className="card-body">
                    <h3>Log in</h3>
                    {!success && message && <div className="error-message">{message}</div>}
                    {success && message && <div className="success-message">{message}</div>}
                    <form onSubmit={this.onHandleLogin}>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" />
                        </div>
                        <button style={{marginTop: "10px"}} className="btn btn-primary">Login</button>
                    </form>
                    Don't have account? <Link to='/register'>Register here</Link>
                </div>
            </div>;

        return response;
    }
}

const mapStateToProps = (state: any) => ({
    message: state.auth.message,
    success: state.auth.success
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        loginUser: (user: User) =>  dispatch(loginUserAction(user)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
