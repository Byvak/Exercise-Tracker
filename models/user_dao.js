const mongoose = require('mongoose');
const UserEntity = require('./entities/user_entity').UserEntity();
const User = mongoose.model('User', UserEntity);

            callback(false, "Oups an error " + err);
        } else {
            callback(true, doc);
        }
    });
}


