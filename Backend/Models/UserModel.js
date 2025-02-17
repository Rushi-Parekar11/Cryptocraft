const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
    required: true,
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    buycoins: {
        type: [
            {
                name: { type: String },
                image: { type: String },
                buyprice: { type: Number },
                quantity: { type: Number },
            },
        ],
        default: [], 
    },
})

const User = mongoose.model("User", userSchema);
module.exports = User;