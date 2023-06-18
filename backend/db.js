const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://kiran:kiran@cluster0.siuvs9s.mongodb.net/agriconnect"



const connectToMongo = async() => {
    mongoose.connect(mongoURI, await console.log('Connected to Mongodb'))
}


module.exports = connectToMongo;