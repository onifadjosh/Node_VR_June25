const express = require("express");
const dotenv = require("dotenv");
dotenv.config()
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
// const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())// make sure it it before your routes and not after 
const nodemailer = require("nodemailer");
const UserModel = require('./models/user.model')
const userRouter = require('./routes/user.routes')
app.use('/user', userRouter)

let URI =process.env.DATABASE_URI;
mongoose
  .connect(URI)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
//get, post, put, delete, patch






let message = "welcome here Pamilerin";



//sending an api using get request (Create a Music API)



// app.get(path, callback)
app.get("/", (req, res) => {
  console.log("app work");
  //   res.send(9000);
  //   console.log(__dirname);
  //   res.sendFile(__dirname + "/index.html");

  res.send(songs);
  // res.render("show");
});



app.get("/condition", (req, res) => {
  let gender = "female";
  res.render("condition", { gender });
});

// app.listen(port, callback)
let port = 5000;
app.listen(port, (err) => {
  if (err) {
    console.log(err, "cannot start this server ");
  } else {
    console.log(`server started on port ${port}`);
  }
});
