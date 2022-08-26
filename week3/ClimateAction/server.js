const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const morgan = require('morgan')
const { expressjwt: jwt } = require('express-jwt')


//MiddleWare
app.use(express.json())
app.use(morgan('dev'))

//Connect to DB
mongoose.connect('mongodb://localhost:27017/ClimateAction')

//Routes
app.use('/auth', require('./routes/authRouter.js'))
app.use('/api/', jwt({ secret: process.env.SECRET, algorithms: ['HS256']}))
app.use('/api/issue', require('./routes/issueRouter.js'))
app.use('/public/issue', require('./routes/publicRouter.js'))
app.use('/api/comment', require('./routes/commentRouter.js'))



//Error Handling
app.use((err, req, res, next)=> {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

//Server Startup
app.listen(9000, () => {
    console.log('Server is running on Port 9000')
})