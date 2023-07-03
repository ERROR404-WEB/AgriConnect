const express=require('express');
const connectToMongo=require('./db');
const cors=require('cors');

const port=process.env.PORT || 5000;
const users=require('./models/user');




const app=express();

const server=require('http').createServer(app);
const io=require('socket.io')(server,{
    pingTimeout: 60000,
    cors: {
        origin: '*',
    }
});




app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/rooms',require('./routes/rooms'));
app.use('/api/posts',require('./routes/posts'));



var socketDef=null;
io.on('connection',(socket)=>{
    

    socket.on('joinRoom',async (roomId)=>{
        socketDef=socket;
        socket.join(roomId);
        console.log('user had joined room '+roomId);
    }
    );

    socket.on('sendMessage',async (req)=>{
        const user=await users.findById(req.message.sender);
        req.message.sender={
            _id: user._id,
            name: user.name,
            email: user.email
        }

        //console.log("message received on server side");


        socket.emit("receive message",req.message);
        socket.to(req.roomId).emit("receive message",req.message);

    }
    );

    socket.on('acceptTheOffer',async (req)=>{
        socket.emit("receive accepted offer",req);
        socket.to(req.roomId).emit("receive accepted offer",req);
    }
    );


    socket.on('rejectTheOffer',async (req)=>{
        socket.emit("receive reject offer",req);
        socket.to(req.roomId).emit("receive reject offer",req);
    }
    );
}
);


const sendNotification=(message)=>{
    socketDef.emit("receive message",message);
}


connectToMongo();

module.exports=sendNotification;

server.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});