const mongoose = require('mongoose');
const {Schema} = mongoose;

const userbioSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    pic:{
        type:String,
    },
    bio:{
        type: String,
    }
});