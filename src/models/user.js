const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
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
        required: true,
        enum: ["buyer" , "seller"]
    }

}, { timestamps: true })


const User = mongoose.model('User', userSchema);

module.exports = User;