const mongoose=require('mongoose');

const {Schema}=mongoose;

const likes=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
    }
});



likes.index({post:1,user:1});

likes.index({user:1});



module.exports=mongoose.model('likes',likes);