const mongoose = require('mongoose');
const { Schema } = mongoose;
const unique = require("mongoose-unique-validator")

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

exports.Blog = mongoose.model("Blog", blogSchema)