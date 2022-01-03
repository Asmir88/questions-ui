import React, {Dispatch, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Answer } from "../models/answer";
import { User } from "../models/user";
import { Question } from "../models/question";
import { createAnswerAction, deleteAnswerAction, updateAnswerAction } from "../../redux/actions/answer-actions";
import { connect } from "react-redux";
import { formatDate } from "../utils/utils";

interface AnswerProps {
    question: Question,
    editable: boolean
    answer?: Answer,
    isNew?: boolean
    cancelAnswer?: () => void,
    user?: User,
    createAnswer: (payload: any) => void;
    updateAnswer: (payload: any) => void;
    deleteAnswer: (payload: any) => void;
}

const AnswerForm = (props: AnswerProps) => {
    const userName = `${props.answer?.createdBy?.firstName} ${props.answer?.createdBy?.lastName}`;
    const datePosted = formatDate(new Date(props.answer?.createdAt!));
    const [inEdit, setEdit] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const ratings = props.answer?.ratings || [];
    const totalUpVotes = ratings.filter(rating => rating.upVote).length;
    const totalDownVotes = ratings.filter(rating => rating.downVote).length;

    let isCreatedByCurrentUser = () => {
        return props.answer?.createdBy.id === props.user?.id;
    };

    let cancelAnswerEdit = () => {
        setEdit(false);
    };

    let postNewAnswer = (event: any) => {
        const { user, createAnswer, question } = props;
        event.preventDefault();
        const text = event.target.answer.value;

        if (text) {
            event.preventDefault();
            const text = event.target.answer.value;

            const answer = {
                text,
                createdBy: {
                    ...user
                },
                createdAt: new Date()
            }

            createAnswer({answer, question: question});
            props.cancelAnswer!();
        }
    };

    let updateAnswer = (event: any) => {
        const { updateAnswer, question } = props;
        event.preventDefault();

        const answerId = parseInt(event.target.answerId.value);
        const answerText = event.target.answer.value;

        if (answerText) {
            const index = question.answers.findIndex((answer: Answer) => answer.id === answerId);
            const answers = [...question.answers];
            const answer = answers[index];
            answer.text = answerText;

            updateAnswer!({answer, question});
            cancelAnswerEdit();
        }
    };

    let deleteAnswer = () => {
        const { deleteAnswer, question, answer } = props;
        if (window.confirm("Are you sure that you want to delete this question")) {
            deleteAnswer({answer, question});
        }
    };

    let upVote = (upVote: boolean) => {
        const { updateAnswer, question, answer, user } = props;
        const ratings = answer!.ratings || [];

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


        let answerData = {
            ...answer,
            ratings,
        } as unknown as Question;

        updateAnswer({answer: answerData, question});
    };

    let handleChange = (event:any) => {
        setDisabled(!event.target.value)
    };

    return <div className="answer-form">
        {!props.isNew && <div>
            <div>Answered by {userName} at {datePosted}</div>
            <span className="clearfix"></span>
            {!inEdit && props.answer && <div className="answer">{props.answer!.text}</div>}

            <div className="toolbar-actions">
                {props.user && !inEdit && <span onClick={() => upVote(true)} className="up-vote"><FontAwesomeIcon icon={["fas", "arrow-up"]}/><span className="vote-value">{totalUpVotes}</span></span>}
                {props.user && !inEdit && <span onClick={() => upVote(false)} className="down-vote"><FontAwesomeIcon icon={["fas", "arrow-down"]}/><span className="vote-value">{totalDownVotes}</span></span>}
                {!props.user && !inEdit && <span className="up-vote"><FontAwesomeIcon icon={["fas", "arrow-up"]}/><span className="vote-value">{totalUpVotes}</span></span>}
                {!props.user && !inEdit && <span className="down-vote"><FontAwesomeIcon icon={["fas", "arrow-down"]}/><span className="vote-value">{totalDownVotes}</span></span>}
                {!inEdit && props.editable && isCreatedByCurrentUser() && <span onClick={() => setEdit(!inEdit)}>Edit</span>}
                {!inEdit && props.editable && isCreatedByCurrentUser() && <span onClick={() => deleteAnswer()}>Delete</span>}
            </div>
        </div>
        }

        {(props.isNew || inEdit) &&
        <form onSubmit={props.isNew ? postNewAnswer : updateAnswer}>
            <input hidden name="questionId" defaultValue={props.question.id}/>
            <input hidden name="answerId" defaultValue={props.answer?.id}/>
            <textarea name="answer" className="form-control field-in-edit"
                      defaultValue={props.isNew ? "" : props.answer?.text}
                      placeholder="Post answer"
                      onChange={handleChange}
            />
            {!props.isNew && <div className="align-right">
                <button type="submit" className="btn btn-sm btn-primary answer-form-btn" disabled={isDisabled}>Save</button>
                <button type="button" className="btn btn-sm btn-secondary answer-form-btn"
                        onClick={cancelAnswerEdit}>Cancel
                </button>
            </div>}
            {props.editable && props.isNew && <div className="align-right">
                <button type="submit" className="btn btn-sm btn-primary answer-form-btn" disabled={isDisabled}>Post Answer</button>
                <button type="button" className="btn btn-sm btn-secondary answer-form-btn" onClick={props.cancelAnswer}>Cancel</button>
            </div>}
        </form>
        }
    </div>;
}

const mapStateToProps = (state: any) => ({
    user: state.auth?.user
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        createAnswer: (payload: any) => dispatch(createAnswerAction(payload)),
        updateAnswer: (payload: any) => dispatch(updateAnswerAction(payload)),
        deleteAnswer: (payload: any) => dispatch(deleteAnswerAction(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm);
