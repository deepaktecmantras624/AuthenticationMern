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
    const { name, email, password, isAdmin } = req.body;
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
    console.log('USers',res);
  } catch (error) {
    res.status(500).json({ err: "Unable to get the users data" });
  }
};

// Get the User by Id
const userDataById = async (req, res) => {
  try {
    const userId = req.params.id;
    const validateSchema = Joi.object({
      userId: Joi.string().required(),
    });
    const { error } = validateSchema.validate(req.params.id);
    console.log(error);
    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error getting user data by ID:", error);
    res.status(500).json({ error: "Unable to get the user data" });
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

// Update User Data
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name } = req.body;
    // const hashedP = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: "Error in updating user" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  userData,
  deleteUser,
  updateUser,
  userDataById,
};
