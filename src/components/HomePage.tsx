import React, {Component, Dispatch, } from "react";
import {Accordion} from "react-bootstrap";
import {User} from "../common/models/user";
import {Question} from "../common/models/question";
import {connect} from "react-redux";
import {
    getHotQuestionsAction,
    getLatestQuestionsAction, initializeHotQuestionsAction,
    initializeLatestQuestionsAction
} from "../redux/actions/question-actions";
import QuestionsList from "../common/components/QuestionsList";
import {amountToLoad} from "../configuration/configuration";
import UsersWithMostAnswersPage from "./UsersWithMostAnswersPage";

interface HomePageProps {
    user: User,
    latestQuestions: Question[];
    latestQAmountLoaded: number,
    hotQuestions: Question[];
    hotQAmountLoaded: number,
    usersAmountLoaded: number,
    getLatestQuestions: (data: any) => void;
    getHotQuestions: (data: any) => void;
    getUsersWithMostAnswers: (data: any) => void;
    initializeLatestQuestions: (data: any) => void;
    initializeHotQuestions: (data: any) => void;
}

class HomePage extends Component<HomePageProps> {
    constructor(props: HomePageProps) {
        super(props);
        this.loadMoreLatestQuestions = this.loadMoreLatestQuestions.bind(this);
        this.loadMoreHotQuestions = this.loadMoreHotQuestions.bind(this);
    }

    componentDidMount() {
        const { initializeHotQuestions, initializeLatestQuestions } = this.props;
        initializeHotQuestions({ startIndex: 0, amount: amountToLoad });
        initializeLatestQuestions({ startIndex: 0, amount: amountToLoad });
    }

    loadMoreLatestQuestions() {
        const { getLatestQuestions, latestQAmountLoaded } = this.props;
        getLatestQuestions({ startIndex: latestQAmountLoaded, amount: amountToLoad });
    }

    loadMoreHotQuestions() {
        const { getHotQuestions, hotQAmountLoaded } = this.props;
        getHotQuestions({ startIndex: hotQAmountLoaded, amount: amountToLoad });
    }

    render() {
        const { latestQuestions, hotQuestions } = this.props;

        return (
            <div className="main-container">

                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Latest questions</Accordion.Header>
                        <Accordion.Body>
                            <QuestionsList questions={latestQuestions}
                                           editable={false}
                                           loadMoreQuestions={this.loadMoreLatestQuestions}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Users with most answers</Accordion.Header>
                        <Accordion.Body>
                            <UsersWithMostAnswersPage />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>"Hot" questions</Accordion.Header>
                        <Accordion.Body>
                            <QuestionsList questions={hotQuestions}
                                           editable={false}
                                           loadMoreQuestions={this.loadMoreHotQuestions}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    latestQuestions: state.questions.latestQuestions,
    latestQAmountLoaded: state.questions.latestQAmountLoaded,
    anyLatestQuestionsLeft: state.questions.anyLatestQuestionsLeft,
    hotQuestions: state.questions.hotQuestions,
    hotQAmountLoaded: state.questions.hotQAmountLoaded,
    anyHotQuestionsLeft: state.questions.anyHotQuestionsLeft,
    user: state.auth?.user,
    usersWithMostAnswers: state.users.usersWithMostAnswers,
    usersAmountLoaded: state.users.amountLoaded,
    anyUsersDataLeft: state.users.anyDataLeft
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        initializeLatestQuestions: (data: any) => dispatch(initializeLatestQuestionsAction(data)),
        initializeHotQuestions: (data: any) => dispatch(initializeHotQuestionsAction(data)),
        getLatestQuestions: (data: any) => dispatch(getLatestQuestionsAction(data)),
        getHotQuestions: (data: any) => dispatch(getHotQuestionsAction(data)),
        getUsersWithMostAnswers: (data: any) => dispatch(getHotQuestionsAction(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
