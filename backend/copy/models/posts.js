const mongoose = require('mongoose');
const {Schema} = mongoose;

const postsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    comment:[
        {
            text: String,
            date:{ type:Date, default: Date.now },
            postedby : String
        }
    ]
});


module.exports = mongoose.model('posts',postsSchema);