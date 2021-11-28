const mongoose = require('mongoose');
const { Schema } = mongoose;
const unique = require("mongoose-unique-validator")

const blogSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    versionKey: false
})

exports.Blog = mongoose.model("Blog", blogSchema)