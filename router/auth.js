const express = require("express");
const router = express.Router();
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const middeleware = (req, res, next) => {
    console.log("Middle Ware Triggerd");
    next();
}


require("../db/conn")
const User = require("../models/userSchema")

router.get("/", (req, res) => {
    res.send("Home")
})

router.post('/login', async (req, res) => {
    
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(404).json({ message: "Plz fill the required field" })
    }
    const userLogin = await User.findOne({ email: email })
    const isMatch = await bycrpt.compare(password, userLogin.password);
    if(isMatch){
        let token=await userLogin.generateAuthToken();
         console.log(token);
         res.cookie("jwtoken",token,{
            expires:new Date(Date.now()+2589200000),
            httpOnly:true //30days expire
         });
    }
    if (!isMatch) {
        res.status(404).json({ message: "Invalid Credientials" })
    } else {
        res.status(200).json({ message: "User Sign In Successfully" })
    }
})
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password, phone_number } = req.body;
    if (!first_name || !last_name || !email || !password || !phone_number) {
        return res.status(422).json({ err: "Please Fill All the Fields" })
    }
    User.findOne({ email: email })
        .then((userExist) => {
            if (userExist) {
                return res.status(422).json({ err: "The User Already Exist" })
            }
        }).catch(err => { console.log(err); })
    const user = new User({ first_name, last_name, email, password, phone_number })
    await user.save().then(() => {
        res.status(201).json({ message: "User registration successfully" });
    }).catch(() => {
        res.status(500).json({ message: "Internal Server Error" })
    })
})

router.get("/about", middeleware, (req, res) => {
    res.send("About")
})

module.exports = router;

