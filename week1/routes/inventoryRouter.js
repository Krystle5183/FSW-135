const express = require("express");
const inventoryRouter = express.Router();
const Inventory = require('../models/inventory.js');

inventoryRouter.get('/', (req, res, next) => {
    Inventory.find((err, inventory) => {
        if(err){
            res.status(500);
            return next(err);
        }
        return res.status(200).send(inventory);
    })
})

module.exports = inventoryRouter;