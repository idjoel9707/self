const mongoose = require('mongoose');
const { Schema } = mongoose;
const unique = require("mongoose-unique-validator")

const userSchema = new Schema({
    username: {

    },
    password: {

    }
})

userSchema.plugin(unique)
exports.User = mongoose.model("User", userSchema)