const mongoose=require('mongoose');
const {Schema}=mongoose;

const post=new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    likes:{
        type:Number,
        default:0,
    },
    image:{
        type:String,
        default:null,
    },
    time:{
        type:String,
        default:new Date().toLocaleString(),
    }
})

module.exports=mongoose.model('post',post);