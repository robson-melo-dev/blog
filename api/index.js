const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = "hjgajhhajsjdb*&8724kn";

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

const salt = bcrypt.genSaltSync(10);

app.use(express.json());

mongoose.connect(
  "mongodb+srv://sysrobson:0ICwUZwnWWlxX73L@cluster0.iyzd3l1.mongodb.net/?retryWrites=true&w=majority"
);

//REGISTER ENDPOINT
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(400).json(e);
  }
});

//LOGIN ENDPOPINT
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    //logged in
    jwt.sign({ username, id: userDoc._id }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json("ok");
    });
  } else {
    //login failed
    res.status(400).json("Wrong credentials!");
  }
});

app.listen(4000);
