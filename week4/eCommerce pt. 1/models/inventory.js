const mongoose = require('mongoose')
const Schema = mongoose.Schema

const inventorySchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true,
        min: 1
    },
    quantity: {
        type: Number,
        require: true,
        min: 1
    }
})

module.exports = mongoose.model('Inventory', inventorySchema)