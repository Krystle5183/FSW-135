const express = require("express");
const userRouter = express.Router();
const User = require('../models/user.js');

// GET ALL / FIND ALL
userRouter.get('/', (req, res, next) => {
    User.find((err, user) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(user);
    });
});

// GET ONE / FIND ONE
userRouter.get('/:userId', (req, res, next) => {
    User.find({ _id: req.params.userId }, (err, user) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(user);
    });
});

// PUT ONE / UPDATE ONE
userRouter.put('/:userId', (req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true },
        (err, updatedUser) => {
            if(err){
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedUser);
        }
    );
});

//POST ONE / CREATE ONE
userRouter.post('/', (req, res, next) => {
    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedUser);
    });
});

// DELETE / REMOVE ONE
userRouter.delete('/:userId', (req, res, next) => {
    User.findOneAndDelete({ _id: req.params.userId }, (err, deletedUser) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully deleted item: ${deletedUser.name}`);
    });
});


module.exports = userRouter;