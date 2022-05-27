const mongoose = require('mongoose');
const UserEntity = require('./entities/user_entity').UserEntity();
const User = mongoose.model('User', UserEntity);

module.exports.saveUser = async function (username, callback) {
    try {
        let newUser = await new User({
}


