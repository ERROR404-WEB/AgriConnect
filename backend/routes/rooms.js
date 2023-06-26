const mongoose=require('mongoose');
const express=require('express');


const bcrypt=require('bcryptjs');

const Room=require('../models/rooms');
const RoomDetails=require('../models/roomDetails');
const router=express.Router();


// const sendNotification=require('../index');
// console.log(sendNotification);


router.post('/createRoom',async(req,res)=>{
    const room=new Room({
        name:req.body.name,
        description:req.body.description,
        img:req.body.img,
        admin:req.body.admin,
        share:req.body.share,
        value:req.body.value,
        members:[],
        accepted_offers:[],
        status:0
    });

    room.save();

    const roomDetails=new RoomDetails({
        _id:room._id,
        name:req.body.name,
        admin:req.body.admin,
        img:req.body.img,
        share:req.body.share,
        value:req.body.value,
        members:[],
        messages:[],
        accepted_offers:[],
        lastMessage:null,
        status:0,
    });
    

    roomDetails.save();

    res.json('Room Created Successfully');

}
);


router.get('/getRooms',async(req,res)=>{
    const rooms=await Room.find({status:1});
    res.json(rooms);
}   
);


router.post('/getMyRooms',async(req,res)=>{
    const rooms = await Room.find({admin:req.body.id,status:{ $ne: 2 }});
    res.json(rooms);
}
);

router.post('/addMember',async(req,res)=>{
    const room=await Room.findOne({_id:(req.body.roomId)});
    const roomDetails=await RoomDetails.findOne({_id:(req.body.roomId)});
    room.members.push(req.body.memberId);
    roomDetails.members.push(req.body.memberId);
    room.save();
    roomDetails.save();
    res.json('Member Added Successfully');
}
);

router.post('/removeMember',async(req,res)=>{
    const room=await Room.findOne({_id:(req.body.roomId)});
    const roomDetails=await RoomDetails.findOne({_id:(req.body.roomId)});
    room.members.pull(req.body.memberId);
    roomDetails.members.pull(req.body.memberId);
    room.save();
    roomDetails.save();
    res.json('Member Removed Successfully');
}
);


router.post('/addMessage',async(req,res)=>{
    const roomDetails=await RoomDetails.findOne({_id:(req.body.roomId)});
    roomDetails.messages.push(req.body.message);
    roomDetails.lastMessage=req.body.message;
    roomDetails.save();
    res.json('Message Added Successfully');
    //sendNotification(req.body.message);
}
);

router.post('/getMessages',async(req,res)=>{
    const roomDetails=await RoomDetails.findOne({_id:(req.body.roomId)});
    res.json(roomDetails.messages);
}
);

router.post('/acceptOffer',async(req,res)=>{

    const room=await Room.findOne({_id:(req.body.roomId)});
    const roomDetails=await RoomDetails.findOne({_id:(req.body.roomId)});

    
    roomDetails.accepted_offers.push(req.body.message);
    roomDetails.messages[req.body.message.index].accepted=true;


    await roomDetails.save();
    room.accepted_offers.push({...req.body.message,_id:roomDetails.accepted_offers[roomDetails.accepted_offers.length-1]._id});
    room.save();
    res.json('Offer Accepted Successfully');
}
);

router.post('/rejectOffer',async(req,res)=>{

    console.log(req.body);
    const room=await Room.findOne({_id:(req.body.roomId)});
    const roomDetails=await RoomDetails.findOne({_id:(req.body.roomId)});
    room.accepted_offers.pull(req.body.offerId);
    roomDetails.accepted_offers.pull(req.body.offerId);
    console.log(roomDetails.messages);
    if(roomDetails.messages[req.body.index])
    roomDetails.messages[req.body.index].accepted=false;
    room.save();
    roomDetails.save();
    res.json('Offer Rejected Successfully');
}
);


router.post('/deleteRoom',async(req,res)=>{
    const room=await Room.findOne({_id:(req.body.roomId)});
    //await RoomDetails.deleteOne({_id:(req.body.roomId)});
    room.status=2;
    room.save();
    res.json('Room Deleted Successfully');
}
);



router.post('/activateRoom',async(req,res)=>{
    const room=await Room.findOne({_id:req.body.id});
    const roomDetails=await RoomDetails.findOne({_id:req.body.id});
    room.status=1;
    roomDetails.status=1;
    room.save();
    roomDetails.save();
    res.json('Room Activated Successfully');
}
);

router.post('/getRoomDetails',async(req,res)=>{
    const roomDetails=await RoomDetails.findOne({_id:(req.body.id)});
    await roomDetails.populate('members','name profilepic email');
    await roomDetails.populate('messages.sender','name email profilepic');
    await roomDetails.populate('accepted_offers.sender','name email profilepic');
    await roomDetails.populate('admin','name email profilepic');
    res.json(roomDetails);
}
);



module.exports=router;