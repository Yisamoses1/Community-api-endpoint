const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/////////////////////////////
//////SIGNUP CONTROLLER/////
///////////////////////////

exports.signup = async (req, res) => {
    const {email, password, profilePicture, username} = req.body;
    try{
        ///////////////////////////////////////////////////
        ///Check if the user already exist in the database/
        //////////////////////////////////////////////////

        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(401).json({ message: "User with this email already exist"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            profilePicture,
            username,
           
        });
        await user.save();
        const token = jwt.sign({_id: user._id, email}, process.env.JWT_SECRET);
        
         return res.status(200).json({ message: "Account created successfully", token });

    }catch (error) {
       return  res.status(500).json({ message: error.message})
    }

};


//////////////////////////////////////////
///////// LOGIN CONTROLLER////////////////
//////////////////////////////////////////

exports.signin =  async (req, res) => {
    const { email, password} = req.body;
    try {

        ///////////////////////////////////////////////
        // Check if the user exist in the database/////
        ///////////////////////////////////////////////
        
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({ mesage: "Invalid login credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).josn({ message: "Invalid login credentials"});
        };
        const token = jwt.sign({_id: user._id, email: user.email}, process.env.JWT_SECRET);
         return res.status(201).json({ message: "Login sucessful", token });

    } catch (error) {
       return res.status(500).json({message: error.message});
    }
};
