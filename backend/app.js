var express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts');

mongoose.connect('mongodb://root:root123@ds119273.mlab.com:19273/angular-mean-posts')
  .then(() => {
    console.log('Conect to the database')
  })
  .catch(() => {
    console.log('Error');
  })

const app = express();
app.use(bodyParser.json());
app.get((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Request-With,Content-Type,Accept");
  res.setHeader('Access-ControlAllow-Methods', "GET,POST,PATCH,DELETE,OPTIONS");

  next();
});
app.use('/api/posts/', postRoute);
module.exports = app;
