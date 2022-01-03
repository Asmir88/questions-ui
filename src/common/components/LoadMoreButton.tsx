import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

interface LoadMoreButtonProps {
    anyUsersDataLeft: boolean,
    loadMore: () => void
}

function LoadMoreButton(props: LoadMoreButtonProps) {
    return <>
        {props.anyUsersDataLeft &&
        <div className="load-more-btn" onClick={props.loadMore}><span
            className="load-more-label">Load more</span><span><FontAwesomeIcon
            icon={["fas", "caret-down"]}/></span></div>}
    </>;
}

export default LoadMoreButton;
