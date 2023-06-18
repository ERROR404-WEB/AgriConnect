const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({
    msg: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    msg: String,
    sender: String,
    receiver: String,
    date: String
});


module.exports = mongoose.model('chat', chatSchema);