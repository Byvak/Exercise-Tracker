const mongoose = require('mongoose');
const UserEntity = require('./entities/user_entity').UserEntity();
const User = mongoose.model('User', UserEntity);

module.exports.saveUser = async function (username, callback) {
    try {
        let newUser = await new User({
            username: username
        }).save();
        callback(true, newUser);
    } catch (error) {
        callback(false, "Error : " + error);
    }
}

module.exports.getUsers = async function (callback) {
    try {
        var excludeFields = {
            __v: 0
        };
        var doc = await User.find({}, excludeFields);
        callback(true, doc);
    } catch (error) {
        callback(false, "Error : " + error)
    }
}

module.exports.getUserById = async function (userId, callback) {
    try {
        let user = await User.findById(userId);
        if (!user) {
        } else {
            callback(true, user);
        }
    } catch (error) {
        callback(false, "Error : " + error.message);
    }
}