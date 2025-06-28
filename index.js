const express = require("express");
const app = express();
// const ejs = require("ejs");
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}))

//get, post, put, delete, patch

let student = {
  firstname: "pamilerin",
  lastname: "Joshua",
  age: 15,
};

let message = 'welcome here Pamilerin'

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

let users= []

// app.get(path, callback)
app.get("/", (req, res) => {
  console.log("app work");
  //   res.send(9000);
  //   console.log(__dirname);
  //   res.sendFile(__dirname + "/index.html");

  res.send(songs)
  // res.render("show");
});


app.get('/home', (req, res)=>{
    res.render('home', {message})
})

app.get('/login', (req, res)=>{
  res.render('login')
})

app.post('/login', (req, res)=>{
  // console.log(req.body)
  const{firstName, lastName, email, password}= req.body
  users.push(req.body);
  console.log(users)
  res.render('login')

  // res.send(firstName)
})

app.get('/allUsers', (req, res)=>{
  res.render('allUsers', {users})
})



// app.listen(port, callback)
let port = 5000;
app.listen(port, (err) => {
  if (err) {
    console.log(err, "cannot start this server ");
  } else {
    console.log(`server started on port ${port}`);
  }
});
