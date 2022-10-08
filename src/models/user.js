const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    uid:{
        type: String,
        required : true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    hash:{
        type: String,
        required: true
    },
    userType:{
        type: String,
        enum:['buyer','seller'],
        required: true
    },
    catalog:{

    }

}, { timestamps: true })


const User = mongoose.model('User', userSchema);

module.exports = User;