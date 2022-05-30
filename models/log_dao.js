const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const LogEntity = require('./entities/log_entity').LogEntity();
const Log = mongoose.model('Log', LogEntity);

module.exports.saveLog = async function (log, callback) {
    try {
        let usersLogs = await new Log({
            username: log.username,
            count: log.count,
            log: log.log
        }).save();
        callback(true, usersLogs);
    } catch (error) {
        callback(false, "Error : " + error);
    }
