import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider.js';

function Issues(props) {
    const { deleteIssue, likeComment, dislikeComment } = useContext(UserContext);
    const { title, issue, _id, like, dislike } = props;

    return (
        <div className = 'issues'>
            <button onClick = {() => deleteIssue(_id)}>X</button>
            <h1>{ title }</h1>
            <h3>{ issue }</h3>
            <button onClick = {() => likeComment(_id)}>Like</button>
            <button onClick = {() => dislikeComment(_id)}>Dislike</button>
            <h3>{ like }</h3>
        </div>
    )
}

export default Issues;