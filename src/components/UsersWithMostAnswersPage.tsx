import {User} from "../common/models/user";
import {connect} from "react-redux";
import React, {Component, Dispatch} from "react";
import {amountToLoad} from "../configuration/configuration";
import {Table} from "react-bootstrap";
import LoadMoreButton from "../common/components/LoadMoreButton";
import {getUsersWithMostAnswersAction} from "../redux/actions/users-actions";

interface UsersWithMostAnswersProps {
    usersWithMostAnswers: (User & { count: number })[],
    usersAmountLoaded: number,
    anyUsersDataLeft: boolean,
    getUsersWithMostAnswers: (data: any) => void
}

class UsersWithMostAnswersPage extends Component<UsersWithMostAnswersProps> {
    constructor(props: UsersWithMostAnswersProps) {
        super(props);
        this.loadMoreUsersWithMostAnswers = this.loadMoreUsersWithMostAnswers.bind(this);
    }

    componentDidMount() {
        this.loadMoreUsersWithMostAnswers();
    }

    loadMoreUsersWithMostAnswers() {
        const {getUsersWithMostAnswers, usersAmountLoaded} = this.props;
        getUsersWithMostAnswers({startIndex: usersAmountLoaded, amount: amountToLoad});
    }

    render() {
        const {usersWithMostAnswers, anyUsersDataLeft} = this.props;
        return (
            <div>
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Questions answered</th>
                    </tr>
                    </thead>
                    <tbody>
                    {usersWithMostAnswers.length > 0 && usersWithMostAnswers.map(user =>
                        <tr key={user.id}>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.count}</td>
                        </tr>
                    )}
                    {usersWithMostAnswers.length === 0 && <tr><td colSpan={4}>No entries found</td></tr>}
                    </tbody>
                </Table>
                <LoadMoreButton loadMore={this.loadMoreUsersWithMostAnswers}/>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    usersWithMostAnswers: state.users.usersWithMostAnswers,
    usersAmountLoaded: state.users.amountLoaded,
    anyUsersDataLeft: state.users.anyDataLeft
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getUsersWithMostAnswers: (data: any) => dispatch(getUsersWithMostAnswersAction(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersWithMostAnswersPage);
