const express = require("express");
const inventoryRouter = express.Router();
const Inventory = require('../models/inventory.js');

// GET ALL
inventoryRouter.get('/', (req, res, next) => {
    Inventory.find((err, inv) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(inv);
    })
})

//GET ONE
inventoryRouter.get('/:inventoryId', (req, res, next) => {
    Inventory.find({ _id: req.params.inventoryId }, (err, inv) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(inv);
    })
})

//POST ONE
inventoryRouter.post('/', (req, res, next) => {
    const newInv = new Inventory(req.body);
    newInv.save((err, savedInventory) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedInventory);
    })
})

// DELETE
inventoryRouter.delete('/:inventoryId', (req, res, next) => {
    Inventory.findOneAndDelete({ _id: req.params.inventoryId }, (err, deletedItem) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully deleted item: ${deletedItem.name}`);
    })
})

//PUT
// Accepts 4 arguments:
//  1. Which page to update
//  2. What data to update
//  3. Which version to return
//  4. Callback function
inventoryRouter.put('/:inventoryId', (req, res, next) => {
    Inventory.findOneAndUpdate(
        { _id: req.params.inventoryId },
        req.body,
        { new: true },
        (err, updatedInventory) => {
            if(err){
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedInventory);
        } 
    )
})

module.exports = inventoryRouter;