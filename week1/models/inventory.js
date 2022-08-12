const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Inventory Schema
const inventorySchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 1
    },
})

module.exports = mongoose.model("Inventory", inventorySchema);