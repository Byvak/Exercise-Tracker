
module.exports.saveUser = function (username, callback) {
    let newUser = new User({
        username: username
    });
    newUser.save();
            callback(true, doc);
        }
    });
}

