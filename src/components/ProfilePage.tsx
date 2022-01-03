import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { registerErrorUserAction, setUserAction, updateUserAction } from '../redux/actions/authentication-actions';
import { User } from "../common/models/user";
import { FieldErrors, validate, ValidationRules } from '../common/utils/utils';

interface ProfilePageProps {
    success: boolean;
    message: string;
    user: User;
    setUser: (user: User) => void;
    updateUser: (user: User) => void;
    registerError: (error: string) => void;
}

interface ProfilePageState {
    errors: FieldErrors | undefined;
}

class ProfilePage extends Component<ProfilePageProps, ProfilePageState> {
    validationRules: ValidationRules = {
        email: { isRequired: { message: "Email is required"}, validEmail: { pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$", message: "Email format is not valid" } },
        password: { isRequired: { message: "Password is required" }, minLength: { length: 5, message: "Password should be at least 5 characters long." } }
    };

    constructor(props: ProfilePageProps) {
        super(props);

        this.state = {
            errors: undefined
        };
    }

    handleSubmit = (event: any) => {
        const { updateUser, registerError, user } = this.props;
        event.preventDefault();

        let firstName = event.target.firstName.value;
        let lastName = event.target.lastName.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        let confirmPassword = event.target.confirmPassword.value;

        const data = {
            id: user.id, firstName, lastName, email, password
        } as unknown as User;

        const validationResult = validate(data, this.validationRules);

        if (password === confirmPassword && validationResult.isValid) {
            updateUser(data);
        } else {
            if (password !== confirmPassword) {
                registerError("Password and confirmed password do not match");
            }

            this.setState({ errors: validationResult.errors });
        }
    }

    render() {
        const { success, message, user } = this.props;
        const { errors } = this.state;

        return (
            <div className="card" style={{width: "450px", margin: "100px auto"}}>
                <div className="card-body">
                    {!success && message && <div className="error-message">{message}</div>}
                    {success && message && <div className="success-message">{message}</div>}
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>First name</label>
                            <input type="text" name="firstName" className="form-control" defaultValue={user?.firstName || ""} />
                            { errors?.firstName?.isRequired && <div className="error-message">{errors?.firstName?.isRequired.message}</div> }
                        </div>
                        <div className="form-group">
                            <label>Last name</label>
                            <input type="text" name="lastName" className="form-control" defaultValue={user?.lastName || ""} />
                            { errors?.lastName?.isRequired && <div className="error-message">{errors?.lastName?.isRequired.message}</div> }
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" name="email" className="form-control" defaultValue={user?.email || ""} />
                            { errors?.email?.isRequired && <div className="error-message">{errors?.email?.isRequired.message}</div> }
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
                        <button style={{marginTop: "10px"}} className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    success: state.auth?.success,
    message: state.auth?.message,
    user: state.auth?.user
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) => dispatch(setUserAction(user)),
        updateUser: (user: User) =>  dispatch(updateUserAction(user)),
        registerError: (error: string) => dispatch(registerErrorUserAction(error))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
