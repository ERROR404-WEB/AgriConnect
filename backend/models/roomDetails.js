const mongoose = require('mongoose');
const {Schema} = mongoose;


const roomDetailsSchema= new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'user'
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
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    messages:{
        type: [{
        sender: {   
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        share:{ 
            type: Number,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        date: {
            type: String,
            default:new Date().toLocaleString()
        },
        accepted: {
            type: Boolean,
            default: false
        }
    }],
    default: [],
    },
    accepted_offers: [{
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },
        share: {
            type: Number,
        },
        amount: {
            type: Number,
        },
        date: {
            type: String,
            default:new Date().toLocaleString()
        },
        index: {
            type: Number,
        },
    }],
    lastMessage: {
            sender: {   
                type: Schema.Types.ObjectId,
            },
            share:{ 
                type: Number,
                default: 0,
            },
            amount: {
                type: Number,
                default: 0,
            },
            message: {
                type: String,
                default: '',
            },
            date: {
                type: String,
                default: new Date().toLocaleString()
            },
            accepted: {
                type: Boolean,
                default: false,
            }
    },
    status: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('roomDetails', roomDetailsSchema);