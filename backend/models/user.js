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
    state: {
        type: String,
    },
    district: {
        type: String,
    },
    village: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    email: {
        type: String,
    },
    profilepic: {
        type: String,
    },
    type:{
        type: String,

    }

});

module.exports = mongoose.model('user', userSchema);

