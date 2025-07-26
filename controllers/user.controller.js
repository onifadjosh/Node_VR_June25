const express = require('express')
const app = express();
app.use(express.urlencoded({ extended: true }));
const UserModel = require("../models/user.model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODE_MAIL,
    pass: process.env.NODE_PASS,
  },
});

const goHome = (req, res) => {
  res.render("home", { message });
};

const signUpPage = (req, res) => {
  message = "";
  res.render("signup", { message });
};

const verifyToken=(req, res, next)=>{
    let token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, process.env.APP_PASS, (err, result)=>{
        if(err){
            res.send('error verifying token or token invalid')
        }else{
            console.log(token)
            // res.send('proceed to login')
            next()

        }
    })
}

const signUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    let saltRound = await bcrypt.genSalt(10);

    let hashedPassword = await bcrypt.hash(password, saltRound);
    console.log(hashedPassword);

    await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    message = "account created successfully";
    let mailOptions = {
      from: "",
      to: email,
      subject: "Sending Email using Node.js",
      text: "Welcome to class, we will continue on this next week!!!",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.render("login", { message });
  } catch (error) {
    console.log(error);
    if (error.code == 11000) {
      message = "User already exists";
      res.render("signup", { message });
    } else {
      message = " cannot create account at this time";
      res.render("signup", { message });
    }
  }
};

const loginPage = (req, res) => {
  message = "";
  res.render("login", { message });
};

const login = async (req, res) => {
  // console.log(req.body)
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    console.log(user)
    if (!user) {
      message = "invalid credentials";
      res.send( { message });
    } else {
        console.log(password)
        console.log(user.password)
      let isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        let token = jwt.sign({user:user._id}, process.env.APP_PASS, {expiresIn:'1h'})
        message = `welcome back  ${user.firstName}`;
        res.send({message:'User logged in successfully', token, email})
        // res.render("home", { message });
      } else {
        message = `invalid credentials`;
        res.send( { message });
      }
    }
    //   message = "";
    //   res.render("login", { message });
  } catch (error) {
    message = `Error logging user in`;
    res.send("login", { message });
    console.log(error)
  }
  // res.send(firstName)
};

const getAllUsers = async (req, res) => {
  try {
    let users = await UserModel.find(); //gets all the users inside the users collection in the database
    //   res.render("allUsers", { users });
    res.send({ message: "users fetched successfully", users });
  } catch (error) {
    res.send({ message: "error fetching user" });
  }
};

const deleteUser = (req, res) => {
  //asignment- this will be find by ID and delete
  // const id = req.params.index
  const { id } = req.params;
  console.log(id);
  users.splice(id, 1);
  res.render("allUsers", { users });
};
module.exports = {
  goHome,
  signUpPage,
  signUp,
  loginPage,
  login,
  getAllUsers,
  deleteUser,
  verifyToken
};
