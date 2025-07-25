const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  date_created: { type: String, required: true, default: Date.now() },
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel