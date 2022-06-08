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
        let userExercises = await Exercise.find({ username: username }).select({ _id: false, __v: false, username: false });
        if (!userExercises) {
            callback(false, "User's exercises not found");
        } else {
            callback(true, userExercises);
        }
    } catch (error) {
        callback(false, " Error : " + error);
