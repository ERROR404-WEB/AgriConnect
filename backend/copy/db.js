const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://kiran:kiran@cluster0.siuvs9s.mongodb.net/agriconnect"
const mongoURI ="mongodb://0.0.0.0:27017/farmbank"



const connectToMongo = async() => {
    mongoose.connect(mongoURI, await console.log('Connected to Mongodb'))
}


module.exports = connectToMongo;