const mongoose=require('mongoose');
const {Schema}=mongoose;

const postComment=new Schema({
    comments:[{
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
        },
        content:{
            type:String,
        },
        time:{
            type:String,
            default: new Date().toLocaleString(),
        }
    }]
});


module.exports=mongoose.model('postComment',postComment);