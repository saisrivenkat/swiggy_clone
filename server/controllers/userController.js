const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user === null) res.status(400).json({ error: "User not found" });
  if (user && bcrypt.compare(password, user.password)) {
    res.status(200).json({
      user,
    });
  }
};

const register = async (req, res) => {
  const { name, email, phonenumber, password } = req.body;
  const userExists = await userModel.findOne({ email });
  console.log(userExists);

  if (userExists) {
    res.status(400).json({ error: "Email already exists" });
  }

  let bycryptPassword = await bcrypt.hash(password, salt);
  const user = new userModel({
    name,
    email,
    phonenumber,
    password: bycryptPassword,
  });
  console.log(user);
  const saveuser = await user.save();
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      phonenumber: user.phonenumber,
    });
  } else {
    res.status(400).json({ error: "Invalid user data" });
  }
};

const profile = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  if (user) res.status(200).json(user);
  res.status(400).json({ error: "User not found" });
};

module.exports = { login, register, profile };
