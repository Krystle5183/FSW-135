const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

//Middleware

//DB
mongoose.connect('mongodb://localhost:27017/moviesdb',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log("Connected to the DB")
)

//Routes

//Error Handling

//Server Start
app.listen(PORT, () => {
    console.log(`App Started on: ${PORT}`)
})