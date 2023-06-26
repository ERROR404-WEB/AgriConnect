const mongoose = require('mongoose');
const {Schema} = mongoose;


const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    share:{
        type: Number,
        required: true,
    },
    value:{
        type: Number,
        required: true,
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    accepted_offers: [{
        sender: {
            type: Schema.Types.ObjectId,
            ref:'user'
        },
        share: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        date: {
            type: Date,
            default: Date.now()
        },
    }],
    status: {
        type: Number,
        default: 0
    },
});



module.exports = mongoose.model('room', roomSchema);