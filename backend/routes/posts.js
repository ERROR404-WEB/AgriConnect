const express=require('express');

const Posts=require('../models/posts');
const PostComments=require('../models/PostComments');

//const userLikes=require('../models/userLikes');
const likes=require('../models/likes');

const router=express.Router();


router.post('/createPost',async (req,res)=>{
    const post=await Posts.create(req.body);
    const comments=await PostComments.create({_id:post._id,comments:[]});
    post.save();
    comments.save();
    res.json("yes");
})

router.post('/getPosts',async (req,res)=>{
    //console.log(req.body.index);
    const posts=await Posts.find({}).skip(Number(req.body.index)*10).limit(10).populate('owner','name email profilepic');
    res.json(posts);
})

router.post('/editPost',async (req,res)=>{
    const post=await Posts.findById(req.body._id);
    post=req.body;
    post.save();

    res.json("yes");
})


router.post('/deletePost',async (req,res)=>{
    await Posts.findByIdAndDelete(req.body,_id);

    await likes.deleteMany({post:req.body._id});

    res.json("yes");
})


router.post('/likeCheck',async (req,res)=>{
    const like = await likes.exists({user:req.body.user,post:req.body.post});

    if(like)
        res.send(true);
    else
        res.send(false);
})

router.post('/likePost',async (req,res)=>{
    await likes.create({user:req.body.user,post:req.body.post});

    await Posts.findByIdAndUpdate(req.body.post,{$inc : {likes :1}});

    res.json("yes");

})

router.post('/unlikePost',async (req,res)=>{
    await likes.findOneAndDelete({user:req.body.user,post:req.body.post});

    await Posts.findByIdAndUpdate(req.body.post,{$inc:{likes:-1}});

    res.json("yes");

})


router.post('/getComments',async (req,res)=>{
    let comments=await (PostComments.findOne({_id:req.body.id})).skip(Number(req.body.index)*10).limit(10).populate('comments.owner','name bio profilepic');
    res.json(comments);
})


router.post('/createComment',async (req,res)=>{
    await PostComments.findByIdAndUpdate(req.body.post,
        {$push:{comments:{owner:req.body.user,content:req.body.content}}},
        {upsert:true});

    res.json("yes");
})

router.post('/deletComment',async (req,res)=>{
    await PostComments.findByIdAndUpdate(req.body.post,
        {$pull:{comments:{_id:req.body.comment}}});

        res.json("yes");
})




module.exports=router;