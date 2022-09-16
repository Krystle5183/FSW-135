import React, { useContext } from 'react';
import { UserContext } from '../context/UserProvider.js';
import Issues from './Issues.js';
import IssuesForm from './IssuesForm.js';
import IssuesList from './IssuesList.js';

function Profile(){

    const { user: {username}, addIssue, issues } = useContext(UserContext);

    return (
        <div className = 'profile-wrapper'>
            <h1 className = 'welcome'>Welcome {username}!</h1>
            <h3 className = 'addorpost'>Add an Issue</h3>
            <IssuesForm addIssue = {addIssue}/>
            <h3 className = 'addorpost'>Posted Issues</h3>
            <IssuesList issues = {issues} />
        </div>
    )
};

export default Profile;