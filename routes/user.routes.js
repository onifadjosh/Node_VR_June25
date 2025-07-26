const express = require("express");
const app = express();
const router = express.Router();

const {
  goHome,
  signUpPage,
  signUp,
  loginPage,
  login,
  getAllUsers,
  deleteUser,
  verifyToken,
} = require("../controllers/user.controller");

router.get("/home", goHome);

router.get("/signup", signUpPage);

router.post("/signup", signUp);

router.get("/login", loginPage);

router.post("/login", login);

router.get("/allUsers",verifyToken, getAllUsers);

router.post("/delete/:id", deleteUser);

module.exports = router;
