const mongoose = require('mongoose');
const { Schema } = mongoose;
const unique = require("mongoose-unique-validator")
const { JWT_SECRET, SALT } = require('./../configs/setting')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, `Please enter a username`]
    },
    name: {
        type: String,
        required: [true, `Please enter your name`]
    },
    email: {
        type: String,
        required: [true, `Please enter an email`],
        lowercase: true,
        unique: true,
        match: [/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/, `Email format is incorrect!`]
    },
    password: {
        type: String,
        required: [true, `Please enter your password`],
        // match: [/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, `Password should have a minimum of 6 characters, minimum of 1 alphabet character, dan 1 numeric character!`]
    }
}, {
    timestamps: true,
    versionKey: false
})

// userSchema.pre("save", async function(next) {
//     let user = this;
//     if(user.password && user.isModified("password"))
//          user.password = await bcrypt.hash(user.password, SALT);
//     next()
// })

userSchema.post("save", (error, doc, next) => {
    let errorMessage = {}

    if (error.errors.name) errorMessage.name = error.errors.name.properties.message;
    if (error.errors.email) {
        if (error.errors.email.kind === 'unique') {
            errorMessage.email = `Email already used, use another email!`
        } else {
            errorMessage.email = error.errors.email.properties.message
        }
    };
    if (error.errors.username) errorMessage.username = error.errors.username.properties.message;
    if (error.errors.password) errorMessage.password = error.errors.password.properties.message;
    if (error) {
        next({ message: errorMessage });
    } else {
        next();
    }
})

userSchema.plugin(unique)
exports.User = mongoose.model("User", userSchema)