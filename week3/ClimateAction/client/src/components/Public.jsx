import React, { useContext } from 'react'
import IssueList from './IssueList.jsx'
import { UserContext } from '../context/UserProvider.js'


const Public = () => {
    const { publicIssues } = useContext(UserContext)
    console.log(publicIssues)
    return (
        <div className='public-main'>
            <h3 className='public-issues'>Issues</h3>
            <IssueList issues={publicIssues}/>
        </div>
    )
}

export default Public;