const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "angularnode"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

const app = express();
//4FmM6R9MbyTAcEvu
mongoose.connect("mongodb+srv://Mike:4FmM6R9MbyTAcEvu@cluster0.slitpva.mongodb.net/node-angular?retryWrites=true&w=majority").then(()=>{
  console.log("Connected to Database");
}).catch(()=>{
  console.log("Connection failed");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Origin', '*'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.post("/api/posts", async (req, res, next) => {
  title = req.body.title;
  content = req.body.content;

  try {
    const result = await new Promise((resolve, reject) => {
      con.query(`INSERT INTO posts (title, content) VALUES ('${title}', '${content}');`, (err, result, fields) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
    res.status(200).json({
      message: 'Post added successfully',
      id: result.insertId
    });
  } catch (err) {
    console.log(err)
  }
});

app.get('/api/posts' ,async (req, res, next) => {
  try {
    const result = await new Promise((resolve, reject) => {
      con.query("SELECT * FROM posts", (err, result, fields) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
    Object.keys(result).forEach(function (key) {
      var row = result[key];
    });
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: result
    });
  } catch (err) {
    console.log(err)
  }
});
  // con.query("SELECT * FROM posts", (err, result, fields) => {
  //   if (err) return reject(error);
  //   Object.keys(result).forEach(function (key) {
  //     var row = result[key];
  //     console.log(row.title)


app.delete('/api/posts/:id', async (req, res, next) => {
  postId = req.params.id;
  try {
    const result = await new Promise((resolve, reject) => {
      con.query(`DELETE FROM posts WHERE postid = '${postId}'`, (err, result, fields) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
    res.status(200).json({
      message: 'Posts deleted successfully',
    });
  } catch (err) {
    console.log(err)
  }
})

module.exports = app;

