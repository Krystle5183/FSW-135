const express = require("express");
const app = express();
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

//Connection to DB
mongoose.connect('mongodb://localhost:27017/climate-action-101');

//Routes
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api/users', require('./routes/userRouter.js'));
app.use('/api/issues', require('./routes/issueRouter.js'));
app.use('/api/comments', require('./routes/commentRouter.js'));

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