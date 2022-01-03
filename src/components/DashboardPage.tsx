import React, { Component, Dispatch } from "react";
import routes from "../routes";
import { User } from "../common/models/user";
import { setUserAction } from "../redux/actions/authentication-actions";
import { connect } from "react-redux";

interface DashboardPageProps {
    setUser: (user: User) => void
}

class DashboardPage extends Component<DashboardPageProps> {
    componentDidMount() {
        const { setUser } = this.props;
        const userJSON = localStorage.getItem("user");
        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUser(user);
        }
    }

    render () {
        return (
            <div>
                {routes}
            </div>
        );
    }

}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        setUser: (user: User) =>  dispatch(setUserAction(user)),
    }
}


export default connect(null, mapDispatchToProps)(DashboardPage);
