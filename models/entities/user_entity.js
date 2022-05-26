var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports.UserEntity = function UserEntity() {
    return new Schema({
        username: String,
        count: { type: Number, required: true, default: 0 },
        log: { type: Array }
    });
}