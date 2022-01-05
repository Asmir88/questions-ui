import React, { Component, Dispatch } from 'react';
import {Link, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import {registerErrorUserAction, registerUserAction} from '../redux/actions/authentication-actions';
import { User } from "../common/models/user";
import {FieldErrors, validate, ValidationRules} from "../common/utils/utils";

interface RegisterPageProps {
    success: boolean;
    message: string;
    registerUser: (user: User) => void;
    registerError: (error: string | undefined) => void;
}

interface RegisterPageState {
    errors: FieldErrors | undefined;
}

class RegisterPage extends Component<RegisterPageProps, RegisterPageState> {
    validationRules: ValidationRules = {
        email: { isRequired: { message: "Email is required"}, validEmail: { pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", message: "Email format is not valid" } },
        password: { isRequired: { message: "Password is required" }, minLength: { length: 5, message: "Password should be at least 5 characters long." } }
    };

    constructor(props: RegisterPageProps) {
        super(props);

        this.state = {
            errors: undefined
        };
    }

    onHandleRegistration = (event: any) => {
        const { registerUser, registerError } = this.props;
        event.preventDefault();

        let firstName = event.target.firstName.value;
        let lastName = event.target.lastName.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        let confirmPassword = event.target.confirmPassword.value;

        const data = {
            firstName, lastName, email, password
        } as unknown as User;

        const validationResult = validate(data, this.validationRules);

        if (password === confirmPassword && validationResult.isValid) {
            registerUser(data);
        } else {
            if (password !== confirmPassword) {
                registerError("Password and confirmed password do not match");
            } else {
                registerError(undefined);
            }

            this.setState({ errors: validationResult.errors });
        }
    }

    render() {
        const { message, success } = this.props;
        const { errors } = this.state;

        return success ? <Navigate to="/login" /> : (
            <div className="card" style={{width: "450px", margin: "100px auto"}}>
                <div className="card-body">
                <h3>Register</h3>
                    {!success && message && <div className="error-message">{message}</div>}
                    {success && message && <div className="success-message">{message}</div>}
                <form onSubmit={this.onHandleRegistration}>
                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" name="firstName" className="form-control" />
                        { errors?.firstName?.isRequired && <div className="error-message">{errors?.firstName?.isRequired.message}</div> }
                    </div>
                    <div className="form-group">
                        <label>Last name</label>
                        <input type="text" name="lastName" className="form-control" />
                        { errors?.lastName?.isRequired && <div className="error-message">{errors?.lastName?.isRequired.message}</div> }
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" />
                        { errors?.email?.isRequired && <div className="error-message">{errors?.email?.isRequired.message}</div> }
                        { errors?.email?.validEmail && <div className="error-message">{errors?.email?.validEmail.message}</div> }
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" className="form-control" />
                        { errors?.password?.isRequired && <div className="error-message">{errors?.password?.isRequired.message}</div> }
                        { errors?.password?.minLength && <div className="error-message">{errors?.password?.minLength.message}</div> }
                    </div>
                    <div className="form-group">
                        <label>Confirm password</label>
                        <input type="password" name="confirmPassword" className="form-control" />
                        { errors?.confirmPassword?.isRequired && <div className="error-message">{errors?.confirmPassword?.isRequired.message}</div> }
                    </div>
                    <button style={{marginTop: "10px"}} className="btn btn-primary">Register</button>
                </form>
                Already have account? <Link to='/login'>Login here</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    message: state.auth.message,
    success: state.auth.success
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        registerUser: (user: User) =>  dispatch(registerUserAction(user)),
        registerError: (error: string | undefined) => dispatch(registerErrorUserAction(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
