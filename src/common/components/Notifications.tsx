import {connect} from "react-redux";
import React, {Component, Dispatch} from "react";
import {NavDropdown} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {getNotificationsAction, markNotificationAsCheckedAction} from "../../redux/actions/notifications-actions";
import {Notification} from "../models/notification";
import {User} from "../models/user";

interface NotificationsProps {
    notifications: Notification[];
    getNotifications: (id: number) => void;
    markNotificationAsChecked: (notification: Notification) => void;
    user: User;
}

class Notifications extends Component<NotificationsProps> {
    constructor(props: NotificationsProps) {
        super(props);
        this.loadNotifications = this.loadNotifications.bind(this);
    }

    componentDidMount() {
        this.loadNotifications();

        // refresh notifications every 10 secs
        setInterval(() => {
            this.loadNotifications();
        }, 10000);
    }

    loadNotifications() {
        const {getNotifications, user} = this.props;
        getNotifications(user.id);
    }

    markAsChecked(notification: Notification) {
        const {markNotificationAsChecked} = this.props;
        markNotificationAsChecked(notification);
    }

    render() {
        const {notifications} = this.props;
        return (
            <div>
                <NavDropdown title={
                    <span>
                        <FontAwesomeIcon icon={["fas", "comments"]}/>
                        {notifications.length > 0 && <span className="notifications-amount">{notifications.length}</span>}
                    </span>
                } id="basic-nav-dropdown">
                    {
                        notifications.length > 0 && notifications && notifications.map(notification =>
                            <NavDropdown.Item key={notification.id}>
                                <div className="notification-wrapper" onClick={() => this.markAsChecked(notification)}>
                                    <span className="notification-label">{notification.text}</span>
                                </div>
                            </NavDropdown.Item>
                        )}
                    {
                        notifications.length === 0 && <NavDropdown.Item key={0}>No notifications</NavDropdown.Item>
                    }
                </NavDropdown>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    notifications: state.notifications.notifications,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getNotifications: (id: number) => dispatch(getNotificationsAction(id)),
        markNotificationAsChecked: (notification: Notification) => dispatch(markNotificationAsCheckedAction(notification))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
