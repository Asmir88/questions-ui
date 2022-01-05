import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import {
    createQuestionAction,
    getMyQuestionsAction, initializeMyQuestionsAction,
    updateQuestionAction
} from "../redux/actions/question-actions";
import { Question } from "../common/models/question";
import { User } from "../common/models/user";
import {createAnswerAction, updateAnswerAction} from "../redux/actions/answer-actions";
import QuestionsList from "../common/components/QuestionsList";
import {amountToLoad} from "../configuration/configuration";

interface MyQuestionsPageProps {
    user: User,
    questions: Question[];
    initializeMyQuestions: (data: any) => void;
    getMyQuestions: (data: any) => void;
    createQuestion: (question: Question) => void;
    updateQuestion: (question: Question) => void;
    createAnswer: (payload: any) => void;
    updateAnswer: (payload: any) => void;
    amountLoaded: number
}

interface MyQuestionsPageState {
    isDisabled: boolean;
}

class MyQuestionsPage extends Component<MyQuestionsPageProps, MyQuestionsPageState> {
    constructor(props: MyQuestionsPageProps) {
        super(props);

        this.state = {
            isDisabled: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
        this.loadMoreQuestions = this.loadMoreQuestions.bind(this);
    }


    componentDidMount() {
        const { initializeMyQuestions, user } = this.props;
        let userId = user?.id;
        if (!userId) {
            const localUser = JSON.parse(localStorage.getItem("user")!);
            userId = localUser.id;
        }

        initializeMyQuestions({ startIndex: 0, amount: amountToLoad, userId });
    }

    loadMoreQuestions() {
        const { getMyQuestions, amountLoaded, user } = this.props;
        let userId = user?.id;
        if (!userId) {
            const localUser = JSON.parse(localStorage.getItem("user")!);
            userId = localUser.id;
        }

        getMyQuestions({ startIndex: amountLoaded, amount: amountToLoad, userId });
    }

    handleChange(event:any) {
        this.setState(state => ({
            ...state,
            isDisabled: !event.target.value
        }));
    };

    createQuestion = (event: any) => {
        const { createQuestion, user } = this.props;

        event.preventDefault();

        const text = event.target.question.value;

        if (text) {

            let questionData = {
                text,
                createdBy: user,
                createdAt: new Date(),
                modifiedAt: undefined
            } as unknown as Question;

            createQuestion(questionData);
        }
    }

    render() {
        const { questions } = this.props;

        return (
            <div className="main-container">
                <QuestionsList
                    questions={questions}
                    editable={true}
                    loadMoreQuestions={this.loadMoreQuestions}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    questions: state.questions.myQuestions,
    amountLoaded: state.questions.myQAmountLoaded,
    anyQuestionsLeft: state.questions.anyMyQuestionsLeft,
    user: state.auth?.user
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        initializeMyQuestions: (data: any) => dispatch(initializeMyQuestionsAction(data)),
        getMyQuestions: (data: any) => dispatch(getMyQuestionsAction(data)),
        createQuestion: (question: Question) =>  dispatch(createQuestionAction(question)),
        updateQuestion: (question: Question) =>  dispatch(updateQuestionAction(question)),
        createAnswer: (payload: any) => dispatch(createAnswerAction(payload)),
        updateAnswer: (payload: any) => dispatch(updateAnswerAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestionsPage);
