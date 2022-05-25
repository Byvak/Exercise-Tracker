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
        result
      );
    } else {
      res.json({
        error: result
      });
    }
  });
});


app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});