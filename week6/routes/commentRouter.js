const express = require("express");
const commentRouter = express.Router();
const Comment = require('../models/comment.js');

// GET ALL / FIND ALL
commentRouter.get('/', (req, res, next) => {
    Comment.find((err, com) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(com);
    });
});

// GET ONE / FIND ONE
commentRouter.get('/:commentId', (req, res, next) => {
    Comment.find({ _id: req.params.commentId }, (err, com) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(com);
    });
});

// PUT ONE / UPDATE ONE
commentRouter.put('/:commentId', (req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentId },
        req.body,
        { new: true },
        (err, updatedComment) => {
            if(err){
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedComment);
        }
    );
});

//POST ONE / CREATE ONE
commentRouter.post('/', (req, res, next) => {
    const newComment = new Comment(req.body);
    newComment.save((err, savedComment) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedComment);
    });
});

// DELETE / REMOVE ONE
commentRouter.delete('/:commentId', (req, res, next) => {
    Comment.findOneAndDelete({ _id: req.params.commentId }, (err, deletedComment) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully deleted item: ${deletedComment.comment}`);
    });
});


module.exports = commentRouter;