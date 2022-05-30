const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const LogEntity = require('./entities/log_entity').LogEntity();
const Log = mongoose.model('Log', LogEntity);

module.exports.saveLog = async function (log, callback) {
    try {
