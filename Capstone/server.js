const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require('cors');
const expressJwt = require('express-jwt');

PORT = 3200;

//MiddleWare
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: '*' }));
app.use(cookieParser());

//Connection to DB
mongoose.connect('mongodb://localhost:27017/climate-action-101');

//Routes
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api/users', require('./routes/userRouter.js'));
app.use('/api/issues', require('./routes/issueRouter.js'));
app.use('/api/comments', require('./routes/commentRouter.js'));
app.use('/publicIssues', require('./routes/issueRouter.js'));

app.get('/setcookie', (req, res) => {
    res.cookie('Testing cookie name', 'E=MC2');
    res.send('Cookie has been saved successfully!');
});
app.get('/getcookie', (req, res) => {
    console.log(req.cookies)
    res.send(req.cookies)
})
app.get('/clearcookie', function(req, res){
    res.clearCookie('Testing cookie name');
    res.send('cleared');
});

//Error Handler
app.use((err, req, res, next) => {
    console.log(err);
    if(err.name === "Unauthorized Error"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
});

//Server Listen
app.listen(PORT, () => {
    console.log(`Server successfully started on port: ${PORT}`);
});