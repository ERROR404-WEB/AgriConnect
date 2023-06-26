const mongoose = require('mongoose');
const {Schema} = mongoose;
const roomSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    pic:{
        type:String,

    },
    name: {
        type: String,
        required: true,
    },
    area:{
        type: Number,
        required: true,
    },
    crop: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('room', roomSchema);