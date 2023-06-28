const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    pincode: {
        type: Number,
    },
    email: {
        type: String,
    },
    role: {
        type: String,
    },
    profilepic: {
        default:"https://i.postimg.cc/TwxmBP0w/profile-pic.jpg",
        type: String,
    },
    bannerpic: {
        default:"https://wallpapercave.com/wp/wp1886357.jpg",
        type: String,
    },
    bio: {
        type: String,
    },
    whatsapp:{
        default:"https://web.whatsapp.com/",
        type: String,
    },
    fb:{
        default:"https://www.facebook.com/",
        type: String,
    },
    insta:{
        default:"https://www.instagram.com/",
        type: String,
    },
    telegram:{
        default:"https://web.telegram.org/",
        type: String,
    },
    gmail:{
        default:"https://mail.google.com/",
        type: String,
    }


});

module.exports = mongoose.model('user', userSchema);

