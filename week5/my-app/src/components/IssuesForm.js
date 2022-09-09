import React, { useState } from 'react';

const initInputs = {
    title: '',
    issue: ''
};

function IssuesForm(props){

    const [inputs, setInputs] = useState(initInputs);
    const { addIssue } = props;

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs((prevInputs) => ({
            ...prevInputs,
            [name]: value
        }))
    };

    function handleSubmit(e) {
        e.preventDefault();
        addIssue(inputs);
        setInputs(initInputs);
    };
    
    const { title, issue } = inputs;
    return (
        <form onSubmit = {handleSubmit}>
            <input
                type = 'text'
                name = 'title'
                value = {title}
                onChange = {handleChange}
                placeholder = 'Title of Issue' />
            <input
                type = 'text'
                name = 'issue'
                value = {issue}
                onChange = {handleChange}
                placeholder = 'Description' />
            <button>Add Issue</button>
        </form>
    )
}

export default IssuesForm;