const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const User = require("./models/User");
const Post = require("./models/Post");
const app = express();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");

const jwtSecret = process.env.JWT_SECRET;
const salt = bcrypt.genSaltSync(10);

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.connect(process.env.MONGODB_URL);

//REGISTER ENDPOINT
app.post("/register", async (req, res) => {
  const { name, email, username, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
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
        username: userDoc.username,
        name: userDoc.name,
        email: userDoc.email,
      }); //set the token to a JWT token and responds with a cookie
    });
  } else {
    //login failed
    res.status(400).json("Wrong credentials!");
  }
});

//PROFILE ENDPOPINT
app.get("/profile", (req, res) => {
  const { token } = req.cookies || "";

  if (token !== "") {
    //return information of the user from the token
    jwt.verify(token, jwtSecret, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  } else {
    res.json({});
  }
});

//LOGOUT ENDPOPINT
app.post("/logout", (req, res) => {
  res.cookie("token", "").json("ok"); //invalidate the token
});

//POST ENDPOPINT
app.post("/post", uploadMiddleware.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const { token } = req.cookies;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const postDoc = await Post.create({
      title,
      content,
      summary,
      cover: newPath,
      author: info.id,
    });
    res.json({ postDoc }); //invalidate the token
  });
});

//UPDATE POST
app.put("/post", uploadMiddleware.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;

  jwt.verify(token, jwtSecret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const postDoc = await Post.findById(id);

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("You are not the Author");
    }

    await postDoc.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
});

//GET POSTS ENDPOINT
app.get("/posts", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

//GET POST BY ID
app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const postDoc = await Post.findById(id).populate("author", ["username"]);

  res.json(postDoc);
});

app.listen(4000);
