const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id:{
        type : Number,
        required : true,
        unique : true
    },
    username: {
        type : String,
        required : true,
        unique : true

    },
    fullname: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    password: {
        type : String,
        required : false,
    },
    phone: {
        type : String,
        required : false,
    },
    birthDate: {
        type : String,
        required : false,
    },
    gender: {
        type : String,
        required : false,
    },
    address: {
        type : String,
        required : false,
    },
    verified: {
        type : Boolean,
        required : true,
    },
    subscriptionDate: {
        type : Date,
        required : true,
    },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;