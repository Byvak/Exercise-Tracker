const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.LogEntity = function LogEntity() {
    return new Schema({
        username: String,
        count: Number,
        log: [{
            _id: false,
            description: String,
