const express = require("express");
const mongoose = require("mongoose");
const app = express();
// const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const nodemailer = require("nodemailer");

let URI =
  "mongodb+srv://onifadjosh:@cluster0.imcgp.mongodb.net/June25?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(URI)
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
//get, post, put, delete, patch

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "",
    pass: "",
  },
});

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  date_created: { type: String, required: true, default: Date.now() },
});

const UserModel = mongoose.model("users", UserSchema);

let student = {
  firstname: "pamilerin",
  lastname: "Joshua",
  age: 15,
};

let message = "welcome here Pamilerin";

let products = [
  { title: "shoe", price: "2000" },
  { title: "bag", price: "5000" },
];

let songs = [
  {
    nameOfArtist: "Tope Alabi",
    musicCover:
      "https://th.bing.com/th/id/OSK.Pa4AnDqByXGb3RUWEGRO8dlYIftvmWz2oHaUv_aLnWs?w=120&h=168&c=7&rs=1&qlt=80&o=6&dpr=2.5&pid=SANGAM",
    albumYear: 2010,
  },

  {
    nameOfArtist: "Davido",
    musicCover:
      "https://th.bing.com/th/id/OSK.Pa4AnDqByXGb3RUWEGRO8dlYIftvmWz2oHaUv_aLnWs?w=120&h=168&c=7&rs=1&qlt=80&o=6&dpr=2.5&pid=SANGAM",
    albumYear: 2010,
  },
];

//sending an api using get request (Create a Music API)

let users = [];

// app.get(path, callback)
app.get("/", (req, res) => {
  console.log("app work");
  //   res.send(9000);
  //   console.log(__dirname);
  //   res.sendFile(__dirname + "/index.html");

  res.send(songs);
  // res.render("show");
});

app.get("/home", (req, res) => {
  res.render("home", { message });
});

app.get("/signup", (req, res) => {
  message = "";
  res.render("signup", { message });
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    await UserModel.create({ firstName, lastName, email, password });
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
});

app.get("/login", (req, res) => {
  message = "";
  res.render("login", { message });
});

app.post("/login", (req, res) => {
  // console.log(req.body)
  const { firstName, lastName, email, password } = req.body;
  users.push(req.body);
  console.log(users);
  message = "";
  res.render("login", { message });

  // res.send(firstName)
});

app.get("/allUsers", (req, res) => {
  res.render("allUsers", { users });
});

app.post("/delete/:id", (req, res) => {
  // const id = req.params.index
  const { id } = req.params;
  console.log(id);
  users.splice(id, 1);
  res.render("allUsers", { users });
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
