const mongoose = require('mongoose');
const ExerciseEntity = require('./entities/exercise_entity').ExerciseEntity();
const Exercise = mongoose.model('Exercise', ExerciseEntity);

module.exports.saveExercise = async function (exercise, callback) {
    try {
        let savedExercise = await new Exercise({
            username: exercise.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date,
        }).save();
        callback(true, savedExercise);
    } catch (error) {
        callback(false, "Error : " + error);
    }
}

module.exports.findExerciseByUsername = async function (username, callback) {
    try {
