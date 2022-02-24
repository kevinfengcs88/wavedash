const expressAsyncHandler = require("express-async-handler");
const User = require('../models/userModel');

const registerUser = expressAsyncHandler(async(req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password){
        res.status(400);
        throw new Error('Please enter values for all the fields');
    }

    const userExists = await User.findOne({ email });

    if (userExists){
        res.status(400);
        throw new Error('User with that email already exists');
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic
        });
    }
    else{
        res.status(400);
        throw new Error('Failed to create account');
    }
});

module.exports = { registerUser };