const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address:{
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    email: {
        type: String,
    },
    role:{
        type: String,
    }

});

module.exports = mongoose.model('user', userSchema);

