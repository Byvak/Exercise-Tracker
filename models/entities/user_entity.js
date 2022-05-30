const mongoose = require('mongoose');

module.exports.UserEntity = function UserEntity() {
    return new Schema({
        username: String,
    });
}