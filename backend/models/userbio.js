const mongoose = require('mongoose');
const {Schema} = mongoose;

const userbioSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    profilepic:{
        type:String,
    },
    bannerpic:{
        type:String,
    },
    bio:{
        type: String,
    }
});