const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/user');

mongoose.connect('mongodb://root:root123@ds119273.mlab.com:19273/angular-mean-posts')
  .then(() => {
    console.log('Conect to the database')
  })
  .catch(() => {
    console.log('Error');
  });

const app = express();
app.use(bodyParser.json());

app.get('/*', function (req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '../dist/angular-mean/')});

});
app.use("/dist/", express.static(path.join('../dist/')));

app.use("/images", express.static(path.join('backend/images')));
app.get((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Headers', "Origin, X-Request-With,Content-Type,Accept, Authorizaiton");
  res.setHeader('Access-ControlAllow-Methods', "GET,POST,PATCH,DELETE,OPTIONS");

  next();
});
app.use('/api/posts', postRoute);
app.use('/api/user', userRoute);

module.exports = app;
