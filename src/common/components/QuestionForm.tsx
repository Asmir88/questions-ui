import React, {Component, Dispatch} from "react";
import {Question} from "../models/question";
import AnswerForm from "./AnswerForm";
import {Collapse} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {User} from "../models/user";
import {
    createQuestionAction,
    deleteQuestionAction,
    getQuestionsAction,
    updateQuestionAction
} from "../../redux/actions/question-actions";
import {connect} from "react-redux";
import {formatDate} from "../utils/utils";

interface QuestionProps {
    question: Question;
    editable: boolean;
    user?: User;
    getQuestions: () => void;
    createQuestion: (question: Question) => void;
    updateQuestion: (question: Question) => void;
    deleteQuestion: (id: number) => void;
}

interface QuestionState {
    addAnswer: boolean;
    open: boolean;
    inEdit: boolean;
    isDisabled: boolean;
}

class QuestionForm extends Component<QuestionProps, QuestionState> {

    constructor(props: QuestionProps) {
        super(props);

        this.state = {
            addAnswer: false,
            open: false,
            inEdit: false,
            isDisabled: true
        };

        this.cancelNewAnswer = this.cancelNewAnswer.bind(this);
        this.cancelQuestionEdit = this.cancelQuestionEdit.bind(this);
        this.updateQuestion = this.updateQuestion.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    private toggleEdit() {
        this.setState((state) => ({
            ...state,
            inEdit: !this.state.inEdit
        }));
    }

    private toggleAnswer() {
        this.setState((state) => ({
            ...state,
            addAnswer: !this.state.addAnswer
        }));
    }

    private toggleOpen() {
        this.setState((state) => ({
            ...state,
            open: !this.state.open
        }));
    }

    private cancelNewAnswer() {
        this.setState((state) => ({
            ...state,
            addAnswer: false
        }));
    }

    private cancelQuestionEdit() {
        this.toggleEdit();
    }

    updateQuestion(event: any) {
        const { updateQuestion, question } = this.props;
        event.preventDefault();

        let text = event.target.question.value;

        if (text) {
            let questionData = {
                ...question,
                text,
                modifiedAt: new Date()
            } as unknown as Question;

            this.cancelQuestionEdit();
            updateQuestion(questionData);
        }
    }

    delete() {
        const { deleteQuestion, question } = this.props;
        if (window.confirm("Are you sure that you want to delete this question")) {
            deleteQuestion(question.id);
        }
    }

    isCreatedByCurrentUser() {
        return this.props.question.createdBy?.id === this.props.user?.id;
    };

    upVote(upVote: boolean) {
        const { updateQuestion, question, user } = this.props;
        const ratings = question.ratings || [];

        const index = [...ratings].findIndex(rating => rating.user.id === user?.id);

        if (index >= 0) {
            let rating = ratings[index];
            ratings[index] = {
                ...rating,
                upVote,
                downVote: !upVote
            };
        } else {
            const newRating = {
                upVote,
                downVote: !upVote,
                user: user!
            };
            ratings.push(newRating);
        }

        const totalUpVotes = ratings.filter(rating => rating.upVote).length;
        const totalDownVotes = ratings.filter(rating => rating.downVote).length;
        const totalRating = totalUpVotes - totalDownVotes;

        let questionData = {
            ...question,
            ratings,
            totalRating
        } as unknown as Question;

        updateQuestion(questionData);
    }

    handleChange(event:any) {
        this.setState(state => ({
            ...state,
                isDisabled: !event.target.value
        }));
    };

    render() {
        const { question, editable, user } = this.props;
        const userName = `${question.createdBy?.firstName} ${question.createdBy?.lastName}`;
        const datePosted = formatDate(new Date(question.createdAt));
        const ratings = question.ratings || [];
        const totalUpVotes = ratings.filter(rating => rating.upVote).length;
        const totalDownVotes = ratings.filter(rating => rating.downVote).length;

        return <div>
            <div className="form-group">
                <div>
                    {
                        <div>
                            <div>Asked by {userName} at {datePosted}</div>
                            {!this.state.inEdit && <span className="clearfix"></span>}
                            {!this.state.inEdit && <div className="question">{question.text}</div>}
                            <div className="toolbar-actions">
                                {user && !this.state.inEdit && <span onClick={() => this.upVote(true)} className="up-vote"><FontAwesomeIcon icon={["fas", "arrow-up"]}/><span className="vote-value">{totalUpVotes}</span></span>}
                                {user && !this.state.inEdit && <span onClick={() => this.upVote(false)} className="down-vote"><FontAwesomeIcon icon={["fas", "arrow-down"]}/><span className="vote-value">{totalDownVotes}</span></span>}
                                {!user && <span className="up-vote"><FontAwesomeIcon icon={["fas", "arrow-up"]}/><span className="vote-value">{totalUpVotes}</span></span>}
                                {!user && <span className="down-vote"><FontAwesomeIcon icon={["fas", "arrow-down"]}/><span className="vote-value">{totalDownVotes}</span></span>}
                                {!this.state.inEdit && editable && this.isCreatedByCurrentUser() && <span onClick={() => this.toggleEdit()}>Edit</span>}
                                {!this.state.inEdit && editable && this.isCreatedByCurrentUser() && <span onClick={() => this.delete()}>Delete</span>}
                            </div>
                        </div>
                    }
                    {this.state.inEdit &&
                    <div>
                        <form onSubmit={this.updateQuestion}>
                            <input hidden name="id" defaultValue={question.id}/>
                            <textarea name="question" className="form-control field-in-edit"
                                      defaultValue={question.text}
                                      onChange={this.handleChange} />
                            <div className="align-right">
                                <button type="submit" className="btn btn-sm btn-primary answer-form-btn" disabled={this.state.isDisabled}>Save</button>
                                <button type="button" className="btn btn-sm btn-secondary answer-form-btn"
                                        onClick={this.cancelQuestionEdit}>Cancel
                                </button>
                            </div>
                        </form>
                    </div>}
                </div>

                <Collapse in={this.state.open}>
                    <div>
                        {question.answers.map((answer, answerIndex) =>
                            <AnswerForm key={`answer-${answerIndex}`} answer={answer}
                                        question={question} editable={editable}
                            />
                        )}
                    </div>
                </Collapse>
            </div>
            {user && this.state.open && editable && !this.state.addAnswer && <div>
                <div className="btn btn-sm btn-primary add-answer-btn"
                     onClick={() => this.toggleAnswer()}>
                    Answer question
                </div>
            </div>
            }
            {user && this.state.open && editable && this.state.addAnswer && <div>
                <div className="form-group new-answer-form">
                    <AnswerForm key={`new-answer-${question.id}`} isNew={true}
                                question={question} /*updateAnswer={this.postNewAnswer}*/
                                cancelAnswer={this.cancelNewAnswer}
                                editable={true} /*currentUser={user}*/ />
                </div>
            </div>
            }

            <div className="collapse-element" onClick={() => this.toggleOpen()}>
                {!this.state.open && <div>
                    <div>View answers</div>
                </div>
                }
                {this.state.open && <div>
                    <div>Hide answers</div>
                </div>
                }
            </div>
        </div>;
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
        deleteQuestion: (id: number) => dispatch(deleteQuestionAction(id)),
        // createAnswer: (payload: any) => dispatch(createAnswerAction(payload)),
        // updateAnswer: (payload: any) => dispatch(updateAnswerAction(payload)),
        // deleteAnswer: (payload: any) => dispatch(deleteAnswerAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
// export default QuestionForm;
