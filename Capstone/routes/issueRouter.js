const express = require("express");
const issueRouter = express.Router();
const Issue = require('../models/issue.js');

// GET ALL / FIND ALL
issueRouter.get('/', (req, res, next) => {
    Issue.find((err, issue) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(issue);
    });
});

// GET ONE / FIND ONE
issueRouter.get('/:issueId', (req, res, next) => {
    Issue.find({ _id: req.params.issueId }, (err, issue) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(issue);
    });
});

// PUT ONE / UPDATE ONE
issueRouter.put('/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        req.body,
        { new: true },
        (err, updatedIssue) => {
            if(err){
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedIssue);
        }
    );
});

//POST ONE / CREATE ONE
issueRouter.post('/', (req, res, next) => {
    req.body.user = req.user._id;
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedIssue) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedIssue);
    });
});

// DELETE / REMOVE ONE
issueRouter.delete('/:issueId', (req, res, next) => {
    Issue.findOneAndDelete({ _id: req.params.issueId }, (err, deletedIssue) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully deleted item: ${deletedIssue.title}`);
    });
});

// Like an issue / PUT
issueRouter.put('/like/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $inc: { like: 1 } },
        { new: true },
        (err, updatedIssue) => {
            if(err){
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedIssue);
        }
    );
});

// Dislike an issue
issueRouter.put('/dislike/:issueId', (req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $inc: { like: -1 } },
        { new: true },
        (err, updatedIssue) => {
            if(err){
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedIssue);
        }
    );
});

module.exports = issueRouter;