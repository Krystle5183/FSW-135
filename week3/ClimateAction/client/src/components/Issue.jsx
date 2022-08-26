import React, { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import NewCommentForm from './NewCommentForm'

const Issue = (props) => {
    const {title, description, comments, _id} = props
    const {deleteIssue, user: {username}, token} = useContext(UserContext)
    
    return (
        <div className="issue">
            <span className="issue-span"> 
                <h1 className="issue-title">{title}</h1>
                <h5 className="issue-user"> Posted By: {username}</h5> 
            </span>
            {token && <button onClick={ ()=>deleteIssue(_id) } className='issue-delete'>Delete</button>}
            <h3 className="issue-descr">{description}</h3>
            <NewCommentForm  issueId={_id}/>
            <h3 className="comments-title">Comments</h3>
            <div className="comment-container">
                <div className="comment-user">@{username}</div>
                <div className="issue-comments">{comments.map(comment => (
                    <h1>{comment.comment_field}</h1>
                ))}</div>
            </div>
            
        </div>
    )
}
// {issues.map(issue => <Issue {...issue} key={issue._id}/>)}

export default Issue;