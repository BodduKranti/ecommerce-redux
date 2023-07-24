const mongoose = require('mongoose');

const signupUser = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true
        },
        phone: String,
        address: String,
        userImg: String,
        userPwd: String,
        userCnfpwd: String,
        role: {
            type: Number,
            default: 0,
        }
    },
    {
        timestamps: true
    }
)

const signUsr = mongoose.model('loginsignupdb', signupUser);
module.exports = { signUsr };