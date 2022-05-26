
module.exports.saveUser = function (username, callback) {
    let newUser = new User({
        username: username
    });
    newUser.save();
    User.create({ username: username }, function (err, doc) {
        if (err) {
            callback(true, doc);
        }
    });
}

