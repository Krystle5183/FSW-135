import React from 'react';

function AuthForm(props){
    const {
        handleChange, 
        handleSubmit, 
        btnText, 
        errMsg,
        inputs: { username, password } 
    } = props

    return (
        <form onSubmit = {handleSubmit}>
            <input
                type = 'text'
                value = {username}
                name = 'username'
                onChange = {handleChange}
                placeholder = 'Username' />
            <input
                type = 'text'
                value = {password}
                name = 'password'
                onChange = {handleChange}
                placeholder = 'Password' />
            <button className = 'sign-button'>{ btnText }</button>
            <p style = {{backgroundColor: '#c00000', color: '#ffffff', textAlign: 'center'}}>{ errMsg }</p>
        </form>
    )
};

export default AuthForm;
