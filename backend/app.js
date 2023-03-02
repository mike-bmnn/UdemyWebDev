const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose');


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

app.post("/api/posts", (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save();
  console.log(post)
  res.status(201).json({message: 'Post added!'})
});

app.get('/api/posts' ,(req, res, next)=>{
  const posts = [
    {id:'1', title:'First Post', content:'Coming from the server'},
    {id:'2', title:'Second Post', content:'Coming from the server'},
    {id:'3', title:'Third Post', content:'Coming from the server'}
  ]
  res.status(200).json({
    message: 'Posts fetched successfully',
    posts: posts
  });
});

module.exports = app;

