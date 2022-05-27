const mongoose = require('mongoose');
const UserEntity = require('./entities/user_entity').UserEntity();
const User = mongoose.model('User', UserEntity);

        username: username
    });
    newUser.save();
    User.create({ username: username }, function (err, doc) {
        if (err) {
            callback(false, "Oups an error " + err);
        } else {
            callback(true, doc);
        }
    });
}


