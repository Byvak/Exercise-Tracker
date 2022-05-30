const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports.UserEntity = function UserEntity() {
    return new Schema({
        username: String,
    });
}