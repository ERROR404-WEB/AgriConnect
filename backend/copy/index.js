const express=require('express');
const connectToMongo=require('./db');
const cors=require('cors');

const port=process.env.PORT || 5000;




const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));

connectToMongo();



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});