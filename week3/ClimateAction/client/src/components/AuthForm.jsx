const AuthForm = ( { handleChange, handleSubmit, btnText, inputs, errMsg } ) => {

    return(
        <div className="authForm-wrapper">
            <form className="authForm" onSubmit={handleSubmit}>
                <input
                    className="username"
                    type="text"
                    value={inputs.username}
                    name={'username'}
                    onChange={handleChange}
                    placeholder="Username"/>
                <input
                    className="password"
                    type="text"
                    value={inputs.password}
                    name={'password'}
                    onChange={handleChange}
                    placeholder="Password"/>
                    <button  className="login">{ btnText }</button>
                    <p style={{backgroundColor: "#c00000", color: "#ffffff", textAlign: "center" }}>{ errMsg }</p>
            </form>
        </div>
    )
}

export default AuthForm;