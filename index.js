const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const dbUri = process.env.MONGO_URI;
var user_dao = require('./models/user_dao');
var log_dao = require('./models/log_dao');
var exercise_dao = require('./models/exercise_dao');


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


//Get user object with count property
// app.get('api/users/:id/logs', (req, res) => {
//   user_dao.getUserById((etat, obj) => {
//     if (etat) {
//       //User is found now we che
//     } else {
//       res.json(obj);
//     }
//   });
// });

app.get('/api/users/:id/logs', (req, res) => {
  var userId = req.params.id;
  const { from, to, limit } = req.query;

  var limitArray = Number(req.query.limit) || 0;
  var fromDate = req.query.from || new Date(0);
  var toDate = req.query.to || new Date(Date.now());
  var logsArray = [];

  //First we find the user to get username
  user_dao.getUserById(userId, (etat, user) => {
    if (etat) {
      //We check if we have params in query
      if (Object.keys(req.query).length === 0) {
        //User is found, now we need to find all exercises related to that user according to params and to get exercises length
        exercise_dao.findExerciseByUsername(user.username, (etat, userExercisesFound) => {
          if (etat) {
            //We push all exercises inside log array
            userExercisesFound.map((item) => {
              logsArray.push(item);
            });
            var logs = {
              username: user.username,
              count: userExercisesFound.length,
              log: logsArray
            }
            //We send back data after saving logs
            log_dao.saveLog(logs, (etat, logsSaved) => {
              if (etat) {
                res.json({
                  _id: user._id, username: user.username, count: logsSaved.log.length, log: logsSaved.log
                });
              } else {
                res.json({
                  Error: "Error logs : " + logsSaved
                });
              }
            });
          } else {
            res.json({
              Error: "Error :" + userExercisesFound
            });
          }
        });
      } else {
        exercise_dao.findExerciseByUsernameWithParams(user.username, limitArray, fromDate, toDate, (etat, userExercisesFound) => {
          if (etat) {
            //We push all exercises inside log array
            userExercisesFound.map((item) => {
              logsArray.push(item);
            });
            var logs = {
              username: user.username,
              count: userExercisesFound.length,
              log: logsArray
            }
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
      exercises.date = new Date(exercises.date).toDateString();
      // We first search the user to get username and save it to exercise
      user_dao.getUserById(userId, (etat, user) => {
        if (etat) {
          //User is found, we first get the username and save the exercise
          exercises.username = user.username;
          exercise_dao.saveExercise(exercises, (etat, savedExercise) => {
            if (etat) {
              res.json({
                _id: user._id, username: user.username, date: savedExercise.date, description: savedExercise.description, duration: savedExercise.duration
              });
            } else {
              //An error occured
              res.json({
                Error: savedExercise
              });
            }
          });
        } else {
          //User is not found
          res.json({
            Error: user
          });
        }
      });
    } else {
      res.json({
        Error: "Invalid date or number format"
      });
    }
  } else {
    res.json({
      Error: "Required fields should be filled"
    });
  }
});


app.listen(port, function () {
  console.log(`Your app is listening on port ${port}`);
});