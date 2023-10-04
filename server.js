const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./modal/userSchema");
const FileUpload = require("./modal/fileUploadSchema");
const Joi = require("joi");

const multer = require("multer");

// connect to express app
const app = express();

// Secret Key for jsonwebtoken while login
const SECRET_KEY = "tecmantras";

// connect to MongoDb
const mongo_url =
  "mongodb+srv://deepaktecmantras:Deepak97@cluster0.dl6srrq.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongo_url)
  .then(() => {
    app.listen(3001, () => {
      console.log("Server is connected to port 3001 and connected to MongoDb");
    });
  })
  .catch((err) => {
    console.log("Unable to connect");
  });

//   middleware
app.use(bodyParser.json());
app.use(cors());

//   ROUTES
// Register Post Request
app.post("/register", async (req, res) => {
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
});

// get request

app.get("/register", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ err: "Unable to get the users" });
  }
});

// Post Login request

app.post("/login", async (req, res) => {
  try {
    const validateSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(4),
    });
    const { error } = validateSchema.validate(req.body);
    console.log(error);
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
    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    res.status(500).json({ error: "Error in Login" });
  }
});

// Uploading file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/Store/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

// post request for file upload

app.post("/upload", upload.single("file"), (req, res) => {
  FileUpload.create({ image: req.file.filename })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});
