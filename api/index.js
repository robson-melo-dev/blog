const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const jwtSecret = "hjgajhhajsjdb*&8724kn";
const salt = bcrypt.genSaltSync(10);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

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
      res.cookie("token", token).json({
        id: userDoc._id,
        username,
      }); //set the token to a JWT token and responds with the id and username
    });
  } else {
    //login failed
    res.status(400).json("Wrong credentials!");
  }
});

//PROFILE ENDPOPINT
app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  //return information of the user from the token
  jwt.verify(token, jwtSecret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

//LOGOUT ENDPOPINT
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok"); //invalidate the token
});

//POST ENDPOPINT
app.post("/post", uploadMiddleware.single("file"), (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);
  res.json({ ext }); //invalidate the token
});

app.listen(4000);
