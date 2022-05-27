const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const dbUri = process.env.MONGO_URI;
var user_dao = require('./models/user_dao');
const { call } = require('body-parser');

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) {
    console.log("Une erreur lors de la connection" + err);
  } else {
    console.log("Connexion etablie avec succes");
  }
});

//Basic Configuration
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));



//API Endpoint
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/users', (req, res) => {
  user_dao.getUsers((etat, obj) => {
    if (etat) {
      res.json(obj);
    } else {
      res.json(obj);
    }
  });
});

app.post('/api/users', (req, res) => {
  var username = req.body.username;
  user_dao.saveUser(username, (etat, obj) => {
    if (etat) {
      res.json({ _id: obj._id, username: obj.username });
    } else {
      res.json({ Error: obj });
    }
  });
});

app.post('/api/users/:_id/exercises', (req, res) => {
  var userId = req.params._id;
  var exercises = {
    description: req.body.description,
    duration: Number(req.body.duration) ? req.body.duration : "error",
    date: req.body.date != "" ? Date.parse(req.body.date) : new Date().toDateString()
  }
  if (req.body.description && req.body.duration) {
    if (exercises.duration !== "error" && exercises.date) {
    } else {
      res.json({
        Error: "Invalid date or number format"
      });
    }
  });
});


app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});