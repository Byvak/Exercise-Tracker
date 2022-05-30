const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.ExerciseEntity = function ExerciseEntity() {
    return new Schema({
        username: String,
        description: { type: String, required: true },
        duration: { type: Number, required: true },
        date: String,
    });
}