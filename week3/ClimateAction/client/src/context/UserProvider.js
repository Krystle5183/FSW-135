import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext()

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    console.log(token)
    config.headers.Authorization = `Bearer ${token}`
    return config
})

const UserProvider = (props) => {
    const initState = {
        user: {}, 
        token: "", 
        issues: [],
        publicIssues: [],
        errMsg: ''
    }

    const handleAuthErr = (errMsg) => {
        setUserState(prevState =>({ ...prevState, errMsg}))
    }

    const resetAuthErr = () => {
        setUserState(prevState =>({ ...prevState, errMsg: " "}))
    }

    const [userState, setUserState] = useState(initState)

    const signUp = (credentials) => {
        axios.post('/auth/signup', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const login = (credentials) => {
        axios.post('/auth/login', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            getUserIssues()
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthErr(err.response.data.errMsg))
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState(prevState => ({...initState, publicIssues: prevState.publicIssues}))
    }

    const addIssue = (newIssue) => {
        console.log(newIssue)
        var issue = {title: newIssue.title, description: newIssue.description}
        userAxios.post('/api/issue', issue)
        .then(res => {
            console.log(res.data)
            setUserState(prevState => ({
                ...prevState,
                issues: [...prevState.issues, res.data], publicIssues: [...prevState.publicIssues, res.data]
            }))
            addNewComment({
                issue: res.data._id,
                comment_field: newIssue.comments
            })
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const getUserIssues = () => {
        userAxios.get('/api/issue/user')
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: res.data
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const getPublicIssues = () => {
        axios.get('/public/issue')
        .then(res=> {
            console.log(res.data)
            setUserState(prevState => ({
                ...prevState,
                publicIssues: res.data
            }))   
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    const deleteIssue = (issueId) => {
        console.log(issueId)
        userAxios.delete(`/api/issue/${issueId}`)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: prevState.issues.filter(issue => {
                    return issue._id !== issueId}),
                publicIssues: prevState.publicIssues.filter(issue => {
                    return issue._id !== issueId})
        }))})
        .catch(err => console.log(err.response.data.errMsg))
    }

    const addNewComment = (newComment) => {
        userAxios.post('/api/comment', newComment)
        .then(res => {
            setUserState(prevState => ({
                ...prevState,
                issues: prevState.issues.map(issue => {
                    if(issue._id === newComment.issue){
                        issue.comments.push(res.data)
                    } return(issue) 
                }),
                publicIssues: prevState.publicIssues.map(issue => {
                    return(issue)
                })
            }))
        })
        .catch(err => console.log(err.response.data.errMsg))
    }

    useEffect(() => {
        setUserState(prevState => ({
            ...prevState,
            user: JSON.parse(localStorage.getItem('user')) || {}, 
            token: localStorage.getItem('token') || "", 
        }))
        getPublicIssues()
        getUserIssues()
    }, [])

    return(
        <UserContext.Provider value={ { ...userState, signUp, login, logout, addIssue, getUserIssues, getPublicIssues, deleteIssue, resetAuthErr, addNewComment }}>
            { props.children }
        </UserContext.Provider>
    )
}

export default UserProvider;