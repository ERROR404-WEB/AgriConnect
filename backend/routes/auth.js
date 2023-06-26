const mongoose = require('mongoose'); //mongoose
const express = require('express'); //express


const router = express.Router(); //router
const bcrypt = require('bcryptjs'); //bcryptjs (encryption)

const Room = require('../models/rooms'); //models
const User = require('../models/user'); //models
const Chat = require('../models/chat'); //models

const { body, validationResult } = require('express-validator'); //validation 


const jwt = require('jsonwebtoken'); //jwt
const JWT_SECRET_KEY = "heytherethisisasecretkey"

const app = express(); //express


const fetchuser = require('../middleware/fetchuser'); //middleware


//route 1 : create user using post "/api/auth/createuser" . No login required

router.post('/createuser', [
    body('password', 'Password Should Be atleast Length Of 5').isLength({ min: 5 }),
    body('phone', 'Enter Valid Phone Number').isLength({ min: 10 }),
], async(req, res) => {

    try {
        let success = true;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            success = false;
            return res.status(400).json({ success: success, errors: errors.array() }); //validation 
        }

        let user = await User.findOne({ phone: req.body.phone }); //check if user exists
        if (user) {
            success = false;
            return res.status(400).json({ success: success, error: "User already exists , Signup using another phone number" });
        } else {

            const salt = await bcrypt.genSalt(10); //encrypt password
            const securedPassword = await bcrypt.hash(req.body.password, salt);

            let user = await User.create({

                password: securedPassword,
                phone: req.body.phone,
            });

            const data = {
                user: {
                    id: user.id
                }
            }

            var authToken = jwt.sign(data, JWT_SECRET_KEY); //create jwt token

            res.json({ success: success, authToken: authToken });
        }

    } catch (error) {
        console.error(error.message);
        res.status(500).send({ success: success, error: "Internal Server Error while creating user" });
    }


});


//route  2: Enter details of users using post "/api/auth/enterdetails" .


router.post('/createuser/details', fetchuser, async(req, res) => {
    let success = true;
    try {

        const { name, phone, state, city, village, pincode, email, profilepic, role, address, bio, bannerpic, fb, insta, telegram, gmail, whatsapp } = req.body;
        const updatedUser = {};
        if (name) { updatedUser.name = name };
        if (phone) { updatedUser.phone = phone };
        if (state) { updatedUser.state = state };
        if (address) { updatedUser.address = address };
        if (city) { updatedUser.city = city };
        if (village) { updatedUser.village = village };
        if (pincode) { updatedUser.pincode = pincode };
        if (email) { updatedUser.email = email };
        if (profilepic) { updatedUser.profilepic = profilepic };
        if (role) { updatedUser.role = role };
        if (bio) { updatedUser.bio = bio };
        if (bannerpic) { updatedUser.bannerpic = bannerpic };
        if (fb) { updatedUser.fb = fb };
        if (insta) { updatedUser.insta = insta };
        if (telegram) { updatedUser.telegram = telegram };
        if (gmail) { updatedUser.gmail = gmail };
        if (whatsapp) { updatedUser.whatsapp = whatsapp };
        if (profilepic) {updatedUser.profilepic = profilepic};
        if (bannerpic) {updatedUser.bannerpic = bannerpic};

        //find user and update it 
        var userId = req.user.id;
        let user = await User.findById(userId);
        if (!user) {
            success = false;
            return res.status(404).send({ success: success, error: "User Not Found" })
        }


        user = await User.findByIdAndUpdate(userId, { $set: updatedUser }, { new: true });
        //console.log(user);
        res.json({ success, user });

    } catch (error) {
        console.error(error.message);
        success = false;
        res.status(500).send({ success: success, error: "Internal Server Error while creating user" });
    }

});


//Route 3:Login a User using: POST "/api/auth/login".  login required


router.post('/login', [

    body('phone', 'Enter Valid PhoneNumber').isLength({ min: 10 }),
    body('password', 'Password should not be NULL').exists()
], async(req, res) => {
    let success = true;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({ success: success, errors: errors.array() });

    }


    try {


        const { phone, password } = req.body;

        const user = await User.findOne({ phone: phone });

        if (!user) {
            success = false;
            return res.status(400).json({ success: success, error: "Invalid credentials" });
        } else {

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                success = false;
                return res.status(400).json({ success: success, error: "Invalid credentials" });
            }

            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET_KEY);

            res.json({ success, authToken });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error while Login user");
    }



});





//ROUTE 4: Get Loggedin User Details using: POST "/api/auth/getUser". Login required

router.post('/getuser', fetchuser, async(req, res) => {

    try {
        var userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Error Occured while fetching user");
    }
});

//ROUTE 5: TO SEND THE MESSAGE

router.post("/sendmsg", async (req, res) => {
    try {
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1; // Months are zero-based, so we add 1
        const year = currentDate.getFullYear();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const tym = `${day}/${month}/${year} ${formattedHours}:${minutes}${amOrPm}`;

        var a =await new Chat({
            msg: req.body.abc.msg,
            sender: req.body.abc.sender,
            receiver: req.body.abc.receiver,
            date: tym,
            type: req.body.abc.type
        });
        a.save();
        res.sendStatus(200);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Error Occured while sending msg");
    }
});

//ROUTE 6: TO FETCH ALL THE USERS 

router.post("/getchatusers", async(req, res) => {
    try {
        const id = req.body.senderid;
        try {
            const data = await User.find({ _id: { $ne: id } });
            res.send(data);
        } catch (err) {
            console.log("Error at getting users", err);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Error Occured while getting all the users");
    }
});

//ROUTE 7: TO GET ALL THE MESSAGES

router.post("/getmsgs", async(req, res) => {
    try {
        try {
            const data = await Chat.find({
                $or: [
                    { sender: req.body.abc.sender, receiver: req.body.abc.receiver },
                    { sender: req.body.abc.receiver, receiver: req.body.abc.sender }
                ]
            });
            res.send(data);
        } catch (err) {
            console.log("Error at getting msgs", err);
        }

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Error Occured while getting msgs");
    }

});

//route 8 : get all users 

router.get('/getallusers', async(req, res) => {
    try {
        let users = await User.find();
        res.json(users);
    } catch (error) {
        console.error(error.message);
    }
});


//route 9: get user details by id

router.post('/getuserbyid', async(req, res) => {
    try {

        let user = await User.findById(req.body.id);
        res.json(user);
    } catch (error) {
        console.error(error.message);
    }

});




module.exports = router;