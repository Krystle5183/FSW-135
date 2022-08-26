import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";

const initInputs = {
    comment_field: " "
}

const NewCommentForm = ({ issueId }) => {
    const [newComment, setNewComment] = useState(initInputs)
    const {addNewComment} = useContext(UserContext)

    const handleCommentChange = (e) => {
        const {name, value} = e.target
        setNewComment(prevComments => ({
            ...prevComments,
            [name]: value
        }))
    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()
        const comment = {...newComment, issue: issueId}
        console.log(comment)
        addNewComment(comment)
        setNewComment(initInputs)
    }

    const {comment_field} = newComment

    return (
        <form onSubmit={handleCommentSubmit} className='new-comment-form'>
            <textarea
                type="text"
                name="comment_field"
                value={comment_field}
                onChange={handleCommentChange}
                placeholder="Discuss..."
                className="comment-box"
                />
                <button className="submit-btn">Comment</button>
        </form>
    )
}

export default NewCommentForm;