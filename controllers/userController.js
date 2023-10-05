const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modal/userSchema");
const Joi = require("joi");
const { SECRET_KEY } = require("../config/config");

// Post request for register
const registerUser = async (req, res) => {
  try {
    const validateSchema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(4),
    });
    const { error } = validateSchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successful" });
  } catch (error) {
    res.status(500).json({ error: "Error in registration" });
  }
};

// Post request for login
const loginUser = async (req, res) => {
  try {
    const validateSchema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required().min(4),
    });
    const { error } = validateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid Credential" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong password" });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
      expiresIn: "1hr",
    });
    res.status(200).json({ message: `Login Successful`, token });
  } catch (error) {
    res.status(500).json({ error: "Error in Login" });
  }
};

// Get Users Data

const userData = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ err: "Unable to get the users data" });
  }
};

// Delete the User
const deleteUser = async (req, res) => {  
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error in deletion" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  userData,
  deleteUser
};
