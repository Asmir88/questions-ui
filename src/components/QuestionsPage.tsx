import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { createQuestionAction, getQuestionsAction, updateQuestionAction } from "../redux/actions/question-actions";
import { Question } from "../common/models/question";
import { User } from "../common/models/user";
import {createAnswerAction, updateAnswerAction} from "../redux/actions/answer-actions";
import QuestionsList from "../common/components/QuestionsList";

interface QuestionsPageProps {
    user: User,
    questions: Question[];
    getQuestions: () => void;
    createQuestion: (question: Question) => void;
    updateQuestion: (question: Question) => void;
    createAnswer: (payload: any) => void;
    updateAnswer: (payload: any) => void;
}

interface QuestionsPageState {
    isDisabled: boolean;
}

class QuestionsPage extends Component<QuestionsPageProps, QuestionsPageState> {
    constructor(props: QuestionsPageProps) {
        super(props);

        this.state = {
            isDisabled: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.createQuestion = this.createQuestion.bind(this);
    }


    componentDidMount() {
        const { getQuestions } = this.props;
        getQuestions();
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
        const { questions, user } = this.props;

        return (
            <div className="main-container">
                <QuestionsList questions={questions} editable={true} />
                {user && <div className="question-form">
                    <form onSubmit={this.createQuestion}>
                        <div className="form-group">
                            <textarea name="question" className="form-control"placeholder="Ask question"
                                      onChange={this.handleChange}
                            />
                        </div>
                        <div className="align-right">
                            <button style={{marginTop: "10px"}} className="btn btn-sm btn-primary"
                                    disabled={this.state.isDisabled} >Ask question</button>
                        </div>
                    </form>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    questions: state.questions.allQuestions,
    user: state.auth?.user
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        getQuestions: () => dispatch(getQuestionsAction()),
        createQuestion: (question: Question) =>  dispatch(createQuestionAction(question)),
        updateQuestion: (question: Question) =>  dispatch(updateQuestionAction(question)),
        createAnswer: (payload: any) => dispatch(createAnswerAction(payload)),
        updateAnswer: (payload: any) => dispatch(updateAnswerAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsPage);
