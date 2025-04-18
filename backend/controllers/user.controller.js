const User = require("../models/user.model.js")
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const JWT_USER_PASSWORD = require("../config.js");
const jwt = require("jsonwebtoken")
dotenv.config();

const signup = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ errors: "User already exist" })
        }
        const newUser = new User({ firstName, lastName, email, password: hashedPassword , role})
        await newUser.save();
        res.status(201).json({ message: "Signup Succeeded", newUser })
    } catch (error) {
        res.status(500).json({ errors: "Error in signup" })
        console.log("Error in signup", error)
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!user || !isPasswordCorrect) {
            return res.status(403).json({ errors: "Invalid credentials" })
        }

        //JWT CODE
        const token = jwt.sign({
            id: user._id,
            role:user.role,
        }, JWT_USER_PASSWORD);
        res.cookie("jwt", token);
        res.status(200).json({ message: "Login Successfull", user, token })
    } catch (error) {
        res.status(500).json({ errors: "Error in login" })
        console.log("Error in login", error)
    }
}

const logout  = async (req, res) =>{
    try{
        res.clearCookie("jwt")
        res.status(200).json({message:"Logged out seccessfully"})
    }catch(error){
        res.status(500).json({errors:"Error in logout"})
        console.log("Error in logout")
    }
}


module.exports = {
    signup,
    login,
    logout,
}