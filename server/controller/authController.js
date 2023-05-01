const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { createToken } = require("../utils");
const signIn = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    res.status(200).send({
      user,
      token: createToken(user),
    });
    return;
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
};

const signup = async (req, res) => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    res.status(401).send({ message: "Email already exist" });
    return;
  }
  const newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
  });
  await newUser.save();
  res.status(200).send({
    user,
    token: createToken(newUser),
  });
};
module.exports = {
  signIn,
  signup,
};
