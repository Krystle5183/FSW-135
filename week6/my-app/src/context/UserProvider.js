import React, { useState } from 'react';
import axios from 'axios';
export const UserContext = React.createContext();

const userAxios = axios.create();

userAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
});

function UserProvider(props){

    const initState = { 
        user: JSON.parse(localStorage.getItem('user')) || {}, 
        token: localStorage.getItem('token') || '',
        issues: [],
        errMsg: ''
    };

    const [userState, setUserState] = useState(initState);

    function handleAuthErr(errMsg){
        setUserState((prevState) => ({
            ...prevState,
            errMsg
        }))
    };

    function resetAuthErr(){
        setUserState((prevState) => ({
            ...prevState,
            errMsg: ''
        }))
    };

    function signup(credentials) {
        axios.post('http://localhost:3200/auth/signup', credentials)
            .then((res) => {
                const { user, token } = res.data;
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                setUserState((prevUserState) => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch((err) => handleAuthErr(err.response.data.errMsg))
    };

    function login(credentials) {
        axios.post('http://localhost:3200/auth/login', credentials)
            .then((res) => {
                const { user, token } = res.data;
                localStorage.setItem('token', token)
                localStorage.setItem('user', JSON.stringify(user))
                getUserIssues();
                setUserState((prevUserState) => ({
                    ...prevUserState,
                    user,
                    token
                }))
            })
            .catch((err) => handleAuthErr(err.response.data.errMsg))
    };

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUserState({ user: {}, token: '', issues: [] })
    };

    function getUserIssues() {
        userAxios.get('http://localhost:3200/api/issues')
            .then((res) => {
                setUserState((prevState) => ({
                    ...prevState,
                    issues: res.data
                }))
            })
    };

    function addIssue(newIssue){
        userAxios.post('http://localhost:3200/api/issues', newIssue)
            .then((res) => {
                setUserState((prevState) => ({
                    ...prevState,
                    issues: [...prevState.issues, res.data]
                }))
            })
            .catch((err) => console.dir(err.response.data.errMsg))
    };

    return(
        <UserContext.Provider value = { {...userState, signup, login, logout, addIssue, resetAuthErr} }>
            { props.children }
        </UserContext.Provider>
    )
}

export default UserProvider;