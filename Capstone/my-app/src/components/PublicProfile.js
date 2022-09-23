import React, { useState, useEffect } from 'react';
import PublicIssues from './PublicIssues.js';
import axios from 'axios';

function PublicProfile(){

    const initPublicState = { issue: [] };
    const [publicIssuess, setPublicIssues] = useState(initPublicState);

    function publiccIssues(){
        axios.get('http://localhost:3200/publicIssuess')
            .then((res) => {
                setPublicIssues((prevState) => ({
                    ...prevState,
                    issue: res.data
                }))
            })
            .catch((err) => console.dir(err.response.data.errMsg))
    };

    useEffect(() => {
        publiccIssues()
    }, []);

    console.log(publicIssuess.issues)

    return (
        <div className = 'issuesList'>
            {/* { publicIssuess.map((issue) => 
                <PublicIssues issue = {issue} key = {issue._id}/>) } */}
        </div>
    )
};

export default PublicProfile;