import QuestionForm from "./QuestionForm";
import React from "react";
import {Question} from "../models/question";
import LoadMoreButton from "./LoadMoreButton";

interface QuestionsListProps {
    questions: Question[];
    editable: boolean;
    loadMoreQuestions?: () => void;
}

const QuestionsList = (props: QuestionsListProps) => {
    return (
        <div>
            {
                props.questions.length > 0 &&
                <div>
                    {props.questions.map((question, index) => <div key={`question-form-${index}`}
                                                                   className="question-form">
                            <QuestionForm
                                key={`question-${index}`}
                                question={question}
                                editable={props.editable}
                            />
                        </div>
                    )
                    }
                    {props.loadMoreQuestions &&
                    <LoadMoreButton loadMore={props.loadMoreQuestions}/>
                    }
                </div>
            }
            {props.questions.length === 0 && <div>There are no questions</div>}
        </div>
    )
        ;
}

export default QuestionsList;
