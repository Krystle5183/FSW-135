import React, {useState, useContext} from "react";
import TextField from '@material-ui/core/TextField'
import { makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import classNames from 'classnames'
import { UserContext } from "../context/UserProvider";

const useStyles = makeStyles({
    root: {
        background: 'white',
        borderEndEndRadius: '5px'
    },
    field: {
        marginTop: 10,
        marginBottom: 5,
        display: 'flex',
        width: '20vw'
    },
    input: {
        color: 'black',
    }
})

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        }
    }
})

const initInputs = { 
    title: "",
    description: "",
    comments: ""
}

const IssueForm = ({addIssue}) => {
    const [inputs, setInputs] = useState(initInputs)
    const classes = useStyles()
    const { errMsg } = useContext(UserContext)

    const handleChange = (e) => {
        const {name, value} = e.target
        setInputs(prevInputs => ({
            ...prevInputs,
            [name] : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addIssue(inputs)
        setInputs(initInputs)
    }

    const {title, description, comments} = inputs

    return (
        <form className="issueform" onSubmit={handleSubmit}>
            <ThemeProvider theme={theme}>
                <TextField
                    className={classNames(classes.root, classes.field, classes.input)}
                    label='Title...'
                    variant="outlined"
                    autoComplete="off"
                    color="primary"
                    type="text"
                    name="title"
                    multiline
                    rows={4}
                    inputProps={{maxLength: 100}}
                    value={title}
                    onChange={handleChange}
                    placeholder="Title"/>
                <TextField
                    className={classNames(classes.root, classes.field, classes.input)}
                    label='Description...'
                    variant="outlined"
                    multiline
                    rows={4}
                    type="text"
                    name="description"
                    value={description}
                    onChange={handleChange}
                    placeholder="Description"/>
                <TextField
                    className={classNames(classes.root, classes.field, classes.input)}
                    label='Comment...'
                    variant="outlined"
                    multiline
                    rows={4}
                    type="text"
                    name="comments"
                    value={comments}
                    onChange={handleChange}
                    placeholder="Comment"/>
                </ThemeProvider>
                <p style={{backgroundColor: "#c00000", color: "#ffffff", textAlign: "center" }}>{ errMsg }</p>
                <button className="add-issue">Add Post</button>
        </form>
    )
}

export default IssueForm;