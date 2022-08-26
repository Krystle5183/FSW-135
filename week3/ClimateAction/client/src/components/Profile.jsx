import React, { useContext } from 'react'
import IssueList from './IssueList.jsx'
import { UserContext } from '../context/UserProvider.js'
import IssueForm from './IssueForm.jsx'

const Profile = () => {
    const { addIssue, issues} = useContext(UserContext)

    return (
        <div className='profile-main'>
            <h3 className='profile-issue'>Add a Post</h3>
            <IssueForm addIssue={addIssue}/>
            <h3 className='yourissues'>Your Posts</h3>
            <IssueList issues={issues}/>
        </div>
    )
}

export default Profile;