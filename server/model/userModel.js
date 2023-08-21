const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  phonenumber: Number,
  password: String,
  orders:Array
});

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;