import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { createToken, isAuth } from "../utils.js";

export const signin = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        res.status(200).send({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: createToken(user),
        });
        return;
    } else {
        res.status(401).send({ message: "Invalid email or password" });
    }
};

export const signup = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        res.status(401).send({ message: "Email already exist" });
    }
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });
    await newUser.save();
    res.status(200).send({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: createToken(newUser),
    });
};
